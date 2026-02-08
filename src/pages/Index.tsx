import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Shield, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';

export default function Index() {
  const { t } = useApp();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MessageCircle,
      title: t.features.personalizedTitle,
      description: t.features.personalizedDesc,
    },
    {
      icon: Shield,
      title: t.features.privateTitle,
      description: t.features.privateDesc,
    },
    {
      icon: Zap,
      title: t.features.instantTitle,
      description: t.features.instantDesc,
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
              <VinculaLogo size="sm" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up text-balance">
              <span className="gradient-vincula-text">{t.hero.title}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up text-balance" style={{ animationDelay: '0.1s' }}>
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to={isAuthenticated ? '/chat' : '/signup'}>
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/how-it-works">{t.hero.ctaSecondary}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-vincula-text">10K+</div>
                <div className="text-sm text-muted-foreground">{t.hero.users}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-vincula-text">50K+</div>
                <div className="text-sm text-muted-foreground">{t.hero.conversations}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-vincula-text">4.9</div>
                <div className="text-sm text-muted-foreground">{t.hero.rating}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border/50 card-hover"
              >
                <div className="w-14 h-14 rounded-xl gradient-vincula flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.howSection.title} <span className="gradient-vincula-text">{t.howSection.subtitle}</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t.howSection.assessment}</h4>
                    <p className="text-sm text-muted-foreground">{t.howSection.assessmentDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t.howSection.explanation}</h4>
                    <p className="text-sm text-muted-foreground">{t.howSection.explanationDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t.howSection.resolution}</h4>
                    <p className="text-sm text-muted-foreground">{t.howSection.resolutionDesc}</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="mt-8" asChild>
                <Link to="/how-it-works">
                  {t.howSection.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Chat Preview */}
            <div className="flex-1 w-full max-w-lg">
              <div className="rounded-2xl bg-card border border-border/50 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <VinculaLogo size="md" />
                  <div>
                    <div className="font-semibold">Víncula AI</div>
                    <div className="text-xs text-muted-foreground">Online</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-md bg-primary text-primary-foreground text-sm">
                      My partner and I keep having the same argument. What should I do?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-md bg-secondary text-sm">
                      <strong>1) Assessment:</strong> It sounds like you're in a conflict loop where patterns repeat...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">{t.cta.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.cta.title}
            </h2>

            <p className="text-lg text-muted-foreground mb-10">
              {t.cta.subtitle}
            </p>

            <Button variant="hero" size="xl" asChild>
              <Link to={isAuthenticated ? '/chat' : '/signup'}>
                {t.cta.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
