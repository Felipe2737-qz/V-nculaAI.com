import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Plus, Loader2, Mic, MicOff, Gift, MessageCircleOff, History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';
import { streamChat } from '@/lib/gemini';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

const MAX_TEXT_CHARS = 500;
const MAX_AUDIO_CHARS = 700;
const CONVERSATIONS_KEY = 'vincula_conversations';

function loadConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(CONVERSATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveConversations(convos: Conversation[]) {
  localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(convos.slice(0, 50)));
}

// Web Speech API types
interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const { t } = useApp();
  const { user, isAuthenticated, updateVinculos, useFreeMessage, getFreeMessagesLeft } = useAuth();
  const navigate = useNavigate();

  // Allow browsing without account - no redirect

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Save conversation when messages change
  useEffect(() => {
    if (messages.length === 0) return;
    const id = conversationId || `conv-${Date.now()}`;
    if (!conversationId) setConversationId(id);

    const title = messages[0]?.content.slice(0, 40) + (messages[0]?.content.length > 40 ? '...' : '');
    const updated: Conversation = { id, title, messages, updatedAt: new Date().toISOString() };

    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      const newList = [updated, ...filtered];
      saveConversations(newList);
      return newList;
    });
  }, [messages]);

  const freeMessagesLeft = getFreeMessagesLeft();
  const hasVinculos = (user?.vinculos || 0) > 0;
  const canSendMessage = freeMessagesLeft > 0 || hasVinculos;
  const charCount = input.length;
  const isOverLimit = charCount > MAX_TEXT_CHARS;

  const startRecording = useCallback(async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser. Use Chrome.');
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = document.documentElement.lang || 'pt-BR';

      let finalTranscript = '';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        for (let i = 0; i < Object.keys(event.results).length; i++) {
          const result = event.results[i];
          if (result) {
            const transcript = result[0]?.transcript || '';
            if ((result as any).isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interim += transcript;
            }
          }
        }
        const combined = (finalTranscript + interim).slice(0, MAX_AUDIO_CHARS);
        setInput(combined);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        toast.error('Speech recognition error');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
      toast.info(t.chat.recordAudio);
    } catch {
      toast.error('Could not access microphone');
    }
  }, [t.chat.recordAudio]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading || isOverLimit) return;

    if (!canSendMessage) {
      toast.error(t.chat.noVinculos);
      return;
    }

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
    setIsLoading(true);
    setStreamingText('');

    try {
      const history = messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      let accumulated = '';
      const fullText = await streamChat({
        messages: [...history, { role: 'user', content: userMessage.content }],
        onDelta: (chunk) => {
          accumulated += chunk;
          setStreamingText(accumulated);
        },
        onDone: () => {},
      });

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fullText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingText('');

      if (!usedFreeMessage && user) {
        updateVinculos(Math.max(0, (user.vinculos || 1) - 1));
      }
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingText('');
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
    if (value.length <= MAX_TEXT_CHARS + 50) setInput(value);
  };

  const startNewConversation = () => {
    setMessages([]);
    setConversationId(null);
    setStreamingText('');
    setShowHistory(false);
  };

  const loadConversation = (conv: Conversation) => {
    setMessages(conv.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) })));
    setConversationId(conv.id);
    setShowHistory(false);
  };

  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      saveConversations(filtered);
      return filtered;
    });
    if (conversationId === id) startNewConversation();
  };

  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold
      const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic
      const italicParsed = boldParsed.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
      return (
        <p key={i} className={i > 0 ? 'mt-1' : ''} dangerouslySetInnerHTML={{ __html: italicParsed || '&nbsp;' }} />
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <VinculaLogo size="sm" showText />
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
              <History className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={startNewConversation}>
              <Plus className="w-4 h-4 mr-1" />
              {t.chat.newConversation}
            </Button>

            {freeMessagesLeft > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <Gift className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">{freeMessagesLeft}</span>
              </div>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <span className="text-sm font-medium">{user?.vinculos || 0} {t.chat.vinculos}</span>
            </div>
          </div>
        </div>
      </header>

      {/* History Sidebar */}
      {showHistory && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-80 bg-card border-r border-border/50 pt-16 flex flex-col h-full shadow-xl">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-semibold">Conversation History</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">No conversations yet</p>
              ) : (
                conversations.map(conv => (
                  <div
                    key={conv.id}
                    onClick={() => loadConversation(conv)}
                    className={`p-3 border-b border-border/30 cursor-pointer hover:bg-secondary/50 flex items-center justify-between ${
                      conv.id === conversationId ? 'bg-secondary' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{conv.title}</p>
                      <p className="text-xs text-muted-foreground">{conv.messages.length} msgs</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => deleteConversation(conv.id, e)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setShowHistory(false)} />
        </div>
      )}

      {/* Messages Area */}
      <main className="flex-1 pt-16 pb-40 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {messages.length === 0 && !streamingText ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <VinculaLogo size="xl" className="mb-6" />
              <h1 className="text-2xl font-bold mb-2">{t.chat.welcome}</h1>
              <p className="text-muted-foreground max-w-md mb-4">{t.chat.welcomeSubtitle}</p>
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
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-md'
                      : 'bg-card border border-border/50 rounded-tl-md'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {renderMessageContent(message.content)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming message */}
              {streamingText && (
                <div className="flex justify-start message-animate">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border/50">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {renderMessageContent(streamingText)}
                    </div>
                  </div>
                </div>
              )}

              {isLoading && !streamingText && (
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
            <div className="relative">
              {/* Balloon above input */}
              <div className="mb-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-destructive">
                  <MessageCircleOff className="w-5 h-5" />
                  <span className="font-medium text-sm">Seus vínculos acabaram, compre um pacote para continuar com essa conversa</span>
                </div>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/pricing">Planos</Link>
                </Button>
              </div>
              {/* Disabled input */}
              <div className="flex items-end gap-3 opacity-50 pointer-events-none">
                <Textarea placeholder={t.chat.placeholder} className="min-h-[52px]" rows={1} disabled />
                <Button variant="hero" size="icon" disabled className="h-[52px] w-[52px] shrink-0">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
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
                <Button
                  variant={isRecording ? 'destructive' : 'outline'}
                  size="icon"
                  onClick={isRecording ? stopRecording : startRecording}
                  className="h-[52px] w-[52px] shrink-0"
                  title={isRecording ? t.chat.stopRecording : t.chat.recordAudio}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>

                <div className="flex-1 relative">
                  <Textarea
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
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
