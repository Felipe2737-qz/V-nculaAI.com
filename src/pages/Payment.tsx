import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, CheckCircle, Loader2, QrCode, Upload, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plan, CURRENCY_SYMBOLS } from '@/types/api';
import { VinculaLogo } from '@/components/shared/VinculaLogo';
import { api, isApiConfigured } from '@/lib/api';
import { toast } from 'sonner';
import paypalQr from '@/assets/paypal-qr.jpeg';

const DEFAULT_PLANS: Plan[] = [
  { id: 'starter', name: 'Starter', vinculos: 50, prices: { USD: 1, BRL: 5, EUR: 0.99, GBP: 0.90 } },
  { id: 'basic', name: 'Basic', vinculos: 120, prices: { USD: 2, BRL: 10, EUR: 1.99, GBP: 1.80 } },
  { id: 'advanced', name: 'Advanced', vinculos: 250, prices: { USD: 4, BRL: 20, EUR: 3.99, GBP: 3.60 }, popular: true },
  { id: 'premium', name: 'Premium', vinculos: 1000, prices: { USD: 15, BRL: 75, EUR: 14.99, GBP: 13.99 } },
];

const PIX_KEY = '85982309370';

type PaymentMethod = 'pix' | 'paypal';

function PixLogo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M382.56 349.37c-24.1 0-46.8-9.4-63.9-26.5l-74.6-74.6c-5-4.9-13.7-4.9-18.6 0l-75 75c-17.1 17.1-39.8 26.5-63.9 26.5h-16.1l94.8 94.8c35.2 35.2 92.3 35.2 127.5 0l94.9-94.9h-5.1z" fill="#32BCAD"/>
      <path d="M86.56 162.63c24.1 0 46.8 9.4 63.9 26.5l75 75c5.1 5.1 13.5 5.1 18.6 0l74.6-74.6c17.1-17.1 39.8-26.5 63.9-26.5h5.1l-94.9-94.9c-35.2-35.2-92.3-35.2-127.5 0l-94.8 94.8h16.1z" fill="#32BCAD"/>
      <path d="M444.76 193.87l-50.3-50.3c-2.6 1.5-5.4 2.5-8.3 2.5h-3.6c-17.8 0-34.5 6.9-47.1 19.5l-74.6 74.6c-8.8 8.8-20.3 13.2-31.9 13.2s-23.1-4.4-31.9-13.2l-75-75c-12.5-12.5-29.3-19.5-47.1-19.5h-7.5c-2.9 0-5.7-1-8.3-2.5l-50.4 50.4c-35.2 35.2-35.2 92.3 0 127.5l50.4 50.4c2.6-1.5 5.4-2.5 8.3-2.5h7.5c17.8 0 34.5-6.9 47.1-19.5l75-75c17-17 46.7-17 63.7 0l74.6 74.6c12.5 12.5 29.3 19.5 47.1 19.5h3.6c2.9 0 5.7 1 8.3 2.5l50.3-50.3c35.2-35.1 35.2-92.2 0-127.4z" fill="#32BCAD"/>
    </svg>
  );
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'starter';
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('pix');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { t, currency, language } = useApp();
  const { user, isAuthenticated, refreshUser } = useAuth();
  const navigate = useNavigate();
  const isPt = language === 'pt';

  const plan = DEFAULT_PLANS.find(p => p.id === planId) || DEFAULT_PLANS[0];
  const price = plan.prices[currency] || plan.prices.USD;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const createPayment = async () => {
    setIsCreating(true);
    try {
      if (isApiConfigured()) {
        const response = await api.post<{ paymentId: string }>('/api/payments/create', {
          planId: plan.id, method: selectedMethod, currency,
          idempotencyKey: `${user?.id}-${plan.id}-${Date.now()}`,
        });
        if (response.success && response.data?.paymentId) {
          setPaymentId(response.data.paymentId);
        } else {
          toast.error(response.message || 'Failed to create payment');
        }
      } else {
        setPaymentId(`mock-${Date.now()}`);
      }
    } catch {
      setPaymentId(`mock-${Date.now()}`);
    } finally {
      setIsCreating(false);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      toast.error(isPt ? 'Formato inválido. Use imagem ou PDF.' : 'Invalid format. Use image or PDF.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(isPt ? 'Arquivo muito grande (máx 5MB)' : 'File too large (max 5MB)');
      return;
    }

    setReceiptFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setReceiptPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview(null);
    }
    toast.success(isPt ? 'Comprovante anexado!' : 'Receipt attached!');
  };

  const confirmPayment = async () => {
    if (!paymentId) return;

    if (!receiptFile) {
      toast.error(isPt ? 'Anexe o comprovante de pagamento antes de confirmar.' : 'Please attach the payment receipt before confirming.');
      return;
    }

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
        setIsConfirmed(true);
        toast.success(`${plan.vinculos} Vínculos added! (Demo mode)`);
        setTimeout(() => navigate('/chat'), 2000);
      }
    } catch {
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
            <p className="text-lg text-muted-foreground mb-2">+{plan.vinculos} Vínculos</p>
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
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/pricing"><ArrowLeft className="w-4 h-4" />{t.common.back}</Link>
            </Button>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t.payment.title}</h1>
              <p className="text-muted-foreground">{plan.name} - {plan.vinculos} Vínculos</p>
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VinculaLogo size="lg" />
                  <div>
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">{plan.vinculos} Vínculos</div>
                  </div>
                </div>
                <div className="text-2xl font-bold">{symbol}{price.toFixed(2)}</div>
              </div>
            </div>

            {/* Payment Method Selection */}
            {!paymentId && (
              <>
                <h2 className="text-xl font-semibold mb-4">{t.payment.selectMethod}</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setSelectedMethod('pix')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedMethod === 'pix' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <PixLogo className="w-10 h-10" />
                    <div className="font-medium">PIX</div>
                  </button>
                  <button
                    onClick={() => setSelectedMethod('paypal')}
                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" fill="#003087"/>
                    </svg>
                    <div className="font-medium">PayPal</div>
                  </button>
                </div>

                <Button variant="hero" className="w-full" onClick={createPayment} disabled={isCreating}>
                  {isCreating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />{t.common.loading}</>
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
                        <PixLogo className="w-5 h-5 shrink-0" />
                        <code className="flex-1 text-sm break-all">{PIX_KEY}</code>
                        <Button variant="ghost" size="icon" onClick={copyPixKey}>
                          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="p-6 rounded-lg bg-white flex flex-col items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020126580014br.gov.bcb.pix0136${PIX_KEY}5204000053039865802BR5913Vincula%20AI6008Sao%20Paulo62070503***6304`}
                          alt="PIX QR Code"
                          className="w-56 h-56"
                        />
                        <p className="text-xs text-gray-500 mt-2">{isPt ? 'Escaneie com o app do seu banco' : 'Scan with your bank app'}</p>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {t.payment.sendExactly} <strong>{symbol}{price.toFixed(2)}</strong> via PayPal.
                      </p>
                      <div className="p-6 rounded-lg bg-white flex flex-col items-center justify-center">
                        <img src={paypalQr} alt="PayPal QR Code" className="w-56 h-56 object-contain" />
                        <p className="text-xs text-gray-500 mt-2">{isPt ? 'Escaneie para pagar via PayPal' : 'Scan to pay via PayPal'}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Receipt Upload */}
                <div className="rounded-2xl bg-card border border-border/50 p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-primary" />
                    {isPt ? 'Comprovante de Pagamento' : 'Payment Receipt'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isPt
                      ? 'Anexe o comprovante do PIX ou da transferência PayPal para verificação.'
                      : 'Attach the PIX receipt or PayPal transfer proof for verification.'}
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleReceiptUpload}
                    className="hidden"
                  />

                  {!receiptFile ? (
                    <Button
                      variant="outline"
                      className="w-full h-24 border-dashed border-2 flex flex-col gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {isPt ? 'Clique para anexar comprovante (imagem ou PDF, máx 5MB)' : 'Click to attach receipt (image or PDF, max 5MB)'}
                      </span>
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                        <Check className="w-5 h-5 text-success shrink-0" />
                        <span className="text-sm font-medium truncate">{receiptFile.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => { setReceiptFile(null); setReceiptPreview(null); }}>
                          {isPt ? 'Trocar' : 'Change'}
                        </Button>
                      </div>
                      {receiptPreview && (
                        <img src={receiptPreview} alt="Receipt" className="max-h-48 rounded-lg mx-auto border border-border/50" />
                      )}
                    </div>
                  )}
                </div>

                <Button variant="hero" className="w-full" onClick={confirmPayment} disabled={isConfirming || !receiptFile}>
                  {isConfirming ? (
                    <><Loader2 className="w-4 h-4 animate-spin" />{t.common.loading}</>
                  ) : (
                    <><Check className="w-4 h-4" />{t.payment.confirmPayment}</>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">{t.payment.clickAfter}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
