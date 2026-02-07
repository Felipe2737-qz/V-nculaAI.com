import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, CreditCard, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Simple & Effective</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-vincula-text">{t.howItWorks.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get started in minutes and receive personalized relationship guidance.
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

      {/* AI Response Structure */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Every Response is Structured for Action
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Assessment</h3>
                <p className="text-muted-foreground">
                  We analyze your situation and identify the core dynamics at play.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explanation</h3>
                <p className="text-muted-foreground">
                  Understand the psychology behind what's happening in your relationship.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Resolution</h3>
                <p className="text-muted-foreground">
                  Concrete, actionable steps you can implement immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your free account and start getting personalized relationship guidance today.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to={isAuthenticated ? '/chat' : '/signup'}>
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
