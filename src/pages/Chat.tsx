import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Plus, AlertCircle, Loader2, Mic, MicOff, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';
import { api, isApiConfigured } from '@/lib/api';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MAX_TEXT_CHARS = 500;
const MAX_AUDIO_CHARS = 700;

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioText, setAudioText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { t } = useApp();
  const { user, isAuthenticated, updateVinculos, useFreeMessage, getFreeMessagesLeft } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const freeMessagesLeft = getFreeMessagesLeft();
  const hasVinculos = (user?.vinculos || 0) > 0;
  const canSendMessage = freeMessagesLeft > 0 || hasVinculos;
  const charCount = input.length;
  const isOverLimit = charCount > MAX_TEXT_CHARS;

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        // Simulate speech-to-text (in real app, send to transcription service)
        // For demo, we'll just show a placeholder
        const simulatedText = "This is a simulated transcription of your audio message. In production, this would use a speech-to-text service like ElevenLabs or Whisper API.";
        const truncatedText = simulatedText.slice(0, MAX_AUDIO_CHARS);
        setAudioText(truncatedText);
        setInput(truncatedText);
        toast.success(`Audio transcribed (${truncatedText.length}/${MAX_AUDIO_CHARS} chars)`);
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info(t.chat.recordAudio);
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast.error('Could not access microphone');
    }
  }, [t.chat.recordAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading || isOverLimit) return;

    if (!canSendMessage) {
      toast.error(t.chat.noVinculos);
      return;
    }

    // Try to use free message first, then vinculos
    let usedFreeMessage = false;
    if (freeMessagesLeft > 0) {
      usedFreeMessage = useFreeMessage();
    } else if (!hasVinculos) {
      toast.error(t.chat.noVinculos);
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setAudioText('');
    setIsLoading(true);

    try {
      if (isApiConfigured()) {
        const response = await api.post<{
          text: string;
          conversationId?: string;
          vinculosLeft?: number;
        }>('/api/chat', {
          message: userMessage.content,
          conversationId,
        });

        if (response.success && response.data) {
          const assistantMessage: Message = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: response.data.text,
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, assistantMessage]);
          
          if (response.data.conversationId) {
            setConversationId(response.data.conversationId);
          }

          if (typeof response.data.vinculosLeft === 'number' && !usedFreeMessage) {
            updateVinculos(response.data.vinculosLeft);
          }
        } else {
          throw new Error(response.message || 'Failed to get response');
        }
      } else {
        // Demo mode fallback
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const demoResponse: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: `**1) Assessment:**
Your question shows you're looking for clarity in your situation. This is a positive first step.

**2) Explanation:**
Understanding relationship dynamics requires looking at communication patterns, expectations, and how both parties express their needs.

**3) Resolution:**
1. Identify the specific pattern you want to change
2. Practice expressing your needs clearly using "I" statements
3. Listen actively to understand, not just to respond

*Note: This is demo mode. Connect the backend for full functionality.*`,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, demoResponse]);
        
        if (!usedFreeMessage && user) {
          updateVinculos(Math.max(0, (user.vinculos || 1) - 1));
        }
      }
    } catch (error) {
      // If failed and used free message, we don't refund (demo mode)
      // In production with real backend, the backend handles refunds
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_TEXT_CHARS + 50) { // Allow slight overflow for UX
      setInput(value);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <VinculaLogo size="sm" showText />
          </Link>

          <div className="flex items-center gap-4">
            {/* New Chat Button */}
            <Button variant="ghost" size="sm" onClick={startNewConversation}>
              <Plus className="w-4 h-4 mr-1" />
              {t.chat.newConversation}
            </Button>

            {/* Free Messages Badge */}
            {freeMessagesLeft > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <Gift className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">{freeMessagesLeft}</span>
              </div>
            )}

            {/* Vínculos Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <span className="text-sm font-medium">{user?.vinculos || 0} {t.chat.vinculos}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 pt-16 pb-40 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <VinculaLogo size="xl" className="mb-6" />
              <h1 className="text-2xl font-bold mb-2">{t.chat.welcome}</h1>
              <p className="text-muted-foreground max-w-md mb-4">
                {t.chat.welcomeSubtitle}
              </p>
              {freeMessagesLeft > 0 && (
                <div className="flex items-center gap-2 text-success">
                  <Gift className="w-5 h-5" />
                  <span className="font-medium">{freeMessagesLeft} {t.chat.freeMessagesLeft}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-md'
                        : 'bg-card border border-border/50 rounded-tl-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {line.startsWith('**') && line.endsWith('**') ? (
                            <strong>{line.slice(2, -2)}</strong>
                          ) : line.startsWith('*') && line.endsWith('*') ? (
                            <em className="text-muted-foreground">{line.slice(1, -1)}</em>
                          ) : (
                            line
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start message-animate">
                  <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">{t.chat.thinking}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-border/50">
        <div className="container mx-auto px-4 py-4 max-w-3xl">
          {!canSendMessage ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{t.chat.noFreeMessages}</span>
              </div>
              <Button variant="hero" asChild>
                <Link to="/pricing">{t.chat.buyVinculos}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Character counter */}
              <div className="flex justify-between text-xs text-muted-foreground px-1">
                <span>
                  {freeMessagesLeft > 0 ? (
                    <span className="text-success">{freeMessagesLeft} {t.chat.freeMessagesLeft}</span>
                  ) : (
                    <span>{user?.vinculos || 0} {t.chat.vinculos}</span>
                  )}
                </span>
                <span className={isOverLimit ? 'text-destructive font-medium' : ''}>
                  {charCount}/{MAX_TEXT_CHARS} {t.chat.charLimit}
                </span>
              </div>
              
              <div className="flex items-end gap-3">
                {/* Audio Button */}
                <Button
                  variant={isRecording ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="h-[52px] w-[52px] shrink-0"
                  title={isRecording ? t.chat.stopRecording : t.chat.recordAudio}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </Button>

                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={t.chat.placeholder}
                    className={`min-h-[52px] max-h-[200px] resize-none pr-4 ${isOverLimit ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                
                <Button
                  variant="hero"
                  size="icon"
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading || isOverLimit}
                  className="h-[52px] w-[52px] shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
