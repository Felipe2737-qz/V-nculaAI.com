import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Sparkles, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { t } = useApp();
  const { user, isAuthenticated, updateVinculos } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const hasVinculos = (user?.vinculos || 0) > 0;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!hasVinculos) {
      toast.error(t.chat.noVinculos);
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: userMessage.content,
          conversationId,
        }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.data.text,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        
        if (data.data.conversationId) {
          setConversationId(data.data.conversationId);
        }

        if (typeof data.data.vinculosLeft === 'number') {
          updateVinculos(data.data.vinculosLeft);
        }
      } else {
        // Handle error cases
        if (res.status === 403) {
          toast.error(t.chat.noVinculos);
        } else {
          toast.error(data.message || 'Failed to get response');
        }
      }
    } catch (error) {
      // Demo fallback - simulate AI response
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
      
      // Simulate vínculo consumption in demo
      if (user) {
        updateVinculos(Math.max(0, (user.vinculos || 1) - 1));
      }
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
            <div className="w-8 h-8 rounded-lg gradient-vincula flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-vincula-text">Víncula</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* New Chat Button */}
            <Button variant="ghost" size="sm" onClick={startNewConversation}>
              <Plus className="w-4 h-4 mr-1" />
              {t.chat.newConversation}
            </Button>

            {/* Vínculos Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{user?.vinculos || 0}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 pt-16 pb-32 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-3xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 rounded-2xl gradient-vincula flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{t.chat.welcome}</h1>
              <p className="text-muted-foreground max-w-md">
                {t.chat.welcomeSubtitle}
              </p>
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
          {!hasVinculos ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">{t.chat.noVinculos}</span>
              </div>
              <Button variant="hero" asChild>
                <Link to="/pricing">{t.chat.buyVinculos}</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.chat.placeholder}
                  className="min-h-[52px] max-h-[200px] resize-none pr-12"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              <Button
                variant="hero"
                size="icon"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="h-[52px] w-[52px] shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
