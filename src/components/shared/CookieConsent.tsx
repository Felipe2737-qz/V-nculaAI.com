import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const COOKIE_KEY = 'vincula_cookie_consent';

type ConsentState = 'pending' | 'accepted' | 'rejected';

const labels = {
  en: {
    message: 'We use cookies to improve your experience and analyze site usage.',
    accept: 'Accept All',
    reject: 'Reject',
    policy: 'Privacy Policy',
  },
  pt: {
    message: 'Usamos cookies para melhorar sua experiência e analisar o uso do site.',
    accept: 'Aceitar Todos',
    reject: 'Rejeitar',
    policy: 'Política de Privacidade',
  },
  es: {
    message: 'Usamos cookies para mejorar tu experiencia y analizar el uso del sitio.',
    accept: 'Aceptar Todo',
    reject: 'Rechazar',
    policy: 'Política de Privacidad',
  },
  fr: {
    message: 'Nous utilisons des cookies pour améliorer votre expérience et analyser l\'utilisation du site.',
    accept: 'Tout Accepter',
    reject: 'Refuser',
    policy: 'Politique de Confidentialité',
  },
  de: {
    message: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und die Nutzung der Website zu analysieren.',
    accept: 'Alle Akzeptieren',
    reject: 'Ablehnen',
    policy: 'Datenschutzrichtlinie',
  },
};

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('accepted'); // hide by default
  const { language } = useApp();

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      setConsent('pending');
    } else {
      setConsent(stored as ConsentState);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setConsent('accepted');
    // Enable tracking
    initTracking();
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    setConsent('rejected');
  };

  if (consent !== 'pending') return null;

  const l = labels[language as keyof typeof labels] || labels.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slide-up">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-2xl glass border border-border/50 p-6 flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1">{l.message}</p>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="ghost" size="sm" onClick={handleReject}>
              {l.reject}
            </Button>
            <Button variant="hero" size="sm" onClick={handleAccept}>
              {l.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function initTracking() {
  // Basic page view tracking stored locally
  try {
    const visits = JSON.parse(localStorage.getItem('vincula_analytics') || '[]');
    visits.push({
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
    });
    // Keep last 100 entries
    if (visits.length > 100) visits.splice(0, visits.length - 100);
    localStorage.setItem('vincula_analytics', JSON.stringify(visits));
  } catch {
    // silently fail
  }
}

// Track page views when consent is accepted
export function trackPageView(path: string) {
  const consent = localStorage.getItem(COOKIE_KEY);
  if (consent !== 'accepted') return;

  try {
    const visits = JSON.parse(localStorage.getItem('vincula_analytics') || '[]');
    visits.push({
      page: path,
      timestamp: new Date().toISOString(),
    });
    if (visits.length > 100) visits.splice(0, visits.length - 100);
    localStorage.setItem('vincula_analytics', JSON.stringify(visits));
  } catch {
    // silently fail
  }
}
