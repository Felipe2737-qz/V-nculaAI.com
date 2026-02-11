// Complete Translations for Víncula AI - All pages fully translated

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
    badge: string;
    users: string;
    conversations: string;
    rating: string;
  };
  // Features
  features: {
    title: string;
    subtitle: string;
    personalizedTitle: string;
    personalizedDesc: string;
    privateTitle: string;
    privateDesc: string;
    instantTitle: string;
    instantDesc: string;
  };
  // How it works section on landing
  howSection: {
    title: string;
    subtitle: string;
    assessment: string;
    assessmentDesc: string;
    explanation: string;
    explanationDesc: string;
    resolution: string;
    resolutionDesc: string;
    cta: string;
  };
  // CTA section
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
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
    welcomeBack: string;
    createAccount: string;
    passwordsNoMatch: string;
    passwordTooShort: string;
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
    freeMessagesLeft: string;
    noFreeMessages: string;
    charLimit: string;
    charLimitAudio: string;
    recordAudio: string;
    stopRecording: string;
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
    badge: string;
    faqTitle: string;
    faq1Title: string;
    faq1Text: string;
    faq2Title: string;
    faq2Text: string;
    faq3Title: string;
    faq3Text: string;
    faq4Title: string;
    faq4Text: string;
    feature1: string;
    feature2: string;
    feature3: string;
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
    instructions: string;
    sendExactly: string;
    qrPlaceholder: string;
    continueWith: string;
    clickAfter: string;
    redirecting: string;
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
    preferences: string;
    buyMore: string;
    emailNoChange: string;
    deleteWarning: string;
    deleteConfirmTitle: string;
    deleteConfirmDesc: string;
    langNoCurrency: string;
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
    offline: string;
    offlineDesc: string;
    tryAgain: string;
  };
  // About
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionText: string;
    team: string;
    teamText: string;
    valuesTitle: string;
    accessibilityTitle: string;
    accessibilityText: string;
    empathyTitle: string;
    empathyText: string;
    actionTitle: string;
    actionText: string;
    psychologyTitle: string;
    psychologyText: string;
    coverTitle: string;
    coverItem1: string;
    coverItem2: string;
    coverItem3: string;
    coverItem4: string;
    coverItem5: string;
    coverItem6: string;
    disclaimer: string;
  };
  // How it works
  howItWorks: {
    title: string;
    subtitle: string;
    badge: string;
    step1Title: string;
    step1Text: string;
    step2Title: string;
    step2Text: string;
    step3Title: string;
    step3Text: string;
    structuredTitle: string;
    assessmentTitle: string;
    assessmentText: string;
    explanationTitle: string;
    explanationText: string;
    resolutionTitle: string;
    resolutionText: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  // Footer
  footer: {
    tagline: string;
    product: string;
    legal: string;
    privacy: string;
    terms: string;
    rights: string;
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
      badge: 'AI-Powered Psychology',
      users: 'Users',
      conversations: 'Conversations',
      rating: 'Rating',
    },
    features: {
      title: 'Why Choose Víncula AI?',
      subtitle: 'Our AI is trained on relationship psychology principles to give you practical, actionable advice.',
      personalizedTitle: 'Personalized Guidance',
      personalizedDesc: 'Get tailored advice for your unique relationship situation.',
      privateTitle: 'Private & Secure',
      privateDesc: 'Your conversations are encrypted and never shared.',
      instantTitle: 'Instant Response',
      instantDesc: 'Get help when you need it, 24/7 availability.',
    },
    howSection: {
      title: 'Relationship advice that',
      subtitle: 'actually works',
      assessment: 'Assessment',
      assessmentDesc: 'We identify what\'s happening in your situation',
      explanation: 'Explanation',
      explanationDesc: 'Understand why it\'s happening from a psychology perspective',
      resolution: 'Resolution',
      resolutionDesc: 'Actionable steps you can take today',
      cta: 'Learn More',
    },
    cta: {
      badge: 'Start your journey today',
      title: 'Ready to transform your relationships?',
      subtitle: 'Join thousands of users who have improved their communication and relationships with Víncula AI.',
      button: 'Get Started Free',
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
      welcomeBack: 'Welcome back! Enter your credentials.',
      createAccount: 'Create your account to get started.',
      passwordsNoMatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
    },
    chat: {
      placeholder: 'Type your message... (max 500 chars)',
      send: 'Send',
      noVinculos: 'You have no Vínculos left',
      buyVinculos: 'Buy Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'New Chat',
      thinking: 'Thinking...',
      welcome: 'Welcome to Víncula AI',
      welcomeSubtitle: 'Ask me anything about relationships, communication, or personal growth.',
      freeMessagesLeft: 'free messages left today',
      noFreeMessages: 'No free messages left today',
      charLimit: 'characters',
      charLimitAudio: 'Audio limit: 700 chars',
      recordAudio: 'Record audio',
      stopRecording: 'Stop recording',
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Get Vínculos to chat with our AI assistant',
      perMonth: 'one-time',
      vinculos: 'Vínculos',
      popular: 'Most Popular',
      getStarted: 'Get Started',
      currentPlan: 'Current',
      badge: 'Simple Pricing',
      faqTitle: 'Frequently Asked Questions',
      faq1Title: 'What is a Vínculo?',
      faq1Text: 'A Vínculo is our credit unit. Each AI response costs 1 Vínculo. Purchase the pack that fits your needs.',
      faq2Title: 'Do Vínculos expire?',
      faq2Text: 'No, your Vínculos never expire. Use them whenever you need guidance.',
      faq3Title: 'What payment methods do you accept?',
      faq3Text: 'We accept PIX (for Brazil), PayPal, and Wise for international payments.',
      faq4Title: 'Can I get a refund?',
      faq4Text: 'If you\'re not satisfied, contact us within 7 days of purchase for a full refund.',
      feature1: '1 Vínculo = 1 AI response',
      feature2: 'No expiration',
      feature3: 'Full conversation history',
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
      instructions: 'Payment Instructions',
      sendExactly: 'Send exactly',
      qrPlaceholder: 'QR Code would be generated here',
      continueWith: 'Continue with',
      clickAfter: 'Click above only after completing the payment',
      redirecting: 'Redirecting to chat...',
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
      preferences: 'Preferences',
      buyMore: 'Buy More',
      emailNoChange: 'Email cannot be changed',
      deleteWarning: 'Once you delete your account, there is no going back. Please be certain.',
      deleteConfirmTitle: 'Are you absolutely sure?',
      deleteConfirmDesc: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      langNoCurrency: 'Language does not change currency',
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
      offline: 'Server Unavailable',
      offlineDesc: 'Unable to connect to the server. Please check your connection or try again later.',
      tryAgain: 'Try Again',
    },
    about: {
      title: 'About Víncula AI',
      subtitle: 'Building technology that helps people build better relationships.',
      mission: 'Our Mission',
      missionText: 'We believe everyone deserves access to relationship guidance. Víncula AI combines psychology expertise with AI technology to help you navigate relationships with confidence.',
      team: 'Our Approach',
      teamText: 'Our AI is trained on relationship psychology principles, offering practical advice for communication, conflict resolution, and personal growth.',
      valuesTitle: 'Our Values',
      accessibilityTitle: 'Accessibility',
      accessibilityText: 'Everyone deserves access to quality relationship guidance.',
      empathyTitle: 'Empathy',
      empathyText: 'We approach every situation with understanding and compassion.',
      actionTitle: 'Action',
      actionText: 'Every response includes concrete steps you can take today.',
      psychologyTitle: 'Psychology-First Approach',
      psychologyText: 'Our AI is trained on established relationship psychology principles, including communication theory, attachment styles, and conflict resolution strategies.',
      coverTitle: 'What We Cover',
      coverItem1: 'Romantic relationships & dating',
      coverItem2: 'Communication & conflict resolution',
      coverItem3: 'Anxiety & overthinking',
      coverItem4: 'Self-confidence & personal growth',
      coverItem5: 'Family dynamics',
      coverItem6: 'Friendship challenges',
      disclaimer: 'While our AI provides practical guidance based on psychology principles, it is not a replacement for professional therapy. For serious mental health concerns, please consult a licensed professional.',
    },
    howItWorks: {
      title: 'How Víncula AI Works',
      subtitle: 'Get started in minutes and receive personalized relationship guidance.',
      badge: 'Simple & Effective',
      step1Title: 'Create Your Account',
      step1Text: 'Sign up in seconds and get 25 free messages per day.',
      step2Title: 'Purchase Vínculos',
      step2Text: 'Choose a plan that fits your needs. Each response uses 1 Vínculo.',
      step3Title: 'Start Chatting',
      step3Text: 'Ask questions about relationships, get personalized guidance.',
      structuredTitle: 'Every Response is Structured for Action',
      assessmentTitle: 'Assessment',
      assessmentText: 'We analyze your situation and identify the core dynamics at play.',
      explanationTitle: 'Explanation',
      explanationText: 'Understand the psychology behind what\'s happening in your relationship.',
      resolutionTitle: 'Resolution',
      resolutionText: 'Concrete, actionable steps you can implement immediately.',
      ctaTitle: 'Ready to Get Started?',
      ctaText: 'Create your free account and start getting personalized relationship guidance today.',
      ctaButton: 'Start Chatting',
    },
    footer: {
      tagline: 'AI-powered relationship guidance',
      product: 'Product',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      rights: 'All rights reserved.',
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
      badge: 'Psicologia com IA',
      users: 'Usuários',
      conversations: 'Conversas',
      rating: 'Avaliação',
    },
    features: {
      title: 'Por Que Escolher o Víncula AI?',
      subtitle: 'Nossa IA é treinada em princípios de psicologia de relacionamentos para fornecer conselhos práticos e acionáveis.',
      personalizedTitle: 'Orientação Personalizada',
      personalizedDesc: 'Receba conselhos adaptados à sua situação única de relacionamento.',
      privateTitle: 'Privado e Seguro',
      privateDesc: 'Suas conversas são criptografadas e nunca compartilhadas.',
      instantTitle: 'Resposta Instantânea',
      instantDesc: 'Obtenha ajuda quando precisar, disponível 24/7.',
    },
    howSection: {
      title: 'Conselhos de relacionamento que',
      subtitle: 'realmente funcionam',
      assessment: 'Diagnóstico',
      assessmentDesc: 'Identificamos o que está acontecendo na sua situação',
      explanation: 'Explicação',
      explanationDesc: 'Entenda por que isso está acontecendo da perspectiva da psicologia',
      resolution: 'Resolução',
      resolutionDesc: 'Passos práticos que você pode tomar hoje',
      cta: 'Saiba Mais',
    },
    cta: {
      badge: 'Comece sua jornada hoje',
      title: 'Pronto para transformar seus relacionamentos?',
      subtitle: 'Junte-se a milhares de usuários que melhoraram sua comunicação e relacionamentos com o Víncula AI.',
      button: 'Começar Grátis',
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
      welcomeBack: 'Bem-vindo de volta! Digite suas credenciais.',
      createAccount: 'Crie sua conta para começar.',
      passwordsNoMatch: 'As senhas não coincidem',
      passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
    },
    chat: {
      placeholder: 'Digite sua mensagem... (máx 500 caracteres)',
      send: 'Enviar',
      noVinculos: 'Você não tem Vínculos',
      buyVinculos: 'Comprar Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Novo Chat',
      thinking: 'Pensando...',
      welcome: 'Bem-vindo ao Víncula AI',
      welcomeSubtitle: 'Me pergunte sobre relacionamentos, comunicação ou crescimento pessoal.',
      freeMessagesLeft: 'mensagens grátis restantes hoje',
      noFreeMessages: 'Sem mensagens grátis hoje',
      charLimit: 'caracteres',
      charLimitAudio: 'Limite de áudio: 700 caracteres',
      recordAudio: 'Gravar áudio',
      stopRecording: 'Parar gravação',
    },
    pricing: {
      title: 'Escolha seu Plano',
      subtitle: 'Obtenha Vínculos para conversar com nosso assistente de IA',
      perMonth: 'único',
      vinculos: 'Vínculos',
      popular: 'Mais Popular',
      getStarted: 'Começar',
      currentPlan: 'Atual',
      badge: 'Preços Simples',
      faqTitle: 'Perguntas Frequentes',
      faq1Title: 'O que é um Vínculo?',
      faq1Text: 'Um Vínculo é nossa unidade de crédito. Cada resposta da IA custa 1 Vínculo. Compre o pacote que atende suas necessidades.',
      faq2Title: 'Os Vínculos expiram?',
      faq2Text: 'Não, seus Vínculos nunca expiram. Use-os quando precisar de orientação.',
      faq3Title: 'Quais métodos de pagamento vocês aceitam?',
      faq3Text: 'Aceitamos PIX, PayPal e Wise para pagamentos internacionais.',
      faq4Title: 'Posso obter reembolso?',
      faq4Text: 'Se não estiver satisfeito, entre em contato dentro de 7 dias da compra para reembolso total.',
      feature1: '1 Vínculo = 1 resposta da IA',
      feature2: 'Sem expiração',
      feature3: 'Histórico completo de conversas',
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
      instructions: 'Instruções de Pagamento',
      sendExactly: 'Envie exatamente',
      qrPlaceholder: 'QR Code será gerado aqui',
      continueWith: 'Continuar com',
      clickAfter: 'Clique acima apenas após completar o pagamento',
      redirecting: 'Redirecionando para o chat...',
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
      preferences: 'Preferências',
      buyMore: 'Comprar Mais',
      emailNoChange: 'Email não pode ser alterado',
      deleteWarning: 'Depois de excluir sua conta, não há volta. Por favor, tenha certeza.',
      deleteConfirmTitle: 'Você tem certeza absoluta?',
      deleteConfirmDesc: 'Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados dos nossos servidores.',
      langNoCurrency: 'Idioma não altera a moeda',
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
      offline: 'Servidor Indisponível',
      offlineDesc: 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.',
      tryAgain: 'Tentar Novamente',
    },
    about: {
      title: 'Sobre o Víncula AI',
      subtitle: 'Construindo tecnologia que ajuda pessoas a construir melhores relacionamentos.',
      mission: 'Nossa Missão',
      missionText: 'Acreditamos que todos merecem acesso a orientação sobre relacionamentos. O Víncula AI combina expertise em psicologia com tecnologia de IA para ajudá-lo a navegar relacionamentos com confiança.',
      team: 'Nossa Abordagem',
      teamText: 'Nossa IA é treinada em princípios de psicologia de relacionamentos, oferecendo conselhos práticos para comunicação, resolução de conflitos e crescimento pessoal.',
      valuesTitle: 'Nossos Valores',
      accessibilityTitle: 'Acessibilidade',
      accessibilityText: 'Todos merecem acesso a orientação de qualidade sobre relacionamentos.',
      empathyTitle: 'Empatia',
      empathyText: 'Abordamos cada situação com compreensão e compaixão.',
      actionTitle: 'Ação',
      actionText: 'Cada resposta inclui passos concretos que você pode tomar hoje.',
      psychologyTitle: 'Abordagem Focada em Psicologia',
      psychologyText: 'Nossa IA é treinada em princípios estabelecidos de psicologia de relacionamentos, incluindo teoria da comunicação, estilos de apego e estratégias de resolução de conflitos.',
      coverTitle: 'O Que Cobrimos',
      coverItem1: 'Relacionamentos românticos e namoro',
      coverItem2: 'Comunicação e resolução de conflitos',
      coverItem3: 'Ansiedade e pensamento excessivo',
      coverItem4: 'Autoconfiança e crescimento pessoal',
      coverItem5: 'Dinâmicas familiares',
      coverItem6: 'Desafios de amizade',
      disclaimer: 'Embora nossa IA forneça orientação prática baseada em princípios de psicologia, não é um substituto para terapia profissional. Para preocupações sérias de saúde mental, consulte um profissional licenciado.',
    },
    howItWorks: {
      title: 'Como o Víncula AI Funciona',
      subtitle: 'Comece em minutos e receba orientação personalizada sobre relacionamentos.',
      badge: 'Simples e Eficaz',
      step1Title: 'Crie sua Conta',
      step1Text: 'Cadastre-se em segundos e ganhe 25 mensagens grátis por dia.',
      step2Title: 'Compre Vínculos',
      step2Text: 'Escolha um plano que atenda suas necessidades. Cada resposta usa 1 Vínculo.',
      step3Title: 'Comece a Conversar',
      step3Text: 'Faça perguntas sobre relacionamentos e receba orientação personalizada.',
      structuredTitle: 'Cada Resposta é Estruturada para Ação',
      assessmentTitle: 'Diagnóstico',
      assessmentText: 'Analisamos sua situação e identificamos as dinâmicas centrais em jogo.',
      explanationTitle: 'Explicação',
      explanationText: 'Entenda a psicologia por trás do que está acontecendo no seu relacionamento.',
      resolutionTitle: 'Resolução',
      resolutionText: 'Passos concretos e acionáveis que você pode implementar imediatamente.',
      ctaTitle: 'Pronto para Começar?',
      ctaText: 'Crie sua conta gratuita e comece a receber orientação personalizada sobre relacionamentos hoje.',
      ctaButton: 'Começar a Conversar',
    },
    footer: {
      tagline: 'Orientação de relacionamentos com IA',
      product: 'Produto',
      legal: 'Legal',
      privacy: 'Privacidade',
      terms: 'Termos',
      rights: 'Todos os direitos reservados.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      howItWorks: 'Cómo Funciona',
      about: 'Nosotros',
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
      badge: 'Psicología con IA',
      users: 'Usuarios',
      conversations: 'Conversaciones',
      rating: 'Calificación',
    },
    features: {
      title: '¿Por Qué Elegir Víncula AI?',
      subtitle: 'Nuestra IA está entrenada en principios de psicología de relaciones para darte consejos prácticos y accionables.',
      personalizedTitle: 'Orientación Personalizada',
      personalizedDesc: 'Recibe consejos adaptados a tu situación única de relación.',
      privateTitle: 'Privado y Seguro',
      privateDesc: 'Tus conversaciones están encriptadas y nunca se comparten.',
      instantTitle: 'Respuesta Instantánea',
      instantDesc: 'Obtén ayuda cuando la necesites, disponibilidad 24/7.',
    },
    howSection: {
      title: 'Consejos de relaciones que',
      subtitle: 'realmente funcionan',
      assessment: 'Evaluación',
      assessmentDesc: 'Identificamos qué está pasando en tu situación',
      explanation: 'Explicación',
      explanationDesc: 'Entiende por qué sucede desde la perspectiva de la psicología',
      resolution: 'Resolución',
      resolutionDesc: 'Pasos prácticos que puedes tomar hoy',
      cta: 'Saber Más',
    },
    cta: {
      badge: 'Comienza tu viaje hoy',
      title: '¿Listo para transformar tus relaciones?',
      subtitle: 'Únete a miles de usuarios que han mejorado su comunicación y relaciones con Víncula AI.',
      button: 'Empezar Gratis',
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
      welcomeBack: '¡Bienvenido de nuevo! Ingresa tus credenciales.',
      createAccount: 'Crea tu cuenta para comenzar.',
      passwordsNoMatch: 'Las contraseñas no coinciden',
      passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
    },
    chat: {
      placeholder: 'Escribe tu mensaje... (máx 500 caracteres)',
      send: 'Enviar',
      noVinculos: 'No tienes Vínculos',
      buyVinculos: 'Comprar Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Nuevo Chat',
      thinking: 'Pensando...',
      welcome: 'Bienvenido a Víncula AI',
      welcomeSubtitle: 'Pregúntame sobre relaciones, comunicación o crecimiento personal.',
      freeMessagesLeft: 'mensajes gratis restantes hoy',
      noFreeMessages: 'Sin mensajes gratis hoy',
      charLimit: 'caracteres',
      charLimitAudio: 'Límite de audio: 700 caracteres',
      recordAudio: 'Grabar audio',
      stopRecording: 'Detener grabación',
    },
    pricing: {
      title: 'Elige tu Plan',
      subtitle: 'Obtén Vínculos para chatear con nuestro asistente de IA',
      perMonth: 'único',
      vinculos: 'Vínculos',
      popular: 'Más Popular',
      getStarted: 'Empezar',
      currentPlan: 'Actual',
      badge: 'Precios Simples',
      faqTitle: 'Preguntas Frecuentes',
      faq1Title: '¿Qué es un Vínculo?',
      faq1Text: 'Un Vínculo es nuestra unidad de crédito. Cada respuesta de IA cuesta 1 Vínculo.',
      faq2Title: '¿Los Vínculos expiran?',
      faq2Text: 'No, tus Vínculos nunca expiran. Úsalos cuando necesites orientación.',
      faq3Title: '¿Qué métodos de pago aceptan?',
      faq3Text: 'Aceptamos PIX (para Brasil), PayPal y Wise para pagos internacionales.',
      faq4Title: '¿Puedo obtener un reembolso?',
      faq4Text: 'Si no estás satisfecho, contáctanos dentro de 7 días de la compra para un reembolso completo.',
      feature1: '1 Vínculo = 1 respuesta de IA',
      feature2: 'Sin expiración',
      feature3: 'Historial completo de conversaciones',
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
      instructions: 'Instrucciones de Pago',
      sendExactly: 'Envía exactamente',
      qrPlaceholder: 'El código QR se generará aquí',
      continueWith: 'Continuar con',
      clickAfter: 'Haz clic arriba solo después de completar el pago',
      redirecting: 'Redirigiendo al chat...',
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
      preferences: 'Preferencias',
      buyMore: 'Comprar Más',
      emailNoChange: 'El correo no se puede cambiar',
      deleteWarning: 'Una vez elimines tu cuenta, no hay vuelta atrás. Por favor, ten certeza.',
      deleteConfirmTitle: '¿Estás absolutamente seguro?',
      deleteConfirmDesc: 'Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y removerá tus datos de nuestros servidores.',
      langNoCurrency: 'El idioma no cambia la moneda',
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
      offline: 'Servidor No Disponible',
      offlineDesc: 'No se pudo conectar al servidor. Verifica tu conexión o intenta de nuevo más tarde.',
      tryAgain: 'Intentar de Nuevo',
    },
    about: {
      title: 'Acerca de Víncula AI',
      subtitle: 'Construyendo tecnología que ayuda a las personas a construir mejores relaciones.',
      mission: 'Nuestra Misión',
      missionText: 'Creemos que todos merecen acceso a orientación sobre relaciones. Víncula AI combina experiencia en psicología con tecnología de IA.',
      team: 'Nuestro Enfoque',
      teamText: 'Nuestra IA está entrenada en principios de psicología de relaciones, ofreciendo consejos prácticos.',
      valuesTitle: 'Nuestros Valores',
      accessibilityTitle: 'Accesibilidad',
      accessibilityText: 'Todos merecen acceso a orientación de calidad sobre relaciones.',
      empathyTitle: 'Empatía',
      empathyText: 'Abordamos cada situación con comprensión y compasión.',
      actionTitle: 'Acción',
      actionText: 'Cada respuesta incluye pasos concretos que puedes tomar hoy.',
      psychologyTitle: 'Enfoque Basado en Psicología',
      psychologyText: 'Nuestra IA está entrenada en principios establecidos de psicología de relaciones.',
      coverTitle: 'Lo Que Cubrimos',
      coverItem1: 'Relaciones románticas y citas',
      coverItem2: 'Comunicación y resolución de conflictos',
      coverItem3: 'Ansiedad y pensar demasiado',
      coverItem4: 'Autoconfianza y crecimiento personal',
      coverItem5: 'Dinámicas familiares',
      coverItem6: 'Desafíos de amistad',
      disclaimer: 'Aunque nuestra IA proporciona orientación práctica basada en principios de psicología, no es un reemplazo para la terapia profesional.',
    },
    howItWorks: {
      title: 'Cómo Funciona Víncula AI',
      subtitle: 'Comienza en minutos y recibe orientación personalizada sobre relaciones.',
      badge: 'Simple y Efectivo',
      step1Title: 'Crea tu Cuenta',
      step1Text: 'Regístrate en segundos y obtén 25 mensajes gratis por día.',
      step2Title: 'Compra Vínculos',
      step2Text: 'Elige un plan. Cada respuesta usa 1 Vínculo.',
      step3Title: 'Empieza a Chatear',
      step3Text: 'Haz preguntas y recibe orientación personalizada.',
      structuredTitle: 'Cada Respuesta Estructurada para la Acción',
      assessmentTitle: 'Evaluación',
      assessmentText: 'Analizamos tu situación e identificamos las dinámicas centrales.',
      explanationTitle: 'Explicación',
      explanationText: 'Entiende la psicología detrás de lo que está pasando.',
      resolutionTitle: 'Resolución',
      resolutionText: 'Pasos concretos y accionables que puedes implementar inmediatamente.',
      ctaTitle: '¿Listo para Empezar?',
      ctaText: 'Crea tu cuenta gratuita y comienza a recibir orientación personalizada hoy.',
      ctaButton: 'Empezar a Chatear',
    },
    footer: {
      tagline: 'Orientación de relaciones con IA',
      product: 'Producto',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      rights: 'Todos los derechos reservados.',
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
      badge: 'Psychologie par IA',
      users: 'Utilisateurs',
      conversations: 'Conversations',
      rating: 'Note',
    },
    features: {
      title: 'Pourquoi Choisir Víncula AI?',
      subtitle: 'Notre IA est formée aux principes de la psychologie relationnelle pour vous donner des conseils pratiques.',
      personalizedTitle: 'Conseils Personnalisés',
      personalizedDesc: 'Recevez des conseils adaptés à votre situation unique.',
      privateTitle: 'Privé et Sécurisé',
      privateDesc: 'Vos conversations sont cryptées et jamais partagées.',
      instantTitle: 'Réponse Instantanée',
      instantDesc: 'Obtenez de l\'aide quand vous en avez besoin, 24h/24.',
    },
    howSection: {
      title: 'Des conseils relationnels qui',
      subtitle: 'fonctionnent vraiment',
      assessment: 'Évaluation',
      assessmentDesc: 'Nous identifions ce qui se passe dans votre situation',
      explanation: 'Explication',
      explanationDesc: 'Comprenez pourquoi cela se produit du point de vue psychologique',
      resolution: 'Résolution',
      resolutionDesc: 'Des étapes pratiques que vous pouvez suivre aujourd\'hui',
      cta: 'En Savoir Plus',
    },
    cta: {
      badge: 'Commencez votre voyage aujourd\'hui',
      title: 'Prêt à transformer vos relations?',
      subtitle: 'Rejoignez des milliers d\'utilisateurs qui ont amélioré leur communication avec Víncula AI.',
      button: 'Commencer Gratuitement',
    },
    auth: {
      login: 'Connexion',
      signup: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      name: 'Nom Complet',
      forgotPassword: 'Mot de passe oublié?',
      noAccount: 'Pas de compte?',
      hasAccount: 'Déjà un compte?',
      resetPassword: 'Réinitialiser',
      sendResetLink: 'Envoyer le Lien',
      backToLogin: 'Retour à la Connexion',
      newPassword: 'Nouveau Mot de Passe',
      passwordUpdated: 'Mot de passe mis à jour!',
      welcomeBack: 'Bon retour! Entrez vos identifiants.',
      createAccount: 'Créez votre compte pour commencer.',
      passwordsNoMatch: 'Les mots de passe ne correspondent pas',
      passwordTooShort: 'Le mot de passe doit avoir au moins 6 caractères',
    },
    chat: {
      placeholder: 'Tapez votre message... (max 500 caractères)',
      send: 'Envoyer',
      noVinculos: 'Vous n\'avez plus de Vínculos',
      buyVinculos: 'Acheter des Vínculos',
      vinculos: 'Vínculos',
      newConversation: 'Nouveau Chat',
      thinking: 'Réflexion...',
      welcome: 'Bienvenue sur Víncula AI',
      welcomeSubtitle: 'Posez-moi des questions sur les relations ou la croissance personnelle.',
      freeMessagesLeft: 'messages gratuits restants aujourd\'hui',
      noFreeMessages: 'Plus de messages gratuits aujourd\'hui',
      charLimit: 'caractères',
      charLimitAudio: 'Limite audio: 700 caractères',
      recordAudio: 'Enregistrer audio',
      stopRecording: 'Arrêter l\'enregistrement',
    },
    pricing: {
      title: 'Choisissez Votre Plan',
      subtitle: 'Obtenez des Vínculos pour discuter avec notre assistant IA',
      perMonth: 'unique',
      vinculos: 'Vínculos',
      popular: 'Plus Populaire',
      getStarted: 'Commencer',
      currentPlan: 'Actuel',
      badge: 'Tarification Simple',
      faqTitle: 'Questions Fréquentes',
      faq1Title: 'Qu\'est-ce qu\'un Vínculo?',
      faq1Text: 'Un Vínculo est notre unité de crédit. Chaque réponse IA coûte 1 Vínculo.',
      faq2Title: 'Les Vínculos expirent-ils?',
      faq2Text: 'Non, vos Vínculos n\'expirent jamais.',
      faq3Title: 'Quels modes de paiement acceptez-vous?',
      faq3Text: 'Nous acceptons PIX (Brésil), PayPal et Wise pour les paiements internationaux.',
      faq4Title: 'Puis-je obtenir un remboursement?',
      faq4Text: 'Si vous n\'êtes pas satisfait, contactez-nous dans les 7 jours pour un remboursement complet.',
      feature1: '1 Vínculo = 1 réponse IA',
      feature2: 'Sans expiration',
      feature3: 'Historique complet des conversations',
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
      instructions: 'Instructions de Paiement',
      sendExactly: 'Envoyez exactement',
      qrPlaceholder: 'Le code QR sera généré ici',
      continueWith: 'Continuer avec',
      clickAfter: 'Cliquez ci-dessus seulement après avoir effectué le paiement',
      redirecting: 'Redirection vers le chat...',
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
      preferences: 'Préférences',
      buyMore: 'Acheter Plus',
      emailNoChange: 'L\'email ne peut pas être modifié',
      deleteWarning: 'Une fois votre compte supprimé, il n\'y a pas de retour. Soyez certain.',
      deleteConfirmTitle: 'Êtes-vous absolument sûr?',
      deleteConfirmDesc: 'Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte.',
      langNoCurrency: 'La langue ne change pas la devise',
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
      offline: 'Serveur Indisponible',
      offlineDesc: 'Impossible de se connecter au serveur. Vérifiez votre connexion ou réessayez plus tard.',
      tryAgain: 'Réessayer',
    },
    about: {
      title: 'À Propos de Víncula AI',
      subtitle: 'Construire une technologie qui aide les gens à construire de meilleures relations.',
      mission: 'Notre Mission',
      missionText: 'Nous croyons que chacun mérite des conseils relationnels. Víncula AI combine expertise psychologique et technologie IA.',
      team: 'Notre Approche',
      teamText: 'Notre IA est formée aux principes de la psychologie relationnelle.',
      valuesTitle: 'Nos Valeurs',
      accessibilityTitle: 'Accessibilité',
      accessibilityText: 'Tout le monde mérite des conseils de qualité sur les relations.',
      empathyTitle: 'Empathie',
      empathyText: 'Nous abordons chaque situation avec compréhension et compassion.',
      actionTitle: 'Action',
      actionText: 'Chaque réponse inclut des étapes concrètes que vous pouvez prendre aujourd\'hui.',
      psychologyTitle: 'Approche Basée sur la Psychologie',
      psychologyText: 'Notre IA est formée aux principes établis de la psychologie relationnelle.',
      coverTitle: 'Ce Que Nous Couvrons',
      coverItem1: 'Relations romantiques et rencontres',
      coverItem2: 'Communication et résolution de conflits',
      coverItem3: 'Anxiété et rumination',
      coverItem4: 'Confiance en soi et croissance personnelle',
      coverItem5: 'Dynamiques familiales',
      coverItem6: 'Défis d\'amitié',
      disclaimer: 'Bien que notre IA fournisse des conseils pratiques basés sur la psychologie, elle ne remplace pas la thérapie professionnelle.',
    },
    howItWorks: {
      title: 'Comment Fonctionne Víncula AI',
      subtitle: 'Commencez en quelques minutes et recevez des conseils personnalisés.',
      badge: 'Simple et Efficace',
      step1Title: 'Créez Votre Compte',
      step1Text: 'Inscrivez-vous en quelques secondes et obtenez 25 messages gratuits par jour.',
      step2Title: 'Achetez des Vínculos',
      step2Text: 'Choisissez un plan. Chaque réponse utilise 1 Vínculo.',
      step3Title: 'Commencez à Discuter',
      step3Text: 'Posez des questions et recevez des conseils personnalisés.',
      structuredTitle: 'Chaque Réponse Structurée pour l\'Action',
      assessmentTitle: 'Évaluation',
      assessmentText: 'Nous analysons votre situation et identifions les dynamiques centrales.',
      explanationTitle: 'Explication',
      explanationText: 'Comprenez la psychologie derrière ce qui se passe.',
      resolutionTitle: 'Résolution',
      resolutionText: 'Des étapes concrètes et actionnables que vous pouvez implémenter immédiatement.',
      ctaTitle: 'Prêt à Commencer?',
      ctaText: 'Créez votre compte gratuit et commencez à recevoir des conseils personnalisés aujourd\'hui.',
      ctaButton: 'Commencer à Discuter',
    },
    footer: {
      tagline: 'Conseils relationnels par IA',
      product: 'Produit',
      legal: 'Légal',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      rights: 'Tous droits réservés.',
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
      badge: 'Psychologie mit KI',
      users: 'Benutzer',
      conversations: 'Gespräche',
      rating: 'Bewertung',
    },
    features: {
      title: 'Warum Víncula AI Wählen?',
      subtitle: 'Unsere KI ist auf Beziehungspsychologie trainiert, um praktische, umsetzbare Ratschläge zu geben.',
      personalizedTitle: 'Personalisierte Beratung',
      personalizedDesc: 'Erhalten Sie maßgeschneiderte Ratschläge für Ihre einzigartige Situation.',
      privateTitle: 'Privat und Sicher',
      privateDesc: 'Ihre Gespräche sind verschlüsselt und werden niemals geteilt.',
      instantTitle: 'Sofortige Antwort',
      instantDesc: 'Erhalten Sie Hilfe, wenn Sie sie brauchen, 24/7 verfügbar.',
    },
    howSection: {
      title: 'Beziehungsratschläge, die',
      subtitle: 'wirklich funktionieren',
      assessment: 'Einschätzung',
      assessmentDesc: 'Wir identifizieren, was in Ihrer Situation passiert',
      explanation: 'Erklärung',
      explanationDesc: 'Verstehen Sie, warum es aus psychologischer Sicht passiert',
      resolution: 'Lösung',
      resolutionDesc: 'Praktische Schritte, die Sie heute umsetzen können',
      cta: 'Mehr Erfahren',
    },
    cta: {
      badge: 'Starten Sie Ihre Reise heute',
      title: 'Bereit, Ihre Beziehungen zu transformieren?',
      subtitle: 'Schließen Sie sich Tausenden von Benutzern an, die ihre Kommunikation mit Víncula AI verbessert haben.',
      button: 'Kostenlos Starten',
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
      welcomeBack: 'Willkommen zurück! Geben Sie Ihre Anmeldedaten ein.',
      createAccount: 'Erstellen Sie Ihr Konto, um zu beginnen.',
      passwordsNoMatch: 'Passwörter stimmen nicht überein',
      passwordTooShort: 'Passwort muss mindestens 6 Zeichen haben',
    },
    chat: {
      placeholder: 'Nachricht eingeben... (max 500 Zeichen)',
      send: 'Senden',
      noVinculos: 'Keine Vínculos mehr',
      buyVinculos: 'Vínculos Kaufen',
      vinculos: 'Vínculos',
      newConversation: 'Neuer Chat',
      thinking: 'Denkt nach...',
      welcome: 'Willkommen bei Víncula AI',
      welcomeSubtitle: 'Fragen Sie mich zu Beziehungen oder persönlichem Wachstum.',
      freeMessagesLeft: 'kostenlose Nachrichten heute übrig',
      noFreeMessages: 'Keine kostenlosen Nachrichten heute',
      charLimit: 'Zeichen',
      charLimitAudio: 'Audio-Limit: 700 Zeichen',
      recordAudio: 'Audio aufnehmen',
      stopRecording: 'Aufnahme stoppen',
    },
    pricing: {
      title: 'Wählen Sie Ihren Plan',
      subtitle: 'Erhalten Sie Vínculos für Chats mit unserem KI-Assistenten',
      perMonth: 'einmalig',
      vinculos: 'Vínculos',
      popular: 'Beliebteste',
      getStarted: 'Starten',
      currentPlan: 'Aktuell',
      badge: 'Einfache Preise',
      faqTitle: 'Häufig Gestellte Fragen',
      faq1Title: 'Was ist ein Vínculo?',
      faq1Text: 'Ein Vínculo ist unsere Krediteinheit. Jede KI-Antwort kostet 1 Vínculo.',
      faq2Title: 'Laufen Vínculos ab?',
      faq2Text: 'Nein, Ihre Vínculos laufen nie ab.',
      faq3Title: 'Welche Zahlungsmethoden akzeptieren Sie?',
      faq3Text: 'Wir akzeptieren PIX (Brasilien), PayPal und Wise für internationale Zahlungen.',
      faq4Title: 'Kann ich eine Rückerstattung erhalten?',
      faq4Text: 'Wenn Sie nicht zufrieden sind, kontaktieren Sie uns innerhalb von 7 Tagen für eine vollständige Rückerstattung.',
      feature1: '1 Vínculo = 1 KI-Antwort',
      feature2: 'Ohne Ablaufdatum',
      feature3: 'Vollständiger Gesprächsverlauf',
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
      instructions: 'Zahlungsanweisungen',
      sendExactly: 'Senden Sie genau',
      qrPlaceholder: 'QR-Code wird hier generiert',
      continueWith: 'Fortfahren mit',
      clickAfter: 'Klicken Sie oben erst nach Abschluss der Zahlung',
      redirecting: 'Weiterleitung zum Chat...',
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
      preferences: 'Einstellungen',
      buyMore: 'Mehr Kaufen',
      emailNoChange: 'E-Mail kann nicht geändert werden',
      deleteWarning: 'Sobald Sie Ihr Konto löschen, gibt es kein Zurück. Seien Sie sicher.',
      deleteConfirmTitle: 'Sind Sie absolut sicher?',
      deleteConfirmDesc: 'Diese Aktion kann nicht rückgängig gemacht werden. Ihr Konto wird dauerhaft gelöscht.',
      langNoCurrency: 'Sprache ändert nicht die Währung',
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
      offline: 'Server Nicht Verfügbar',
      offlineDesc: 'Verbindung zum Server nicht möglich. Prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.',
      tryAgain: 'Erneut Versuchen',
    },
    about: {
      title: 'Über Víncula AI',
      subtitle: 'Technologie entwickeln, die Menschen hilft, bessere Beziehungen aufzubauen.',
      mission: 'Unsere Mission',
      missionText: 'Wir glauben, dass jeder Zugang zu Beziehungsberatung verdient. Víncula AI kombiniert Psychologie-Expertise mit KI-Technologie.',
      team: 'Unser Ansatz',
      teamText: 'Unsere KI ist auf Beziehungspsychologie trainiert.',
      valuesTitle: 'Unsere Werte',
      accessibilityTitle: 'Zugänglichkeit',
      accessibilityText: 'Jeder verdient Zugang zu qualitativ hochwertiger Beziehungsberatung.',
      empathyTitle: 'Empathie',
      empathyText: 'Wir begegnen jeder Situation mit Verständnis und Mitgefühl.',
      actionTitle: 'Aktion',
      actionText: 'Jede Antwort enthält konkrete Schritte, die Sie heute unternehmen können.',
      psychologyTitle: 'Psychologie-basierter Ansatz',
      psychologyText: 'Unsere KI ist auf etablierten Beziehungspsychologie-Prinzipien trainiert.',
      coverTitle: 'Was Wir Abdecken',
      coverItem1: 'Romantische Beziehungen & Dating',
      coverItem2: 'Kommunikation & Konfliktlösung',
      coverItem3: 'Angst & Grübeln',
      coverItem4: 'Selbstvertrauen & persönliches Wachstum',
      coverItem5: 'Familiendynamik',
      coverItem6: 'Freundschaftsherausforderungen',
      disclaimer: 'Obwohl unsere KI praktische Beratung basierend auf Psychologie bietet, ersetzt sie keine professionelle Therapie.',
    },
    howItWorks: {
      title: 'So Funktioniert Víncula AI',
      subtitle: 'Starten Sie in Minuten und erhalten Sie personalisierte Beziehungsberatung.',
      badge: 'Einfach und Effektiv',
      step1Title: 'Konto Erstellen',
      step1Text: 'Registrieren Sie sich in Sekunden und erhalten Sie 25 kostenlose Nachrichten pro Tag.',
      step2Title: 'Vínculos Kaufen',
      step2Text: 'Wählen Sie einen Plan. Jede Antwort verbraucht 1 Vínculo.',
      step3Title: 'Chatten Starten',
      step3Text: 'Stellen Sie Fragen und erhalten Sie personalisierte Beratung.',
      structuredTitle: 'Jede Antwort für Aktion Strukturiert',
      assessmentTitle: 'Einschätzung',
      assessmentText: 'Wir analysieren Ihre Situation und identifizieren die zentralen Dynamiken.',
      explanationTitle: 'Erklärung',
      explanationText: 'Verstehen Sie die Psychologie hinter dem, was passiert.',
      resolutionTitle: 'Lösung',
      resolutionText: 'Konkrete, umsetzbare Schritte, die Sie sofort implementieren können.',
      ctaTitle: 'Bereit zu Starten?',
      ctaText: 'Erstellen Sie Ihr kostenloses Konto und beginnen Sie noch heute mit personalisierter Beratung.',
      ctaButton: 'Jetzt Chatten',
    },
    footer: {
      tagline: 'KI-gestützte Beziehungsberatung',
      product: 'Produkt',
      legal: 'Rechtliches',
      privacy: 'Datenschutz',
      terms: 'Bedingungen',
      rights: 'Alle Rechte vorbehalten.',
    },
  },
};

export default translations;
