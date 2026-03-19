"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Settings, Shield, BarChart3, Target, Lock } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  accepted: boolean
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isSecure, setIsSecure] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Sempre true - não pode ser desabilitado
    analytics: false,
    marketing: false,
    accepted: false,
  })

  // Verificar se está em HTTPS
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSecure(window.location.protocol === "https:")
    }
  }, [])

  // Verificar se já existe consentimento
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookie-preferences")
    if (savedPreferences) {
      const parsed = JSON.parse(savedPreferences)
      setPreferences(parsed)

      // Aplicar preferências salvas
      if (parsed.analytics && parsed.accepted) {
        enableAnalytics()
      }
    } else {
      // Mostrar banner se não há preferências salvas
      setShowBanner(true)
    }
  }, [])

  // Função para habilitar Google Analytics
  const enableAnalytics = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      })
    }
  }

  // Função para desabilitar Google Analytics
  const disableAnalytics = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      })
    }
  }

  // Salvar preferências com configurações seguras para HTTPS
  const savePreferences = (newPreferences: CookiePreferences) => {
    try {
      // Configurar cookies com flags de segurança para HTTPS
      const cookieString = `cookie-preferences=${JSON.stringify(newPreferences)}; ${
        isSecure ? "Secure; " : ""
      }SameSite=Strict; Max-Age=31536000; Path=/`

      // Salvar no localStorage como backup
      localStorage.setItem("cookie-preferences", JSON.stringify(newPreferences))

      // Definir cookie seguro se estiver em HTTPS
      if (isSecure && typeof document !== "undefined") {
        document.cookie = cookieString
      }

      setPreferences(newPreferences)

      // Aplicar preferências
      if (newPreferences.analytics && newPreferences.accepted) {
        enableAnalytics()
      } else {
        disableAnalytics()
      }

      setShowBanner(false)
      setShowSettings(false)
    } catch (error) {
      console.error("Erro ao salvar preferências de cookies:", error)
    }
  }

  // Aceitar todos os cookies
  const acceptAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      accepted: true,
    }
    savePreferences(newPreferences)
  }

  // Recusar cookies não essenciais
  const rejectAll = () => {
    const newPreferences: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      accepted: true,
    }
    savePreferences(newPreferences)
  }

  // Salvar preferências personalizadas
  const saveCustomPreferences = () => {
    const newPreferences: CookiePreferences = {
      ...preferences,
      accepted: true,
    }
    savePreferences(newPreferences)
  }

  // Atualizar preferência individual
  const updatePreference = (type: keyof CookiePreferences, value: boolean) => {
    if (type === "essential") return // Não pode ser alterado
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Banner Principal */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <Card className="mx-auto max-w-4xl bg-white shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#00D100]" />
                  <h3 className="text-lg font-semibold">Política de Cookies - LGPD</h3>
                  {isSecure && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      <Lock className="w-3 h-3" />
                      Seguro
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                A Tozi Imóveis e Empreendimentos Imobiliários (CRECI J 8583) utiliza cookies para melhorar sua
                experiência, personalizar conteúdo e analisar nosso tráfego.{" "}
                {isSecure && "Todos os dados são transmitidos de forma segura via HTTPS. "}
                Alguns cookies são essenciais para o funcionamento do site, enquanto outros nos ajudam a entender como
                você interage com nosso conteúdo. Você pode escolher quais categorias aceitar.{" "}
                <Link href="/politica-de-cookies" className="text-[#00D100] hover:underline">
                  Saiba mais
                </Link>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={acceptAll} className="bg-[#00D100] hover:bg-[#00CC00] text-white flex-1">
                  Aceitar Todos
                </Button>
                <Button onClick={rejectAll} variant="outline" className="flex-1">
                  Recusar Não Essenciais
                </Button>
                <Button onClick={() => setShowSettings(true)} variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Personalizar
                </Button>
              </div>

              <div className="mt-3 text-xs text-gray-500 text-center">
                <Link href="/politica-de-privacidade" className="hover:underline">
                  Política de Privacidade
                </Link>
                {" | "}
                <Link href="/politica-de-cookies" className="hover:underline">
                  Política de Cookies
                </Link>
                {" | "}
                <span>atendimento@toziimoveis.com.br</span>
                {isSecure && (
                  <>
                    {" | "}
                    <span className="text-green-600">🔒 Conexão Segura</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Configurações */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Configurações de Cookies</h3>
                  {isSecure && (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      <Lock className="w-3 h-3" />
                      HTTPS
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Cookies Essenciais */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">Cookies Essenciais</h4>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Sempre Ativo
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Necessários para o funcionamento básico do site. Incluem navegação, segurança e funcionalidades
                    essenciais. {isSecure && "Transmitidos de forma segura via HTTPS."}
                  </p>
                </div>

                {/* Cookies de Analytics */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">Cookies de Análise</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => updatePreference("analytics", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00D100]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D100]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nos ajudam a entender como os visitantes interagem com o site, coletando informações de forma
                    anônima. Inclui Google Analytics. {isSecure && "Dados protegidos por criptografia HTTPS."}
                  </p>
                </div>

                {/* Cookies de Marketing */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      <h4 className="font-medium">Cookies de Marketing</h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => updatePreference("marketing", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00D100]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D100]"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Utilizados para rastrear visitantes e exibir anúncios relevantes. Inclui Google Ads e pixels de
                    conversão. {isSecure && "Comunicação segura com servidores de publicidade."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500 mb-4">
                  Conforme a Lei Geral de Proteção de Dados (LGPD), você tem o direito de controlar como seus dados são
                  utilizados. {isSecure && "Sua privacidade é protegida por criptografia HTTPS de ponta a ponta. "}
                  Você pode alterar suas preferências a qualquer momento. Para mais informações, entre em contato:
                  atendimento@toziimoveis.com.br ou consulte nossa{" "}
                  <Link href="/politica-de-cookies" className="text-[#00D100] hover:underline">
                    Política de Cookies
                  </Link>
                  .
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={saveCustomPreferences} className="bg-[#00D100] hover:bg-[#00CC00] text-white flex-1">
                    Salvar Preferências
                  </Button>
                  <Button onClick={acceptAll} variant="outline" className="flex-1">
                    Aceitar Todos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
