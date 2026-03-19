"use client"

import type React from "react"
import Head from "next/head"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MapPin,
  Handshake,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react"
import { submitForm } from "./actions/submit-form"

export default function TocaLandingClient() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentAmenity, setCurrentAmenity] = useState(0)
  const [isSecure, setIsSecure] = useState(false)

  // Inline forms (top + bottom)
  const [heroForm, setHeroForm] = useState({ nome: "", telefone: "", email: "" })
  const [bottomForm, setBottomForm] = useState({ nome: "", telefone: "", email: "" })
  const [heroFormStatus, setHeroFormStatus] = useState({ loading: false, success: false, error: "" })
  const [bottomFormStatus, setBottomFormStatus] = useState({ loading: false, success: false, error: "" })

  const [leadModalOpen, setLeadModalOpen] = useState(false)
  const [leadSource, setLeadSource] = useState<string>("")
  const [leadForm, setLeadForm] = useState({
    nome: "",
    telefone: "",
    email: "",
  })
  const [leadFormStatus, setLeadFormStatus] = useState({
    loading: false,
    success: false,
    error: "",
  })

  const locationSectionRef = useRef<HTMLElement | null>(null)
  const animatedRefs = useRef<Array<HTMLElement | null>>([])
  const heroFormRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSecure(window.location.protocol === "https:")

      console.log("🔒 Status de segurança:", {
        protocol: window.location.protocol,
        isSecure: window.location.protocol === "https:",
        host: window.location.host,
      })
    }
  }, [])

  const gtag_report_conversion = (url?: string) => {
    const callback = () => {
      if (typeof url !== "undefined") {
        window.location.href = url
      }
    }

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-797364149/6Q8qCOjznroBELWfm_wC",
        event_callback: callback,
        transport_type: "beacon",
      })
    } else {
      callback()
    }
    return false
  }

  const openLeadModal = (source: string) => {
    setLeadSource(source)
    setLeadFormStatus({ loading: false, success: false, error: "" })
    setLeadModalOpen(true)
  }

  const submitLead = async (
    source: string,
    values: { nome: string; telefone: string; email: string },
    setStatus: (s: { loading: boolean; success: boolean; error: string }) => void,
    reset: () => void,
  ) => {
    if (!values.nome || !values.telefone || !values.email) {
      setStatus({ loading: false, success: false, error: "Preencha todos os campos" })
      return
    }

    setStatus({ loading: true, success: false, error: "" })

    try {
      const formData = new FormData()
      formData.append("nome", values.nome)
      formData.append("telefone", values.telefone)
      formData.append("email", values.email)

      const result = await submitForm(formData, source)

      if (result.success) {
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", "conversion", {
            send_to: "AW-797364149/form_lead",
            value: 1.0,
            currency: "BRL",
          })
        }

        setStatus({ loading: false, success: true, error: "" })
        reset()
      } else {
        setStatus({ loading: false, success: false, error: result.message })
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: "Erro ao enviar. Tente novamente." })
    }
  }

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead("Formulário Hero", heroForm, setHeroFormStatus, () =>
      setHeroForm({ nome: "", telefone: "", email: "" }),
    )
  }

  const handleBottomFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead("Formulário Final", bottomForm, setBottomFormStatus, () =>
      setBottomForm({ nome: "", telefone: "", email: "" }),
    )
  }

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await submitLead(leadSource || "Cadastro (Modal)", leadForm, setLeadFormStatus, () =>
      setLeadForm({ nome: "", telefone: "", email: "" }),
    )
  }

  useEffect(() => {
    if (!(window as any).gtag) {
      try {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        function gtag(...args: any[]) {
          ;(window as any).dataLayer.push(arguments)
        }
        ;(window as any).gtag = gtag
        gtag("js", new Date())
        gtag("config", "AW-797364149", {
          transport_type: "beacon",
          anonymize_ip: true,
        })
      } catch (error) {
        console.error("Erro ao inicializar Google Tag Manager:", error)
      }
    }
  }, [])

  useEffect(() => {
    document.title =
      "Novo Empreendimento da SPL em Sinop - Apartamentos Estilo Resort com Valorização Expressiva"

    const removeFavicons = () => {
      try {
        const existingFavicons = document.querySelectorAll('link[rel*="icon"]')
        existingFavicons.forEach((favicon) => {
          if (favicon && favicon.parentNode) {
            favicon.parentNode.removeChild(favicon)
          }
        })
      } catch (error) {
        console.log("Erro ao remover favicons existentes:", error)
      }
    }

    const createOptimizedFavicon = () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          console.log("Canvas context não disponível")
          return
        }

        canvas.width = 32
        canvas.height = 32

        const img = new window.Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          try {
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, 32, 32)

            const size = 24
            const x = (32 - size) / 2
            const y = (32 - size) / 2

            ctx.drawImage(img, x, y, size, size)

            const faviconUrl = canvas.toDataURL("image/png")

            removeFavicons()

            const favicon = document.createElement("link")
            favicon.rel = "icon"
            favicon.type = "image/png"
            favicon.href = faviconUrl

            if (document.head) {
              document.head.appendChild(favicon)
            }

            const faviconIco = document.createElement("link")
            faviconIco.rel = "shortcut icon"
            faviconIco.href = faviconUrl

            if (document.head) {
              document.head.appendChild(faviconIco)
            }
          } catch (error) {
            console.log("Erro ao criar favicon:", error)
          }
        }

        img.onerror = () => {
          console.log("Erro ao carregar imagem do favicon")
        }

        img.src = "/images/tozi-logo.png"
      } catch (error) {
        console.log("Erro geral ao criar favicon:", error)
      }
    }

    createOptimizedFavicon()
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const els = animatedRefs.current.filter(Boolean) as HTMLElement[]
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview")
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Eduardo Martins",
      project: "Investiu no ACQUA By SPL",
      image: "/images/eduardo-martins.jpeg",
      text: "Comprei uma unidade no Acqua pensando em investimento, mas fui surpreendido pela valorização em tão pouco tempo. A localização, o conceito de lazer completo e a estrutura do condomínio chamam muito a atenção. Foi um dos melhores investimentos que já fiz. Hoje sei que fiz uma escolha segura e estratégica.",
    },
    {
      name: "Ana e Rodrigo Silva",
      project: "Investiu no Ares Eco Club",
      image: "/images/ana-rodrigo.jpeg",
      text: "O Ares foi amor à primeira vista. Estávamos procurando nosso primeiro apartamento e quando vimos o projeto e as condições de pagamento, decidimos na hora. Parcelamos a entrada em 36x e conseguimos nos organizar com tranquilidade. Estamos acompanhando a construção e cada detalhe nos deixa mais animados. É nosso futuro tomando forma!",
    },
    {
      name: "Juliana Oliveira",
      project: "Investiu no Ares Eco Club",
      image: "/images/juliana-oliveira.png",
      text: "Escolhi o Ares porque queria morar em um lugar moderno, seguro e bem localizado. Como trabalho no centro de Sinop, a localização foi um diferencial. E o padrão de acabamento é excelente. Saber que estou comprando algo que vai valorizar ainda mais quando ficar pronto me dá muita segurança.",
    },
  ]

  const amenities = [
    {
      title: "Segurança",
      description: "Condomínio fechado com portaria 24hrs e biometria",
      image: "/images/building-facade.jpeg",
      alt: "Fachada do edifício - Segurança",
    },
    {
      title: "Lazer e Conforto",
      description:
        "Mais de 30.000 m2 de área de lazer: piscinas climatizadas, rooftop com bar, academia, spa, casa de campo com churrasqueira.",
      image: "/images/sand-court.jpeg",
      alt: "Quadra de areia - Lazer e Conforto",
    },
    {
      title: "Saúde e Bem-estar",
      description: "Vagas para carro elétrico, wi-fi nas áreas comuns, academia entre outros.",
      image: "/images/gym-interior.jpeg",
      alt: "Academia - Saúde e Sustentabilidade",
    },
  ]

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    const amenityInterval = setInterval(() => {
      setCurrentAmenity((prev) => (prev + 1) % amenities.length)
    }, 7000)

    return () => {
      clearInterval(testimonialInterval)
      clearInterval(amenityInterval)
    }
  }, [testimonials.length, amenities.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = document.getElementById("location-video")
            if (iframe) {
              const currentSrc = iframe.getAttribute("src")
              if (currentSrc && !currentSrc.includes("autoplay=1")) {
                iframe.setAttribute(
                  "src",
                  `${currentSrc}&autoplay=1&mute=1&controls=0&loop=1&playlist=fSJ69ot6bsc`,
                )
              }
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (locationSectionRef.current) {
      observer.observe(locationSectionRef.current)
    }

    return () => {
      if (locationSectionRef.current) {
        observer.unobserve(locationSectionRef.current)
      }
    }
  }, [])

  const scrollToForm = () => {
    const el = heroFormRef.current
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    const fallback = document.getElementById("hero-form")
    if (fallback) {
      fallback.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextAmenity = () => {
    setCurrentAmenity((prev) => (prev + 1) % amenities.length)
  }

  const prevAmenity = () => {
    setCurrentAmenity((prev) => (prev - 1 + amenities.length) % amenities.length)
  }

  return (
    <>
      <Head>
        <title>
          Novo Empreendimento da SPL em Sinop - Apartamentos Estilo Resort com Valorização Expressiva
        </title>
        <link rel="icon" href="/images/tozi-logo.png" />
        <link rel="shortcut icon" href="/images/tozi-logo.png" />
        <link rel="apple-touch-icon" href="/images/tozi-logo.png" />
        <meta
          name="description"
          content="Novo lançamento SPL em Sinop! Apartamentos estilo resort 2 e 3 quartos com suíte, mais de 40 itens de lazer e valorização expressiva. Entrada parcelada em até 36x."
        />
      </Head>

      <Dialog open={leadModalOpen} onOpenChange={setLeadModalOpen}>
        <DialogContent className="border border-slate-200 bg-white text-slate-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Cadastro de interesse</DialogTitle>
            <DialogDescription className="text-slate-600">
              Garanta sua unidade. Preencha os dados abaixo e nossa equipe entra em contato.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            {isSecure && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide">
                    Formulário protegido por HTTPS
                  </span>
                  <span className="block text-[11px] text-emerald-100/80">
                    Seus dados são criptografados e tratados com segurança.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleLeadFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">Nome completo</label>
                <Input
                  value={leadForm.nome}
                  onChange={(e) => setLeadForm({ ...leadForm, nome: e.target.value })}
                  placeholder="Seu nome completo"
                  className="h-10 border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/40"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">WhatsApp</label>
                <Input
                  value={leadForm.telefone}
                  onChange={(e) => setLeadForm({ ...leadForm, telefone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="h-10 border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/40"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700">E-mail</label>
                <Input
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  placeholder="seu@email.com"
                  type="email"
                  className="h-10 border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/40"
                  required
                />
              </div>

              {leadFormStatus.error && (
                <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {leadFormStatus.error}
                </div>
              )}

              {leadFormStatus.success && (
                <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Cadastro realizado! Entraremos em contato em breve.
                </div>
              )}

              {leadFormStatus.success && (
                <Button
                  type="button"
                  onClick={() => {
                    gtag_report_conversion()
                    window.open(
                      "https://wa.me/556632114877?text=Olá! Tenho interesse no novo empreendimento da SPL!",
                      "_blank",
                    )
                  }}
                  className="w-full rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition hover:-translate-y-0.5 hover:bg-[#1DB954] active:translate-y-0"
                >
                  Continuar conversa no WhatsApp →
                </Button>
              )}

              <Button
                type="submit"
                disabled={leadFormStatus.loading}
                className="w-full rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0 disabled:opacity-80"
              >
                {leadFormStatus.loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar cadastro →"
                )}
              </Button>

              <p className="text-[11px] leading-snug text-slate-500">
                Seus dados são utilizados apenas para contato sobre o empreendimento.
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-white text-slate-900">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-800/80 bg-emerald-700/95 text-white backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-auto sm:h-10">
                <Image
                  src="/images/LogoGaiaSPL.png"
                  alt="Gaia by SPL"
                  width={140}
                  height={40}
                  className="h-full w-auto"
                />
              </div>
              <span className="hidden text-xs font-medium tracking-wide text-emerald-50 sm:inline-flex">
                Novo lançamento SPL em Sinop
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {isSecure && (
                <div className="hidden items-center gap-1 rounded-full border border-emerald-300/80 bg-emerald-800/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-emerald-50 sm:inline-flex">
                  <Shield className="h-3 w-3" />
                  <span>Conexão segura</span>
                </div>
              )}
              <Button
                variant="secondary"
                className="group inline-flex items-center gap-2 rounded-full border border-white/90 bg-white text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 active:translate-y-0"
                onClick={scrollToForm}
              >
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Quero saber mais sobre
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:bg-emerald-600" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-24 sm:pt-28"
          style={{
            backgroundImage: "url('/images/ImovelArquivo-a5b8ec93-495c-2820-8eb6-3a1adaaef61a-FullHd.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* camadas de overlay para dar contraste mas deixando o prédio visível */}
          <div className="pointer-events-none absolute inset-0 bg-slate-950/55" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.45),_transparent_55%)]" />

          <div className="relative z-10 mx-auto max-w-6xl px-3 py-10 sm:px-6 lg:py-16">
            <div className="grid w-full gap-10 lg:grid-cols-[1.6fr_minmax(0,1fr)] lg:items-center">
              {/* Hero Copy */}
              <div className="space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-900/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-100 animate-in fade-in-50 slide-in-from-left-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Lançamento exclusivo • SPL
                </div>

                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl animate-in fade-in-50 slide-in-from-left-6">
                  <span className="block bg-gradient-to-r from-emerald-300 via-emerald-100 to-white bg-clip-text text-transparent">
                    2 e 3 quartos com
                  </span>
                  <span className="mt-1 block">
                    suíte e + de 40 itens
                    <br />
                    de lazer e conforto!
                  </span>
                </h1>

                <p className="mx-auto max-w-xl text-sm leading-relaxed text-emerald-50/95 sm:text-base lg:text-lg animate-in fade-in-50 slide-in-from-left-8">
                  Planos de pagamento com entrada em até 36x com valorização expressiva e Área de Convivência
                  equivalente a 3 estádios de futebol!
                </p>

                <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-start animate-in fade-in-50 slide-in-from-left-10">
                  <Button
                    onClick={scrollToForm}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold tracking-wide text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0 sm:w-auto"
                  >
                    Quero receber as condições exclusivas
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-900/10 text-[10px] font-bold text-emerald-950">
                      +
                    </span>
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-emerald-50/90">
                    <div className="h-6 w-6 rounded-full bg-emerald-500/30 ring-2 ring-emerald-300/80" />
                    <span>Mais de 30% de valorização até a entrega</span>
                  </div>
                </div>
              </div>

              {/* Hero Form (aberto) */}
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-md border border-emerald-200/40 bg-slate-950/75 shadow-[0_22px_70px_rgba(15,23,42,0.95)] backdrop-blur-xl">
                  <CardContent
                    ref={(el) => {
                      heroFormRef.current = el
                    }}
                    id="hero-form"
                    className="space-y-4 p-5 sm:p-6"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        Cadastro de interesse
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-white">
                        Garanta sua unidade
                      </h3>
                      <p className="text-sm text-emerald-100/85">
                        Seus dados são utilizados apenas para contato sobre o empreendimento.
                      </p>
                    </div>

                    <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">Nome completo</label>
                        <Input
                          value={heroForm.nome}
                          onChange={(e) => setHeroForm({ ...heroForm, nome: e.target.value })}
                          placeholder="Seu nome completo"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">WhatsApp</label>
                        <Input
                          value={heroForm.telefone}
                          onChange={(e) => setHeroForm({ ...heroForm, telefone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">E-mail</label>
                        <Input
                          value={heroForm.email}
                          onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                          placeholder="seu@email.com"
                          type="email"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>

                      {heroFormStatus.error && (
                        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {heroFormStatus.error}
                        </div>
                      )}

                      {heroFormStatus.success && (
                        <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Dados enviados com sucesso! Entraremos em contato.
                        </div>
                      )}

                      {heroFormStatus.success && (
                        <Button
                          type="button"
                          onClick={() => {
                            gtag_report_conversion()
                            window.open(
                              "https://wa.me/556632114877?text=Olá! Tenho interesse no novo empreendimento da SPL!",
                              "_blank",
                            )
                          }}
                          className="w-full rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition hover:-translate-y-0.5 hover:bg-[#1DB954] active:translate-y-0"
                        >
                          Continuar conversa no WhatsApp →
                        </Button>
                      )}

                      <Button
                        type="submit"
                        disabled={heroFormStatus.loading}
                        className="w-full rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0 disabled:opacity-80"
                      >
                        {heroFormStatus.loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar cadastro →"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="border-t border-slate-200/70 bg-white py-16">
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Por que investir na planta?
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card className="border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-slate-900/10">
                <CardContent className="flex h-full flex-col items-center p-7 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                    <Handshake className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-slate-950">Pague Menos Agora!</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Ao investir na planta, você garante um preço mais acessível antes da valorização natural do imóvel
                    durante a construção.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-slate-900/10">
                <CardContent className="flex h-full flex-col items-center p-7 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                    <TrendingUp className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-slate-950">Potencial de Valorização</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Empreendimentos da SPL costumam valorizar mais de 30% até a entrega.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-slate-900/10">
                <CardContent className="flex h-full flex-col items-center p-7 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                    <Clock className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-slate-950">Mais Tempo para se Programar</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Parcelamento flexível da entrada e tempo para financiar com tranquilidade.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0"
                onClick={() => openLeadModal("CTA - Benefícios")}
              >
                Quero Garantir Todos esses Benefícios!
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-slate-200/70 bg-white py-16">
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Depoimentos de quem já comprou SPL!
            </h2>

            {/* Desktop */}
            <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="group h-full border border-slate-200 bg-slate-800 shadow-lg shadow-slate-900/40 transition hover:-translate-y-1 hover:shadow-slate-900/60"
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center">
                      <div className="relative mr-4 h-11 w-11 overflow-hidden rounded-full ring-2 ring-emerald-400/80 ring-offset-2 ring-offset-slate-800">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-xs text-emerald-100/80">{testimonial.project}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-100/85">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile / Tablet Carousel */}
            <div className="mt-10 md:hidden">
              <Card className="border border-slate-200 bg-slate-800 shadow-lg shadow-slate-900/40">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="relative mr-4 h-11 w-11 overflow-hidden rounded-full ring-2 ring-emerald-400/70 ring-offset-2 ring-offset-slate-900/80">
                      <Image
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-xs text-emerald-100/80">
                        {testimonials[currentTestimonial].project}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-100/85">
                    {testimonials[currentTestimonial].text}
                  </p>
                </CardContent>
              </Card>

              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="flex items-center gap-1 rounded-full border-emerald-200/30 bg-slate-900/80 text-xs text-emerald-100 hover:border-emerald-400 hover:bg-slate-900"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-4 rounded-full transition-all ${
                        index === currentTestimonial
                          ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="flex items-center gap-1 rounded-full border-emerald-200/30 bg-slate-900/80 text-xs text-emerald-100 hover:border-emerald-400 hover:bg-slate-900"
                >
                  Próximo
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section
          ref={locationSectionRef as any}
          className="border-t border-slate-200/70 bg-slate-50 py-16"
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="space-y-5">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  Localização privilegiada
                  <br />
                  no coração de Sinop.
                </h2>
                <p className="text-base text-slate-700">
                  A poucos minutos do que realmente importa:
                </p>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                    3 min da Unifasipe
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                    5 min da Catedral
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                    </div>
                    Próximo às principais faculdades, farmácias, supermercados e restaurantes.
                  </li>
                </ul>
                <p className="pt-2 text-sm text-slate-600">
                  Ideal para quem quer viver bem ou investir
                  <br />
                  com inteligência.
                </p>
                <Button
                  className="mt-3 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
                  onClick={() => openLeadModal("CTA - Localização")}
                >
                  Quero morar perto de tudo!
                </Button>
              </div>

              <div>
                <div className="relative h-0 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 pb-[56.25%] shadow-lg shadow-slate-900/10">
                  <iframe
                    id="location-video"
                    className="absolute inset-0 h-full w-full rounded-2xl"
                    src="https://www.youtube.com/embed/fSJ69ot6bsc?si=A1mjO2qRvEXwzF63&rel=0&playsinline=1&loop=1&playlist=fSJ69ot6bsc"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities / Diferenciais */}
        <section className="border-t border-slate-200/70 bg-white py-16">
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Não é só um imóvel. É um clube de lazer e bem-estar.
            </h2>

            {/* Desktop */}
            <div className="mt-10 hidden gap-8 md:grid md:grid-cols-3">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative mb-4 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                    <div className="relative aspect-square">
                      <Image
                        src={amenity.image || "/placeholder.svg"}
                        alt={amenity.alt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{amenity.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{amenity.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile / Tablet Carousel */}
            <div className="mt-10 md:hidden">
              <div className="text-center">
                <div className="relative mx-auto mb-4 w-full max-w-sm overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                  <div className="relative aspect-square">
                    <Image
                      src={amenities[currentAmenity].image || "/placeholder.svg"}
                      alt={amenities[currentAmenity].alt}
                      fill
                      className="object-cover transition duration-700"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  {amenities[currentAmenity].title}
                </h3>
                <p className="mt-2 px-4 text-sm text-slate-600">
                  {amenities[currentAmenity].description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevAmenity}
                  className="flex items-center gap-1 rounded-full border-slate-200 bg-white text-xs text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1.5">
                  {amenities.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 w-4 rounded-full transition-all ${
                        index === currentAmenity
                          ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                          : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextAmenity}
                  className="flex items-center gap-1 rounded-full border-slate-200 bg-white text-xs text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Próximo
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 active:translate-y-0"
                onClick={() => openLeadModal("CTA - Lazer")}
              >
                Quero conhecer todos os diferenciais
              </Button>
            </div>
          </div>
        </section>

        {/* Financing */}
        <section className="border-t border-slate-200/70 bg-white py-16">
          <div className="mx-auto max-w-4xl px-3 text-center sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Condições que cabem no seu bolso.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
              Condições imperdíveis: entrada em até 36x, valorização garantida e uma área
              <br />
              de lazer gigantesca do tamanho de 3 estádios de futebol.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                className="rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                onClick={() => openLeadModal("CTA - Condições")}
              >
                Quero garantir minha unidade →
              </Button>
            </div>
          </div>
        </section>

        {/* Bottom Form Section */}
        <section
          className="relative border-t border-slate-800/80 bg-slate-950 py-16"
          style={{
            backgroundImage: "url('/images/ImovelArquivo-a5b8ec93-495c-2820-8eb6-3a1adaaef61a-FullHd.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* overlays para contraste mantendo o prédio visível */}
          <div className="pointer-events-none absolute inset-0 bg-slate-950/75" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent" />
          <div className="mx-auto max-w-6xl px-3 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
              <div
                ref={(el) => {
                  animatedRefs.current[6] = el
                }}
                className="reveal relative space-y-5 text-center lg:text-left"
              >
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  O melhor momento
                  <br />
                  para garantir sua
                  <br />
                  unidade é agora.
                </h2>
                <p className="text-base text-slate-100/85">
                  Condomínio estilo Resort, em localização nobre e grande potencial de valorização. Seja para morar ou
                  investir, essa é sua chance.
                </p>
              </div>

              <div
                ref={(el) => {
                  animatedRefs.current[7] = el
                }}
                className="reveal relative flex justify-center lg:justify-end"
              >
                <Card className="w-full max-w-md border border-emerald-200/40 bg-slate-950/90 shadow-[0_22px_70px_rgba(15,23,42,0.95)] backdrop-blur-lg">
                  <CardContent className="space-y-5 p-5 sm:p-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        Cadastro de interesse
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-white">Garanta sua unidade</h3>
                      <p className="text-sm text-emerald-100/85">
                        Seus dados são utilizados apenas para contato sobre o empreendimento.
                      </p>
                    </div>

                    <form onSubmit={handleBottomFormSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">Nome completo</label>
                        <Input
                          value={bottomForm.nome}
                          onChange={(e) => setBottomForm({ ...bottomForm, nome: e.target.value })}
                          placeholder="Seu nome completo"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">WhatsApp</label>
                        <Input
                          value={bottomForm.telefone}
                          onChange={(e) => setBottomForm({ ...bottomForm, telefone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-emerald-50/90">E-mail</label>
                        <Input
                          value={bottomForm.email}
                          onChange={(e) => setBottomForm({ ...bottomForm, email: e.target.value })}
                          placeholder="seu@email.com"
                          type="email"
                          className="h-10 border-emerald-200/60 bg-white/90 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-400/60"
                          required
                        />
                      </div>

                      {bottomFormStatus.error && (
                        <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-950/30 px-3 py-2 text-xs text-red-100">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {bottomFormStatus.error}
                        </div>
                      )}

                      {bottomFormStatus.success && (
                        <div className="flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-900/40 px-3 py-2 text-xs text-emerald-50">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Dados enviados com sucesso! Entraremos em contato.
                        </div>
                      )}

                      {bottomFormStatus.success && (
                        <Button
                          type="button"
                          onClick={() => {
                            gtag_report_conversion()
                            window.open(
                              "https://wa.me/556632114877?text=Olá! Tenho interesse no novo empreendimento da SPL!",
                              "_blank",
                            )
                          }}
                          className="w-full rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition hover:-translate-y-0.5 hover:bg-[#1DB954] active:translate-y-0"
                        >
                          Continuar conversa no WhatsApp →
                        </Button>
                      )}

                      <Button
                        type="submit"
                        disabled={bottomFormStatus.loading}
                        className="w-full rounded-full bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 active:translate-y-0 disabled:opacity-80"
                      >
                        {bottomFormStatus.loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar cadastro →"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
