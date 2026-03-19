import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, ArrowLeft, Shield, BarChart3, Target } from "lucide-react"

export const metadata = {
  title: "Política de Cookies - Tozi Imóveis e Empreendimentos Imobiliários",
  description: "Política de Cookies e Tecnologias de Rastreamento - Tozi Imóveis e Empreendimentos Imobiliários",
}

export default function PoliticaCookies() {
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
              <Cookie className="w-8 h-8 text-[#00D100]" />
              <h1 className="text-3xl font-bold text-gray-800">Política de Cookies</h1>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600 mb-6">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString("pt-BR")}
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">1. O que são Cookies?</h2>
                <p className="mb-4">
                  Cookies são pequenos arquivos de texto que são armazenados em seu dispositivo (computador, tablet ou
                  celular) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de
                  forma mais eficiente, bem como para fornecer informações aos proprietários do site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Como Utilizamos Cookies</h2>
                <p className="mb-4">
                  Utilizamos cookies para melhorar sua experiência em nosso site, personalizar conteúdo, analisar nosso
                  tráfego e para fins de marketing. Você pode controlar e/ou excluir cookies conforme desejar através
                  das configurações do seu navegador ou através do nosso banner de cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Tipos de Cookies que Utilizamos</h2>

                <div className="space-y-6">
                  {/* Cookies Essenciais */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold">3.1 Cookies Essenciais</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Sempre Ativos
                      </span>
                    </div>
                    <p className="mb-3">
                      Estes cookies são necessários para o funcionamento básico do site e não podem ser desabilitados.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Sessão:</strong> Mantém você logado durante a navegação
                      </li>
                      <li>
                        <strong>Segurança:</strong> Protege contra ataques e fraudes
                      </li>
                      <li>
                        <strong>Funcionalidade:</strong> Lembra suas preferências básicas
                      </li>
                      <li>
                        <strong>Consentimento:</strong> Armazena suas preferências de cookies
                      </li>
                    </ul>
                  </div>

                  {/* Cookies de Analytics */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold">3.2 Cookies de Análise</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Opcional</span>
                    </div>
                    <p className="mb-3">
                      Estes cookies nos ajudam a entender como os visitantes interagem com nosso site.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Google Analytics:</strong> Analisa o tráfego e comportamento dos usuários
                      </li>
                      <li>
                        <strong>Páginas visitadas:</strong> Quais páginas são mais populares
                      </li>
                      <li>
                        <strong>Tempo de permanência:</strong> Quanto tempo você passa no site
                      </li>
                      <li>
                        <strong>Origem do tráfego:</strong> Como você chegou ao nosso site
                      </li>
                    </ul>
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Cookies utilizados:</strong> _ga, _ga_*, _gid, _gat
                      </p>
                    </div>
                  </div>

                  {/* Cookies de Marketing */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold">3.3 Cookies de Marketing</h3>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                        Opcional
                      </span>
                    </div>
                    <p className="mb-3">
                      Estes cookies são utilizados para rastrear visitantes e exibir anúncios relevantes.
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Google Ads:</strong> Rastreia conversões e otimiza campanhas
                      </li>
                      <li>
                        <strong>Remarketing:</strong> Exibe anúncios personalizados
                      </li>
                      <li>
                        <strong>Pixels de conversão:</strong> Mede eficácia das campanhas
                      </li>
                      <li>
                        <strong>Audiências personalizadas:</strong> Cria segmentos de usuários
                      </li>
                    </ul>
                    <div className="mt-3 p-3 bg-purple-50 rounded">
                      <p className="text-sm text-purple-800">
                        <strong>Cookies utilizados:</strong> _gcl_*, ads/ga-audiences, conversion
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">4. Cookies de Terceiros</h2>
                <p className="mb-4">
                  Alguns cookies em nosso site são definidos por serviços de terceiros. Não temos controle sobre estes
                  cookies, mas você pode desabilitá-los através das configurações do seu navegador ou através dos links
                  abaixo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google Analytics:</strong>
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D100] hover:underline ml-1"
                    >
                      Opt-out do Google Analytics
                    </a>
                  </li>
                  <li>
                    <strong>Google Ads:</strong>
                    <a
                      href="https://adssettings.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D100] hover:underline ml-1"
                    >
                      Configurações de Anúncios do Google
                    </a>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">5. Duração dos Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Cookies de Sessão</h3>
                    <p>São temporários e são excluídos quando você fecha o navegador.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cookies Persistentes</h3>
                    <p>Permanecem no seu dispositivo por um período determinado ou até serem excluídos manualmente:</p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        <strong>Preferências de cookies:</strong> 1 ano
                      </li>
                      <li>
                        <strong>Google Analytics:</strong> 2 anos
                      </li>
                      <li>
                        <strong>Google Ads:</strong> 90 dias
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">6. Como Controlar Cookies</h2>

                <h3 className="text-lg font-medium mb-3">6.1 Através do nosso banner</h3>
                <p className="mb-4">
                  Você pode gerenciar suas preferências de cookies através do banner que aparece na sua primeira visita
                  ao site. Para alterar suas preferências posteriormente, limpe os cookies do seu navegador e visite o
                  site novamente.
                </p>

                <h3 className="text-lg font-medium mb-3">6.2 Através do navegador</h3>
                <p className="mb-4">
                  A maioria dos navegadores permite que você controle cookies através das configurações. Você pode
                  configurar seu navegador para:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Bloquear todos os cookies</li>
                  <li>Permitir apenas cookies de primeira parte</li>
                  <li>Excluir cookies quando fechar o navegador</li>
                  <li>Notificá-lo quando um cookie for definido</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>Atenção:</strong> Desabilitar cookies pode afetar a funcionalidade do site e sua experiência
                    de navegação.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">7. Atualizações desta Política</h2>
                <p>
                  Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossos serviços
                  ou na legislação aplicável. Recomendamos que você consulte esta página regularmente para se manter
                  informado sobre como utilizamos cookies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">8. Como Entrar em Contato Conosco</h2>
                <p className="mb-4">
                  Para esclarecer quaisquer dúvidas sobre esta Política de Cookies ou sobre nossa utilização de cookies,
                  entre em contato conosco por algum dos canais mencionados abaixo:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">Tozi Imóveis e Empreendimentos Imobiliários Ltda</h4>
                  <p className="text-sm text-gray-600 mb-4">CRECI J 8583 | CNPJ: 24.498.622/0001-50</p>
                  <div className="space-y-2">
                    <p>
                      <strong>E-mail:</strong> atendimento@toziimoveis.com.br
                    </p>
                    <p>
                      <strong>Telefone:</strong> (66) 3211-4877
                    </p>
                    <div>
                      <p>
                        <strong>Endereço postal:</strong>
                      </p>
                      <p>Av. das Figueiras, n° 1646, Sala 01</p>
                      <p>Edifício Tozi, Bairro Setor Comercial</p>
                      <p>Sinop/MT, CEP 78.550-150</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button className="bg-[#00D100] hover:bg-[#00CC00] text-white">Voltar ao Site</Button>
                </Link>
                <Link href="/politica-de-privacidade">
                  <Button variant="outline">Ver Política de Privacidade</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
