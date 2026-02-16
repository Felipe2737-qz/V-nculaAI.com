import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Loader2, Mail, MessageCircle, ArrowLeft, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { sendHelpMessage } from '@/lib/gemini';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HelpMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ErrorReport {
  id: string;
  message: string;
  created_at: string;
}

export default function Help() {
  const [messages, setMessages] = useState<HelpMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useApp();

  // Error report state
  const [errorText, setErrorText] = useState('');
  const [submittingError, setSubmittingError] = useState(false);
  const [reports, setReports] = useState<ErrorReport[]>([]);
  const [showReports, setShowReports] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: HelpMessage = { id: `u-${Date.now()}`, role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
      const response = await sendHelpMessage([...history, { role: 'user', content: text }]);
      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente ou envie email para suporte.vinculaai@gmail.com' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitErrorReport = async () => {
    const msg = errorText.trim();
    if (!msg || submittingError) return;
    setSubmittingError(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/error-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ message: msg }),
      });
      if (!resp.ok) throw new Error('Failed');
      toast.success('Erro relatado com sucesso!');
      setErrorText('');
      if (showReports) fetchReports();
    } catch {
      toast.error('Falha ao relatar erro.');
    } finally {
      setSubmittingError(false);
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/error-reports`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      const data = await resp.json();
      setReports(data.reports || []);
    } catch {
      setReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const toggleReports = () => {
    if (!showReports) fetchReports();
    setShowReports(prev => !prev);
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/"><ArrowLeft className="w-4 h-4" /> Voltar</Link>
            </Button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              Central de Ajuda
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="text-muted-foreground">
                <a href="mailto:suporte.vinculaai@gmail.com" className="text-primary hover:underline inline-flex items-center gap-1">
                  <Mail className="w-4 h-4" /> suporte.vinculaai@gmail.com
                </a>
              </p>

              {/* Report Error inline */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
                <Input
                  value={errorText}
                  onChange={e => setErrorText(e.target.value)}
                  placeholder="Relatar um erro..."
                  className="h-9 text-sm"
                  maxLength={500}
                  onKeyDown={e => { if (e.key === 'Enter') submitErrorReport(); }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={submitErrorReport}
                  disabled={!errorText.trim() || submittingError}
                  className="shrink-0 rounded-xl border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {submittingError ? '...' : 'Relatar'}
                </Button>
              </div>
            </div>

            {/* Toggle reports */}
            <Button variant="ghost" size="sm" onClick={toggleReports} className="mt-2 text-xs text-muted-foreground">
              {showReports ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
              {showReports ? 'Ocultar erros reportados' : 'Ver erros reportados'}
            </Button>

            {showReports && (
              <div className="mt-3 max-h-48 overflow-y-auto space-y-2 bg-secondary/30 rounded-lg p-3">
                {loadingReports ? (
                  <p className="text-xs text-muted-foreground">Carregando...</p>
                ) : reports.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhum erro reportado ainda.</p>
                ) : (
                  reports.map(r => (
                    <div key={r.id} className="text-xs p-2 bg-card rounded-lg border border-border/50">
                      <p className="text-foreground">{r.message}</p>
                      <p className="text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-3xl space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Como podemos ajudar?</h2>
                <p className="text-muted-foreground mb-6">Faça sua pergunta sobre a Víncula AI</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Como funciona?', 'Como pagar?', 'O que são Vínculos?', 'Problemas técnicos'].map(q => (
                    <Button key={q} variant="outline" size="sm" onClick={() => { setInput(q); }}
                      className="hover:scale-[1.05] hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-md'
                    : 'bg-card border border-border/50 rounded-tl-md'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-card border border-border/50">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-4 max-w-3xl flex gap-3">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Digite sua dúvida..."
              className="min-h-[52px] max-h-[120px] resize-none"
              rows={1}
              disabled={isLoading}
            />
            <Button variant="hero" size="icon" onClick={sendMessage} disabled={!input.trim() || isLoading}
              className="h-[52px] w-[52px] shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
