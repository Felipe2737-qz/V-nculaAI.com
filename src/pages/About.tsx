import { Heart, Brain, Users, Sparkles } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';

export default function About() {
  const { t } = useApp();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-6">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-vincula-text">{t.about.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Building technology that helps people build better relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.about.mission}</h2>
                <p className="text-lg text-muted-foreground">
                  {t.about.missionText}
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <div className="w-16 h-16 rounded-2xl gradient-vincula flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Psychology-First Approach</h3>
                <p className="text-muted-foreground">
                  Our AI is trained on established relationship psychology principles, including communication theory, attachment styles, and conflict resolution strategies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Everyone deserves access to quality relationship guidance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empathy</h3>
                <p className="text-muted-foreground">
                  We approach every situation with understanding and compassion.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Action</h3>
                <p className="text-muted-foreground">
                  Every response includes concrete steps you can take today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h3 className="text-xl font-semibold mb-4">What We Cover</h3>
                <ul className="space-y-3">
                  {[
                    'Romantic relationships & dating',
                    'Communication & conflict resolution',
                    'Anxiety & overthinking',
                    'Self-confidence & personal growth',
                    'Family dynamics',
                    'Friendship challenges',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.about.team}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t.about.teamText}
                </p>
                <p className="text-muted-foreground">
                  <strong>Important:</strong> While our AI provides practical guidance based on psychology principles, it is not a replacement for professional therapy. For serious mental health concerns, please consult a licensed professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
