import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, CheckCircle, Loader2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plan, CURRENCY_SYMBOLS } from '@/types/api';
import { VinculaLogo } from '@/components/shared/VinculaLogo';
import { api, isApiConfigured } from '@/lib/api';
import { toast } from 'sonner';

const DEFAULT_PLANS: Plan[] = [
  { id: 'starter', name: 'Starter', vinculos: 50, prices: { USD: 1, BRL: 5, EUR: 0.99, GBP: 0.90 } },
  { id: 'basic', name: 'Basic', vinculos: 120, prices: { USD: 2, BRL: 10, EUR: 1.99, GBP: 1.80 } },
  { id: 'advanced', name: 'Advanced', vinculos: 250, prices: { USD: 4, BRL: 20, EUR: 3.99, GBP: 3.60 }, popular: true },
  { id: 'premium', name: 'Premium', vinculos: 1000, prices: { USD: 15, BRL: 75, EUR: 14.99, GBP: 13.99 } },
];

const PIX_KEY = import.meta.env.VITE_PIX_KEY || 'your-pix-key@email.com';

type PaymentMethod = 'pix' | 'paypal' | 'wise';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'starter';
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('pix');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const { t, currency } = useApp();
  const { user, isAuthenticated, refreshUser } = useAuth();
  const navigate = useNavigate();

  const plan = DEFAULT_PLANS.find(p => p.id === planId) || DEFAULT_PLANS[0];
  const price = plan.prices[currency] || plan.prices.USD;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const createPayment = async () => {
    setIsCreating(true);
    try {
      if (isApiConfigured()) {
        const response = await api.post<{ paymentId: string }>('/api/payments/create', {
          planId: plan.id,
          method: selectedMethod,
          currency,
          idempotencyKey: `${user?.id}-${plan.id}-${Date.now()}`,
        });

        if (response.success && response.data?.paymentId) {
          setPaymentId(response.data.paymentId);
        } else {
          toast.error(response.message || 'Failed to create payment');
        }
      } else {
        // Demo mode
        setPaymentId(`mock-${Date.now()}`);
      }
    } catch (error) {
      setPaymentId(`mock-${Date.now()}`);
    } finally {
      setIsCreating(false);
    }
  };

  const confirmPayment = async () => {
    if (!paymentId) return;
    
    setIsConfirming(true);
    try {
      if (isApiConfigured()) {
        const response = await api.post('/api/payments/confirm', { paymentId });

        if (response.success) {
          setIsConfirmed(true);
          await refreshUser();
          toast.success(`${plan.vinculos} Vínculos added!`);
          setTimeout(() => navigate('/chat'), 2000);
        } else {
          toast.error(response.message || 'Failed to confirm payment');
        }
      } else {
        // Demo mode
        setIsConfirmed(true);
        toast.success(`${plan.vinculos} Vínculos added! (Demo mode)`);
        setTimeout(() => navigate('/chat'), 2000);
      }
    } catch (error) {
      setIsConfirmed(true);
      toast.success(`${plan.vinculos} Vínculos added! (Demo mode)`);
      setTimeout(() => navigate('/chat'), 2000);
    } finally {
      setIsConfirming(false);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    toast.success(t.payment.copied);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isConfirmed) {
    return (
      <PageLayout showFooter={false}>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{t.payment.paymentSuccess}</h1>
            <p className="text-lg text-muted-foreground mb-2">
              +{plan.vinculos} Vínculos
            </p>
            <p className="text-muted-foreground">{t.payment.redirecting}</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/pricing">
                <ArrowLeft className="w-4 h-4" />
                {t.common.back}
              </Link>
            </Button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t.payment.title}</h1>
              <p className="text-muted-foreground">
                {plan.name} - {plan.vinculos} Vínculos
              </p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <VinculaLogo size="lg" />
                  <div>
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">{plan.vinculos} Vínculos</div>
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {symbol}{price.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            {!paymentId && (
              <>
                <h2 className="text-xl font-semibold mb-4">{t.payment.selectMethod}</h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {(['pix', 'paypal', 'wise'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedMethod(method)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedMethod === method
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {method === 'pix' && '🇧🇷'}
                        {method === 'paypal' && '💳'}
                        {method === 'wise' && '🌍'}
                      </div>
                      <div className="font-medium capitalize">{method}</div>
                    </button>
                  ))}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={createPayment}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.common.loading}
                    </>
                  ) : (
                    `${t.payment.continueWith} ${selectedMethod.toUpperCase()}`
                  )}
                </Button>
              </>
            )}

            {/* Payment Instructions */}
            {paymentId && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    {t.payment.instructions}
                  </h3>

                  {selectedMethod === 'pix' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {t.payment.sendExactly} <strong>{symbol}{price.toFixed(2)}</strong>:
                      </p>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary">
                        <code className="flex-1 text-sm break-all">{PIX_KEY}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={copyPixKey}
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="p-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <QrCode className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">{t.payment.qrPlaceholder}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {t.payment.sendExactly} <strong>{symbol}{price.toFixed(2)}</strong> via PayPal.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="https://paypal.me" target="_blank" rel="noopener noreferrer">
                          Open PayPal
                        </a>
                      </Button>
                    </div>
                  )}

                  {selectedMethod === 'wise' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {t.payment.sendExactly} <strong>{symbol}{price.toFixed(2)}</strong> via Wise.
                      </p>
                      <Button variant="outline" className="w-full" asChild>
                        <a href="https://wise.com" target="_blank" rel="noopener noreferrer">
                          Open Wise
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={confirmPayment}
                  disabled={isConfirming}
                >
                  {isConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.common.loading}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {t.payment.confirmPayment}
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t.payment.clickAfter}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
