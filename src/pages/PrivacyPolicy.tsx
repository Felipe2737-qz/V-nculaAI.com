import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';

export default function PrivacyPolicy() {
  const { language } = useApp();
  const isPt = language === 'pt';

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{isPt ? 'Política de Privacidade' : 'Privacy Policy'}</h1>
        <p className="text-sm text-muted-foreground mb-8">{isPt ? 'Última atualização: 11 de fevereiro de 2026' : 'Last updated: February 11, 2026'}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '1. Informações que Coletamos' : '1. Information We Collect'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Coletamos informações que você nos fornece diretamente ao criar uma conta, incluindo nome, endereço de e-mail e senha (armazenada de forma criptografada). Também coletamos o conteúdo das suas conversas com a IA para fornecer o serviço.'
              : 'We collect information you provide directly when creating an account, including name, email address, and password (stored encrypted). We also collect the content of your conversations with the AI to provide the service.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '2. Como Usamos suas Informações' : '2. How We Use Your Information'}</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>{isPt ? 'Fornecer, manter e melhorar nossos serviços' : 'Provide, maintain, and improve our services'}</li>
              <li>{isPt ? 'Processar transações e enviar notificações relacionadas' : 'Process transactions and send related notifications'}</li>
              <li>{isPt ? 'Responder a comentários e perguntas' : 'Respond to comments and questions'}</li>
              <li>{isPt ? 'Enviar informações sobre atualizações do serviço' : 'Send information about service updates'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '3. Compartilhamento de Dados' : '3. Data Sharing'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Suas conversas com a IA são processadas pela API do Google Gemini para gerar respostas, e estão sujeitas à política de privacidade do Google.'
              : 'We do not sell, rent, or share your personal information with third parties for marketing purposes. Your conversations with the AI are processed by the Google Gemini API to generate responses and are subject to Google\'s privacy policy.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '4. Cookies e Rastreamento' : '4. Cookies and Tracking'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Utilizamos cookies funcionais e de armazenamento local (localStorage) para manter sua sessão, preferências de idioma/moeda e dados de uso. Não utilizamos cookies de terceiros para publicidade. Você pode gerenciar suas preferências de cookies através do nosso banner de consentimento.'
              : 'We use functional cookies and local storage (localStorage) to maintain your session, language/currency preferences, and usage data. We do not use third-party advertising cookies. You can manage your cookie preferences through our consent banner.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '5. Segurança dos Dados' : '5. Data Security'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Senhas são armazenadas com hash criptográfico e as comunicações são protegidas por HTTPS.'
              : 'We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Passwords are stored with cryptographic hashing and communications are protected by HTTPS.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '6. Seus Direitos' : '6. Your Rights'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Pode excluir sua conta nas configurações da conta. Após a exclusão, todos os seus dados serão removidos permanentemente em até 30 dias.'
              : 'You have the right to access, correct, or delete your personal information at any time. You can delete your account in account settings. After deletion, all your data will be permanently removed within 30 days.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '7. Menores de Idade' : '7. Children'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Nosso serviço não é destinado a menores de 13 anos. Não coletamos intencionalmente informações pessoais de crianças menores de 13 anos.'
              : 'Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '8. Contato' : '8. Contact'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Para dúvidas sobre esta política de privacidade, entre em contato conosco pelo e-mail: privacy@vincula.ai'
              : 'For questions about this privacy policy, contact us at: privacy@vincula.ai'}</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
