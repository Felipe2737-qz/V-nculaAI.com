import { PageLayout } from '@/components/layout/PageLayout';
import { useApp } from '@/contexts/AppContext';

export default function TermsOfService() {
  const { language } = useApp();
  const isPt = language === 'pt';

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{isPt ? 'Termos de Serviço' : 'Terms of Service'}</h1>
        <p className="text-sm text-muted-foreground mb-8">{isPt ? 'Última atualização: 11 de fevereiro de 2026' : 'Last updated: February 11, 2026'}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '1. Aceitação dos Termos' : '1. Acceptance of Terms'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Ao criar uma conta e utilizar o Víncula AI, você concorda com estes termos de serviço. Se não concordar com qualquer parte destes termos, não utilize nosso serviço.'
              : 'By creating an account and using Víncula AI, you agree to these terms of service. If you do not agree with any part of these terms, do not use our service.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '2. Descrição do Serviço' : '2. Service Description'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'O Víncula AI é um serviço de orientação sobre relacionamentos baseado em inteligência artificial. Fornecemos conselhos baseados em princípios de psicologia, mas NÃO somos substitutos para terapia profissional, aconselhamento médico ou jurídico.'
              : 'Víncula AI is an AI-powered relationship guidance service. We provide advice based on psychology principles but are NOT a substitute for professional therapy, medical advice, or legal counsel.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '3. Sistema de Créditos (Vínculos)' : '3. Credit System (Vínculos)'}</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>{isPt ? 'Cada usuário recebe 25 mensagens gratuitas por dia' : 'Each user receives 25 free messages per day'}</li>
              <li>{isPt ? 'Créditos adicionais (Vínculos) podem ser comprados via PIX ou PayPal' : 'Additional credits (Vínculos) can be purchased via PIX or PayPal'}</li>
              <li>{isPt ? 'Cada resposta da IA consome 1 Vínculo' : 'Each AI response consumes 1 Vínculo'}</li>
              <li>{isPt ? 'Vínculos comprados nunca expiram' : 'Purchased Vínculos never expire'}</li>
              <li>{isPt ? 'Em caso de falha na IA, o Vínculo é reembolsado automaticamente' : 'In case of AI failure, the Vínculo is automatically refunded'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '4. Pagamentos e Reembolsos' : '4. Payments and Refunds'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Os pagamentos são processados através de PIX e PayPal. Todos os pagamentos devem incluir comprovante para verificação. Reembolsos podem ser solicitados em até 7 dias após a compra, desde que menos de 50% dos Vínculos tenham sido utilizados.'
              : 'Payments are processed through PIX and PayPal. All payments must include proof of payment for verification. Refunds can be requested within 7 days of purchase, provided less than 50% of Vínculos have been used.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '5. Uso Aceitável' : '5. Acceptable Use'}</h2>
            <p className="text-muted-foreground">{isPt ? 'Ao utilizar nosso serviço, você concorda em NÃO:' : 'By using our service, you agree NOT to:'}</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>{isPt ? 'Usar o serviço para fins ilegais ou prejudiciais' : 'Use the service for illegal or harmful purposes'}</li>
              <li>{isPt ? 'Tentar contornar os limites do sistema de créditos' : 'Attempt to circumvent credit system limits'}</li>
              <li>{isPt ? 'Enviar comprovantes de pagamento falsos ou fraudulentos' : 'Submit false or fraudulent payment receipts'}</li>
              <li>{isPt ? 'Criar múltiplas contas para obter mensagens gratuitas extras' : 'Create multiple accounts to obtain extra free messages'}</li>
              <li>{isPt ? 'Usar engenharia reversa no serviço ou na API' : 'Reverse engineer the service or API'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '6. Limitação de Responsabilidade' : '6. Limitation of Liability'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'O Víncula AI é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por decisões tomadas com base nos conselhos fornecidos pela IA. Para situações de emergência ou saúde mental grave, procure ajuda profissional imediatamente.'
              : 'Víncula AI is provided "as is" without warranties of any kind. We are not responsible for decisions made based on AI-provided advice. For emergencies or serious mental health situations, seek professional help immediately.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '7. Propriedade Intelectual' : '7. Intellectual Property'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Todo o conteúdo, marca, logo e código do Víncula AI são propriedade de seus criadores. Você mantém a propriedade do conteúdo que envia ao serviço.'
              : 'All content, branding, logo, and code of Víncula AI are the property of its creators. You retain ownership of the content you submit to the service.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '8. Alterações nos Termos' : '8. Changes to Terms'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Reservamos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação. O uso continuado do serviço após as alterações constitui aceitação dos novos termos.'
              : 'We reserve the right to modify these terms at any time. Changes take effect immediately upon publication. Continued use of the service after changes constitutes acceptance of the new terms.'}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">{isPt ? '9. Contato' : '9. Contact'}</h2>
            <p className="text-muted-foreground">{isPt
              ? 'Para dúvidas sobre estes termos, entre em contato pelo e-mail: legal@vincula.ai'
              : 'For questions about these terms, contact us at: legal@vincula.ai'}</p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
