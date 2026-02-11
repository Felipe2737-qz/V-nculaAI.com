import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, language } = useApp();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const isPt = language === 'pt';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptedTerms) {
      setError(isPt ? 'Você precisa aceitar os termos para criar uma conta.' : 'You must accept the terms to create an account.');
      return;
    }

    if (password !== confirmPassword) {
      setError(t.auth.passwordsNoMatch);
      return;
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort);
      return;
    }

    setIsLoading(true);
    const success = await signup(name, email, password);
    if (success) navigate('/chat');
    setIsLoading(false);
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <VinculaLogo size="lg" showText />
            </Link>
          </div>

          <div className="rounded-2xl bg-card border border-border/50 p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-center mb-2">{t.auth.signup}</h1>
            <p className="text-muted-foreground text-center mb-8">{t.auth.createAccount}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t.auth.name}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>

              {/* Terms acceptance */}
              <div className="flex items-start gap-2">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(checked) => setAcceptedTerms(checked === true)} className="mt-1" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  {isPt ? (
                    <>Eu aceito a <Link to="/privacy" className="text-primary hover:underline" target="_blank">Política de Privacidade</Link> e os <Link to="/terms" className="text-primary hover:underline" target="_blank">Termos de Serviço</Link></>
                  ) : (
                    <>I accept the <Link to="/privacy" className="text-primary hover:underline" target="_blank">Privacy Policy</Link> and <Link to="/terms" className="text-primary hover:underline" target="_blank">Terms of Service</Link></>
                  )}
                </label>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" variant="hero" className="w-full" disabled={isLoading || !acceptedTerms}>
                {isLoading ? t.common.loading : t.auth.signup}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t.auth.hasAccount}{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">{t.auth.login}</Link>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
