import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { t } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      // Always show success for security (don't reveal if email exists)
      setIsSent(true);
    } catch (error) {
      toast.error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-vincula flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-vincula-text">Víncula</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-card border border-border/50 p-8 shadow-xl">
            {isSent ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                <p className="text-muted-foreground mb-8">
                  If an account exists with {email}, we've sent a password reset link.
                </p>
                <Button variant="hero-outline" asChild>
                  <Link to="/login">
                    <ArrowLeft className="w-4 h-4" />
                    {t.auth.backToLogin}
                  </Link>
                </Button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-center mb-2">{t.auth.resetPassword}</h1>
                <p className="text-muted-foreground text-center mb-4">
                  Enter your email and we'll send you a reset link.
                </p>
                <p className="text-sm text-muted-foreground text-center mb-8">
                  Ou entre em contato: <a href="mailto:suporte.vinculaai@gmail.com" className="text-primary hover:underline font-medium">suporte.vinculaai@gmail.com</a>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                    {isLoading ? t.common.loading : t.auth.sendResetLink}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  <Link to="/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    {t.auth.backToLogin}
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
