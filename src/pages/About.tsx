import { Heart, Brain, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';
import { VinculaLogo } from '@/components/shared/VinculaLogo';

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
              <span className="text-sm font-medium">{t.about.mission}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-vincula-text">{t.about.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.about.subtitle}
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
                <h3 className="text-xl font-semibold mb-3">{t.about.psychologyTitle}</h3>
                <p className="text-muted-foreground">
                  {t.about.psychologyText}
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
            <h2 className="text-3xl font-bold text-center mb-12">{t.about.valuesTitle}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.about.accessibilityTitle}</h3>
                <p className="text-muted-foreground">
                  {t.about.accessibilityText}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.about.empathyTitle}</h3>
                <p className="text-muted-foreground">
                  {t.about.empathyText}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <VinculaLogo size="lg" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.about.actionTitle}</h3>
                <p className="text-muted-foreground">
                  {t.about.actionText}
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
                <h3 className="text-xl font-semibold mb-4">{t.about.coverTitle}</h3>
                <ul className="space-y-3">
                  {[
                    t.about.coverItem1,
                    t.about.coverItem2,
                    t.about.coverItem3,
                    t.about.coverItem4,
                    t.about.coverItem5,
                    t.about.coverItem6,
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
                  <strong>Important:</strong> {t.about.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
