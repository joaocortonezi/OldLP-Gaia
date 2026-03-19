import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Mail, Phone, MapPin, ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Política de Privacidade - Tozi Imóveis",
  description: "Política de Privacidade e Proteção de Dados conforme LGPD - Tozi Imóveis",
}

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#00D100] text-white px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Image src="/images/logo-white.png" alt="Logo Tozi" width={120} height={40} className="h-10 w-auto" />
            <Link href="/">
              <Button variant="secondary" className="bg-white text-[#00D100] hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-[#00D100]" />
              <h1 className="text-3xl font-bold text-gray-800">Política de Privacidade</h1>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-6">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString("pt-BR")}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Informações Gerais</h2>
                <p className="mb-4">
                  A Tozi Imóveis e Empreendimentos Imobiliários Ltda, inscrita no CNPJ sob o nº 24.498.622/0001-50,
                  CRECI J 8583, com sede na Av. das Figueiras, n° 1646, Sala 01, Edifício Tozi, Bairro Setor Comercial,
                  Sinop/MT, CEP 78.550-150, está comprometida com a proteção da privacidade e dos dados pessoais de seus
                  usuários, clientes e interessados, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº
                  13.709/2018).
                </p>
                <p>
                  Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas
                  informações pessoais quando você utiliza nosso site, preenche formulários ou interage conosco.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Dados Coletados</h2>
                <h3 className="text-lg font-medium mb-3">2.1 Dados fornecidos voluntariamente:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone</li>
                  <li>Outras informações fornecidas em formulários de contato</li>
                </ul>

                <h3 className="text-lg font-medium mb-3">2.2 Dados coletados automaticamente:</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Endereço IP</li>
                  <li>Informações do navegador e dispositivo</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Dados de navegação através de cookies</li>
                  <li>Origem do tráfego (como chegou ao nosso site)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Finalidades do Tratamento</h2>
                <p className="mb-4">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Atendimento e contato:</strong> Responder suas dúvidas e fornecer informações sobre nossos
                    empreendimentos
                  </li>
                  <li>
                    <strong>Marketing:</strong> Enviar informações sobre lançamentos, promoções e novidades
                  </li>
                  <li>
                    <strong>Análise e melhoria:</strong> Analisar o comportamento dos usuários para melhorar nossos
                    serviços
                  </li>
                  <li>
                    <strong>Cumprimento legal:</strong> Atender obrigações legais e regulamentares
                  </li>
                  <li>
                    <strong>Segurança:</strong> Proteger nossos sistemas e prevenir fraudes
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Base Legal</h2>
                <p className="mb-4">O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Consentimento:</strong> Para envio de comunicações de marketing
                  </li>
                  <li>
                    <strong>Legítimo interesse:</strong> Para análise de dados e melhoria dos serviços
                  </li>
                  <li>
                    <strong>Execução de contrato:</strong> Para atendimento e prestação de serviços
                  </li>
                  <li>
                    <strong>Cumprimento de obrigação legal:</strong> Para atender exigências legais
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Compartilhamento de Dados</h2>
                <p className="mb-4">Seus dados pessoais podem ser compartilhados com:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Prestadores de serviços:</strong> Empresas que nos auxiliam na prestação de serviços
                    (hospedagem, e-mail marketing, análise de dados)
                  </li>
                  <li>
                    <strong>Parceiros comerciais:</strong> Quando necessário para a prestação do serviço solicitado
                  </li>
                  <li>
                    <strong>Autoridades competentes:</strong> Quando exigido por lei ou ordem judicial
                  </li>
                </ul>
                <p>
                  <strong>Importante:</strong> Não vendemos, alugamos ou comercializamos seus dados pessoais com
                  terceiros para fins comerciais.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Cookies e Tecnologias Similares</h2>
                <p className="mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Para
                  informações detalhadas, consulte nossa{" "}
                  <Link href="/politica-de-cookies" className="text-[#00D100] hover:underline">
                    Política de Cookies
                  </Link>
                  .
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Retenção de Dados</h2>
                <p className="mb-4">
                  Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta
                  política, respeitando os prazos legais aplicáveis:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Dados de contato:</strong> Até que você solicite a exclusão ou retire o consentimento
                  </li>
                  <li>
                    <strong>Dados de navegação:</strong> Por até 2 anos
                  </li>
                  <li>
                    <strong>Dados contratuais:</strong> Conforme exigências legais (geralmente 5 anos)
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Seus Direitos</h2>
                <p className="mb-4">Conforme a LGPD, você tem os seguintes direitos:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>
                    <strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los
                  </li>
                  <li>
                    <strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados
                  </li>
                  <li>
                    <strong>Anonimização ou exclusão:</strong> Solicitar a anonimização ou exclusão de dados
                    desnecessários
                  </li>
                  <li>
                    <strong>Portabilidade:</strong> Solicitar a portabilidade dos dados a outro fornecedor
                  </li>
                  <li>
                    <strong>Informação:</strong> Obter informações sobre compartilhamento de dados
                  </li>
                  <li>
                    <strong>Revogação do consentimento:</strong> Retirar o consentimento a qualquer momento
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">9. Segurança</h2>
                <p className="mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Acesso não autorizado</li>
                  <li>Alteração, divulgação ou destruição não autorizada</li>
                  <li>Perda acidental</li>
                </ul>
                <p>
                  Utilizamos criptografia, controles de acesso e monitoramento contínuo para garantir a segurança de
                  suas informações.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">10. Alterações nesta Política</h2>
                <p>
                  Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você a consulte
                  regularmente. Alterações significativas serão comunicadas através de nosso site ou por e-mail.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">11. Como Entrar em Contato Conosco</h2>
                <p className="mb-4">
                  Para esclarecer quaisquer dúvidas sobre esta Política de Privacidade ou sobre os dados pessoais que
                  tratamos, entre em contato conosco por algum dos canais mencionados abaixo:
                </p>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">
                    Tozi Imóveis e Empreendimentos Imobiliários Ltda - Controlador de Dados
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">CRECI J 8583 | CNPJ: 24.498.622/0001-50</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#00D100] mt-0.5 flex-shrink-0" />
                      <span>atendimento@toziimoveis.com.br</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#00D100]" />
                      <span>(66) 3211-4877</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#00D100] mt-0.5 flex-shrink-0" />
                      <div>
                        <p>Av. das Figueiras, n° 1646, Sala 01</p>
                        <p>Edifício Tozi, Bairro Setor Comercial</p>
                        <p>Sinop/MT, CEP 78.550-150</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  12. Autoridade Nacional de Proteção de Dados (ANPD)
                </h2>
                <p>
                  Caso não fique satisfeito com nossas respostas, você pode contatar a Autoridade Nacional de Proteção
                  de Dados (ANPD) através do site:
                  <a
                    href="https://www.gov.br/anpd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D100] hover:underline ml-1"
                  >
                    www.gov.br/anpd
                  </a>
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button className="bg-[#00D100] hover:bg-[#00CC00] text-white">Voltar ao Site</Button>
                </Link>
                <Link href="/politica-de-cookies">
                  <Button variant="outline">Ver Política de Cookies</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
