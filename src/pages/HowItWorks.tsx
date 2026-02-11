import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';

export default function HowItWorks() {
  const { t } = useApp();
  const { isAuthenticated } = useAuth();

  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Text,
    },
    {
      icon: CreditCard,
      number: '02',
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Text,
    },
    {
      icon: MessageSquare,
      number: '03',
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Text,
    },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
              <VinculaLogo size="sm" />
              <span className="text-sm font-medium">{t.howItWorks.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-vincula-text">{t.howItWorks.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start gap-8 mb-16 last:mb-0"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-5xl font-bold text-primary/20">{step.number}</div>
                  <div className="w-16 h-16 rounded-2xl gradient-vincula flex items-center justify-center shrink-0">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Removed 3-topic section */}

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t.howItWorks.ctaTitle}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.howItWorks.ctaText}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to={isAuthenticated ? '/chat' : '/signup'}>
                {t.howItWorks.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
