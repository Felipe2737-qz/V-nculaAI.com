import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Shield, Zap, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { t } = useApp();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MessageCircle,
      title: 'Personalized Guidance',
      description: 'Get tailored advice for your unique relationship situation.',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your conversations are encrypted and never shared.',
    },
    {
      icon: Zap,
      title: 'Instant Response',
      description: 'Get help when you need it, 24/7 availability.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Víncula helped me communicate better with my partner. The advice is practical and actionable.',
      avatar: '👩',
    },
    {
      name: 'Carlos R.',
      text: 'I was skeptical at first, but the AI really understands relationship dynamics.',
      avatar: '👨',
    },
    {
      name: 'Emma L.',
      text: 'Finally, relationship advice that\'s available whenever I need it.',
      avatar: '👩‍🦰',
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
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Psychology</span>
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
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-vincula-text">50K+</div>
                <div className="text-sm text-muted-foreground">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-vincula-text">4.9</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Víncula AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI is trained on relationship psychology principles to give you practical, actionable advice.
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
                Relationship advice that <span className="gradient-vincula-text">actually works</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI analyzes your situation and provides structured guidance in three parts: Assessment, Explanation, and Resolution.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Assessment</h4>
                    <p className="text-sm text-muted-foreground">We identify what's happening in your situation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Explanation</h4>
                    <p className="text-sm text-muted-foreground">Understand why it's happening from a psychology perspective</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Resolution</h4>
                    <p className="text-sm text-muted-foreground">Actionable steps you can take today</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="mt-8" asChild>
                <Link to="/how-it-works">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Chat Preview */}
            <div className="flex-1 w-full max-w-lg">
              <div className="rounded-2xl bg-card border border-border/50 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full gradient-vincula flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
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

      {/* Testimonials */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border/50"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="flex text-primary">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">Start your journey today</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your relationships?
            </h2>

            <p className="text-lg text-muted-foreground mb-10">
              Join thousands of users who have improved their communication and relationships with Víncula AI.
            </p>

            <Button variant="hero" size="xl" asChild>
              <Link to={isAuthenticated ? '/chat' : '/signup'}>
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
