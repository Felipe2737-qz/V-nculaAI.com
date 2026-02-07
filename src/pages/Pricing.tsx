import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plan, CURRENCY_SYMBOLS } from '@/types/api';

// Default plans (used when API is unavailable)
const DEFAULT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    vinculos: 50,
    prices: { USD: 1, BRL: 5, EUR: 0.99, GBP: 0.90 },
  },
  {
    id: 'basic',
    name: 'Basic',
    vinculos: 120,
    prices: { USD: 2, BRL: 10, EUR: 1.99, GBP: 1.80 },
  },
  {
    id: 'advanced',
    name: 'Advanced',
    vinculos: 250,
    prices: { USD: 4, BRL: 20, EUR: 3.99, GBP: 3.60 },
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    vinculos: 1000,
    prices: { USD: 15, BRL: 75, EUR: 14.99, GBP: 13.99 },
  },
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);
  const [isLoading, setIsLoading] = useState(true);
  const { t, currency } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payments/plans?currency=${currency}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.plans) {
            setPlans(data.data.plans);
          }
        }
      } catch (error) {
        console.error('Failed to fetch plans, using defaults');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [currency]);

  const handleSelectPlan = (planId: string) => {
    if (isAuthenticated) {
      navigate(`/payment?plan=${planId}`);
    } else {
      navigate('/signup');
    }
  };

  const formatPrice = (price: number) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Simple Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-vincula-text">{t.pricing.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.pricing.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.popular
                    ? 'bg-card border-primary shadow-lg shadow-primary/10 scale-105'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-vincula text-xs font-semibold text-primary-foreground">
                    {t.pricing.popular}
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.prices[currency] || plan.prices.USD)}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">{t.pricing.perMonth}</span>
                </div>

                <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-secondary/50">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{plan.vinculos}</span>
                  <span className="text-muted-foreground">{t.pricing.vinculos}</span>
                </div>

                <Button
                  variant={plan.popular ? 'hero' : 'outline'}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {t.pricing.getStarted}
                </Button>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    1 Vínculo = 1 AI response
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    No expiration
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-success" />
                    Full conversation history
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">What is a Vínculo?</h3>
                <p className="text-muted-foreground">
                  A Vínculo is our credit unit. Each AI response costs 1 Vínculo. Purchase the pack that fits your needs.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">Do Vínculos expire?</h3>
                <p className="text-muted-foreground">
                  No, your Vínculos never expire. Use them whenever you need guidance.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept PIX (for Brazil), PayPal, and Wise for international payments.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-2">Can I get a refund?</h3>
                <p className="text-muted-foreground">
                  If you're not satisfied, contact us within 7 days of purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
