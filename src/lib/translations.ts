// Translations for Víncula AI

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    howItWorks: string;
    about: string;
    chat: string;
    pricing: string;
    login: string;
    signup: string;
    logout: string;
    settings: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  // Auth
  auth: {
    login: string;
    signup: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    resetPassword: string;
    sendResetLink: string;
    backToLogin: string;
    newPassword: string;
    passwordUpdated: string;
  };
  // Chat
  chat: {
    placeholder: string;
    send: string;
    noVinculos: string;
    buyVinculos: string;
    vinculos: string;
    newConversation: string;
    thinking: string;
    welcome: string;
    welcomeSubtitle: string;
  };
  // Pricing
  pricing: {
    title: string;
    subtitle: string;
    perMonth: string;
    vinculos: string;
    popular: string;
    getStarted: string;
    currentPlan: string;
  };
  // Payment
  payment: {
    title: string;
    selectMethod: string;
    pix: string;
    paypal: string;
    wise: string;
    pixKey: string;
    copyKey: string;
    copied: string;
    confirmPayment: string;
    paymentPending: string;
    paymentSuccess: string;
    paymentFailed: string;
  };
  // Settings
  settings: {
    title: string;
    language: string;
    currency: string;
    account: string;
    vinculos: string;
    updateProfile: string;
    dangerZone: string;
    deleteAccount: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    back: string;
    next: string;
    or: string;
  };
  // About
  about: {
    title: string;
    mission: string;
    missionText: string;
    team: string;
    teamText: string;
  };
  // How it works
  howItWorks: {
    title: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How it Works',
      about: 'About',
      chat: 'Chat',
      pricing: 'Pricing',
      login: 'Log In',
      signup: 'Sign Up',
      logout: 'Log Out',
      settings: 'Settings',
    },
    hero: {
      title: 'AI-Powered Relationship Guidance',
      subtitle: 'Get personalized insights for your relationships with our psychology-focused AI assistant.',
      cta: 'Start Chatting',
      ctaSecondary: 'Learn More',
    },
    auth: {
      login: 'Log In',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      resetPassword: 'Reset Password',
      sendResetLink: 'Send Reset Link',
      backToLogin: 'Back to Login',
      newPassword: 'New Password',
      passwordUpdated: 'Password updated successfully!',
    },
    chat: {
      placeholder: 'Type your message...',
      send: 'Send',
      noVinculos: 'You have no Vínculos left',
      buyVinculos: 'Buy Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'New Conversation',
      thinking: 'Thinking...',
      welcome: 'Welcome to Víncula AI',
      welcomeSubtitle: 'Ask me anything about relationships, communication, or personal growth.',
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Get Vínculos to chat with our AI assistant',
      perMonth: 'one-time',
      vinculos: 'Vínculos',
      popular: 'Most Popular',
      getStarted: 'Get Started',
      currentPlan: 'Current',
    },
    payment: {
      title: 'Complete Payment',
      selectMethod: 'Select Payment Method',
      pix: 'PIX',
      paypal: 'PayPal',
      wise: 'Wise',
      pixKey: 'PIX Key',
      copyKey: 'Copy Key',
      copied: 'Copied!',
      confirmPayment: 'I Made the Payment',
      paymentPending: 'Payment Pending',
      paymentSuccess: 'Payment Confirmed!',
      paymentFailed: 'Payment Failed',
    },
    settings: {
      title: 'Account Settings',
      language: 'Language',
      currency: 'Currency',
      account: 'Account',
      vinculos: 'Your Vínculos',
      updateProfile: 'Update Profile',
      dangerZone: 'Danger Zone',
      deleteAccount: 'Delete Account',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      back: 'Back',
      next: 'Next',
      or: 'or',
    },
    about: {
      title: 'About Víncula AI',
      mission: 'Our Mission',
      missionText: 'We believe everyone deserves access to relationship guidance. Víncula AI combines psychology expertise with AI technology to help you navigate relationships with confidence.',
      team: 'Our Approach',
      teamText: 'Our AI is trained on relationship psychology principles, offering practical advice for communication, conflict resolution, and personal growth.',
    },
    howItWorks: {
      title: 'How Víncula AI Works',
      step1Title: 'Create Your Account',
      step1Text: 'Sign up in seconds and get started with a free trial.',
      step2Title: 'Purchase Vínculos',
      step2Text: 'Choose a plan that fits your needs. Each response uses 1 Vínculo.',
      step3Title: 'Start Chatting',
      step3Text: 'Ask questions about relationships, get personalized guidance.',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      howItWorks: 'Como Funciona',
      about: 'Sobre',
      chat: 'Chat',
      pricing: 'Planos',
      login: 'Entrar',
      signup: 'Cadastrar',
      logout: 'Sair',
      settings: 'Configurações',
    },
    hero: {
      title: 'Orientação de Relacionamentos com IA',
      subtitle: 'Obtenha insights personalizados para seus relacionamentos com nosso assistente de IA focado em psicologia.',
      cta: 'Começar a Conversar',
      ctaSecondary: 'Saiba Mais',
    },
    auth: {
      login: 'Entrar',
      signup: 'Cadastrar',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      name: 'Nome Completo',
      forgotPassword: 'Esqueceu a senha?',
      noAccount: 'Não tem uma conta?',
      hasAccount: 'Já tem uma conta?',
      resetPassword: 'Redefinir Senha',
      sendResetLink: 'Enviar Link',
      backToLogin: 'Voltar ao Login',
      newPassword: 'Nova Senha',
      passwordUpdated: 'Senha atualizada com sucesso!',
    },
    chat: {
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      noVinculos: 'Você não tem Vínculos',
      buyVinculos: 'Comprar Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Nova Conversa',
      thinking: 'Pensando...',
      welcome: 'Bem-vindo ao Víncula AI',
      welcomeSubtitle: 'Me pergunte sobre relacionamentos, comunicação ou crescimento pessoal.',
    },
    pricing: {
      title: 'Escolha seu Plano',
      subtitle: 'Obtenha Vínculos para conversar com nosso assistente de IA',
      perMonth: 'único',
      vinculos: 'Vínculos',
      popular: 'Mais Popular',
      getStarted: 'Começar',
      currentPlan: 'Atual',
    },
    payment: {
      title: 'Finalizar Pagamento',
      selectMethod: 'Selecione o Método de Pagamento',
      pix: 'PIX',
      paypal: 'PayPal',
      wise: 'Wise',
      pixKey: 'Chave PIX',
      copyKey: 'Copiar Chave',
      copied: 'Copiado!',
      confirmPayment: 'Já Fiz o Pagamento',
      paymentPending: 'Pagamento Pendente',
      paymentSuccess: 'Pagamento Confirmado!',
      paymentFailed: 'Pagamento Falhou',
    },
    settings: {
      title: 'Configurações da Conta',
      language: 'Idioma',
      currency: 'Moeda',
      account: 'Conta',
      vinculos: 'Seus Vínculos',
      updateProfile: 'Atualizar Perfil',
      dangerZone: 'Zona de Perigo',
      deleteAccount: 'Excluir Conta',
    },
    common: {
      loading: 'Carregando...',
      error: 'Ocorreu um erro',
      success: 'Sucesso!',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Salvar',
      back: 'Voltar',
      next: 'Próximo',
      or: 'ou',
    },
    about: {
      title: 'Sobre o Víncula AI',
      mission: 'Nossa Missão',
      missionText: 'Acreditamos que todos merecem acesso a orientação sobre relacionamentos. O Víncula AI combina expertise em psicologia com tecnologia de IA para ajudá-lo a navegar relacionamentos com confiança.',
      team: 'Nossa Abordagem',
      teamText: 'Nossa IA é treinada em princípios de psicologia de relacionamentos, oferecendo conselhos práticos para comunicação, resolução de conflitos e crescimento pessoal.',
    },
    howItWorks: {
      title: 'Como o Víncula AI Funciona',
      step1Title: 'Crie sua Conta',
      step1Text: 'Cadastre-se em segundos e comece com um teste gratuito.',
      step2Title: 'Compre Vínculos',
      step2Text: 'Escolha um plano que atenda suas necessidades. Cada resposta usa 1 Vínculo.',
      step3Title: 'Comece a Conversar',
      step3Text: 'Faça perguntas sobre relacionamentos e receba orientação personalizada.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      howItWorks: 'Cómo Funciona',
      about: 'Acerca de',
      chat: 'Chat',
      pricing: 'Precios',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      logout: 'Cerrar Sesión',
      settings: 'Configuración',
    },
    hero: {
      title: 'Orientación de Relaciones con IA',
      subtitle: 'Obtén información personalizada para tus relaciones con nuestro asistente de IA enfocado en psicología.',
      cta: 'Empezar a Chatear',
      ctaSecondary: 'Saber Más',
    },
    auth: {
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      email: 'Correo',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre Completo',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      hasAccount: '¿Ya tienes una cuenta?',
      resetPassword: 'Restablecer Contraseña',
      sendResetLink: 'Enviar Enlace',
      backToLogin: 'Volver al Login',
      newPassword: 'Nueva Contraseña',
      passwordUpdated: '¡Contraseña actualizada!',
    },
    chat: {
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      noVinculos: 'No tienes Vínculos',
      buyVinculos: 'Comprar Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Nueva Conversación',
      thinking: 'Pensando...',
      welcome: 'Bienvenido a Víncula AI',
      welcomeSubtitle: 'Pregúntame sobre relaciones, comunicación o crecimiento personal.',
    },
    pricing: {
      title: 'Elige tu Plan',
      subtitle: 'Obtén Vínculos para chatear con nuestro asistente de IA',
      perMonth: 'único',
      vinculos: 'Vínculos',
      popular: 'Más Popular',
      getStarted: 'Empezar',
      currentPlan: 'Actual',
    },
    payment: {
      title: 'Completar Pago',
      selectMethod: 'Seleccionar Método de Pago',
      pix: 'PIX',
      paypal: 'PayPal',
      wise: 'Wise',
      pixKey: 'Clave PIX',
      copyKey: 'Copiar Clave',
      copied: '¡Copiado!',
      confirmPayment: 'Ya Hice el Pago',
      paymentPending: 'Pago Pendiente',
      paymentSuccess: '¡Pago Confirmado!',
      paymentFailed: 'Pago Fallido',
    },
    settings: {
      title: 'Configuración de Cuenta',
      language: 'Idioma',
      currency: 'Moneda',
      account: 'Cuenta',
      vinculos: 'Tus Vínculos',
      updateProfile: 'Actualizar Perfil',
      dangerZone: 'Zona de Peligro',
      deleteAccount: 'Eliminar Cuenta',
    },
    common: {
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      success: '¡Éxito!',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      save: 'Guardar',
      back: 'Atrás',
      next: 'Siguiente',
      or: 'o',
    },
    about: {
      title: 'Acerca de Víncula AI',
      mission: 'Nuestra Misión',
      missionText: 'Creemos que todos merecen acceso a orientación sobre relaciones. Víncula AI combina experiencia en psicología con tecnología de IA.',
      team: 'Nuestro Enfoque',
      teamText: 'Nuestra IA está entrenada en principios de psicología de relaciones, ofreciendo consejos prácticos.',
    },
    howItWorks: {
      title: 'Cómo Funciona Víncula AI',
      step1Title: 'Crea tu Cuenta',
      step1Text: 'Regístrate en segundos y comienza con una prueba gratuita.',
      step2Title: 'Compra Vínculos',
      step2Text: 'Elige un plan. Cada respuesta usa 1 Vínculo.',
      step3Title: 'Empieza a Chatear',
      step3Text: 'Haz preguntas y recibe orientación personalizada.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      howItWorks: 'Comment ça marche',
      about: 'À propos',
      chat: 'Chat',
      pricing: 'Tarifs',
      login: 'Connexion',
      signup: 'Inscription',
      logout: 'Déconnexion',
      settings: 'Paramètres',
    },
    hero: {
      title: 'Conseils Relationnels par IA',
      subtitle: 'Obtenez des conseils personnalisés pour vos relations avec notre assistant IA axé sur la psychologie.',
      cta: 'Commencer à Discuter',
      ctaSecondary: 'En Savoir Plus',
    },
    auth: {
      login: 'Connexion',
      signup: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      name: 'Nom Complet',
      forgotPassword: 'Mot de passe oublié?',
      noAccount: "Pas de compte?",
      hasAccount: 'Déjà un compte?',
      resetPassword: 'Réinitialiser',
      sendResetLink: 'Envoyer le Lien',
      backToLogin: 'Retour à la Connexion',
      newPassword: 'Nouveau Mot de Passe',
      passwordUpdated: 'Mot de passe mis à jour!',
    },
    chat: {
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      noVinculos: 'Vous n\'avez plus de Vínculos',
      buyVinculos: 'Acheter des Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Nouvelle Conversation',
      thinking: 'Réflexion...',
      welcome: 'Bienvenue sur Víncula AI',
      welcomeSubtitle: 'Posez-moi des questions sur les relations ou la croissance personnelle.',
    },
    pricing: {
      title: 'Choisissez Votre Plan',
      subtitle: 'Obtenez des Vínculos pour discuter avec notre assistant IA',
      perMonth: 'unique',
      vinculos: 'Vínculos',
      popular: 'Plus Populaire',
      getStarted: 'Commencer',
      currentPlan: 'Actuel',
    },
    payment: {
      title: 'Finaliser le Paiement',
      selectMethod: 'Sélectionnez le Mode de Paiement',
      pix: 'PIX',
      paypal: 'PayPal',
      wise: 'Wise',
      pixKey: 'Clé PIX',
      copyKey: 'Copier',
      copied: 'Copié!',
      confirmPayment: 'J\'ai Effectué le Paiement',
      paymentPending: 'Paiement en Attente',
      paymentSuccess: 'Paiement Confirmé!',
      paymentFailed: 'Paiement Échoué',
    },
    settings: {
      title: 'Paramètres du Compte',
      language: 'Langue',
      currency: 'Devise',
      account: 'Compte',
      vinculos: 'Vos Vínculos',
      updateProfile: 'Mettre à Jour',
      dangerZone: 'Zone de Danger',
      deleteAccount: 'Supprimer le Compte',
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès!',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Enregistrer',
      back: 'Retour',
      next: 'Suivant',
      or: 'ou',
    },
    about: {
      title: 'À Propos de Víncula AI',
      mission: 'Notre Mission',
      missionText: 'Nous croyons que chacun mérite des conseils relationnels. Víncula AI combine expertise psychologique et technologie IA.',
      team: 'Notre Approche',
      teamText: 'Notre IA est formée aux principes de la psychologie relationnelle.',
    },
    howItWorks: {
      title: 'Comment Fonctionne Víncula AI',
      step1Title: 'Créez Votre Compte',
      step1Text: 'Inscrivez-vous en quelques secondes.',
      step2Title: 'Achetez des Vínculos',
      step2Text: 'Choisissez un plan. Chaque réponse utilise 1 Vínculo.',
      step3Title: 'Commencez à Discuter',
      step3Text: 'Posez des questions et recevez des conseils personnalisés.',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      howItWorks: 'So funktioniert es',
      about: 'Über uns',
      chat: 'Chat',
      pricing: 'Preise',
      login: 'Anmelden',
      signup: 'Registrieren',
      logout: 'Abmelden',
      settings: 'Einstellungen',
    },
    hero: {
      title: 'KI-gestützte Beziehungsberatung',
      subtitle: 'Erhalten Sie personalisierte Einblicke für Ihre Beziehungen mit unserem psychologieorientierten KI-Assistenten.',
      cta: 'Jetzt Chatten',
      ctaSecondary: 'Mehr Erfahren',
    },
    auth: {
      login: 'Anmelden',
      signup: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort Bestätigen',
      name: 'Vollständiger Name',
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Kein Konto?',
      hasAccount: 'Bereits ein Konto?',
      resetPassword: 'Passwort Zurücksetzen',
      sendResetLink: 'Link Senden',
      backToLogin: 'Zurück zur Anmeldung',
      newPassword: 'Neues Passwort',
      passwordUpdated: 'Passwort aktualisiert!',
    },
    chat: {
      placeholder: 'Nachricht eingeben...',
      send: 'Senden',
      noVinculos: 'Keine Vínculos mehr',
      buyVinculos: 'Vínculos Kaufen',
      vinculos: 'Vínculos',
      newConversation: 'Neue Unterhaltung',
      thinking: 'Denkt nach...',
      welcome: 'Willkommen bei Víncula AI',
      welcomeSubtitle: 'Fragen Sie mich zu Beziehungen oder persönlichem Wachstum.',
    },
    pricing: {
      title: 'Wählen Sie Ihren Plan',
      subtitle: 'Erhalten Sie Vínculos für Chats mit unserem KI-Assistenten',
      perMonth: 'einmalig',
      vinculos: 'Vínculos',
      popular: 'Beliebteste',
      getStarted: 'Starten',
      currentPlan: 'Aktuell',
    },
    payment: {
      title: 'Zahlung Abschließen',
      selectMethod: 'Zahlungsmethode Wählen',
      pix: 'PIX',
      paypal: 'PayPal',
      wise: 'Wise',
      pixKey: 'PIX-Schlüssel',
      copyKey: 'Kopieren',
      copied: 'Kopiert!',
      confirmPayment: 'Zahlung Getätigt',
      paymentPending: 'Zahlung Ausstehend',
      paymentSuccess: 'Zahlung Bestätigt!',
      paymentFailed: 'Zahlung Fehlgeschlagen',
    },
    settings: {
      title: 'Kontoeinstellungen',
      language: 'Sprache',
      currency: 'Währung',
      account: 'Konto',
      vinculos: 'Ihre Vínculos',
      updateProfile: 'Profil Aktualisieren',
      dangerZone: 'Gefahrenzone',
      deleteAccount: 'Konto Löschen',
    },
    common: {
      loading: 'Laden...',
      error: 'Ein Fehler ist aufgetreten',
      success: 'Erfolg!',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
      save: 'Speichern',
      back: 'Zurück',
      next: 'Weiter',
      or: 'oder',
    },
    about: {
      title: 'Über Víncula AI',
      mission: 'Unsere Mission',
      missionText: 'Wir glauben, dass jeder Zugang zu Beziehungsberatung verdient. Víncula AI kombiniert Psychologie-Expertise mit KI-Technologie.',
      team: 'Unser Ansatz',
      teamText: 'Unsere KI ist auf Beziehungspsychologie trainiert.',
    },
    howItWorks: {
      title: 'So Funktioniert Víncula AI',
      step1Title: 'Konto Erstellen',
      step1Text: 'Registrieren Sie sich in Sekunden.',
      step2Title: 'Vínculos Kaufen',
      step2Text: 'Wählen Sie einen Plan. Jede Antwort verbraucht 1 Vínculo.',
      step3Title: 'Chatten Starten',
      step3Text: 'Stellen Sie Fragen und erhalten Sie personalisierte Beratung.',
    },
  },
};

export default translations;
