import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Novo Empreendimento da SPL em Sinop - Apartamentos Estilo Resort com Valorização Expressiva",
  description:
    "Novo lançamento SPL em Sinop! Apartamentos estilo resort 2 e 3 quartos com suíte, mais de 40 itens de lazer e valorização expressiva. Entrada parcelada em até 36x.",
  openGraph: {
    title: "Novo Empreendimento da SPL em Sinop - Apartamentos Estilo Resort com Valorização Expressiva",
  },
  twitter: {
    title: "Novo Empreendimento da SPL em Sinop - Apartamentos Estilo Resort com Valorização Expressiva",
  },
  icons: {
    icon: "/images/tozi-logo.png",
    shortcut: "/images/tozi-logo.png",
    apple: "/images/tozi-logo.png",
  },
  // Meta tags de segurança HTTPS
  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/tozi-logo.png" />
        <link rel="shortcut icon" href="/images/tozi-logo.png" />
        <link rel="apple-touch-icon" href="/images/tozi-logo.png" />

        {/* Meta tags de segurança HTTPS */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

        {/* Preconnect para melhor performance HTTPS */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Tag (gtag.js) com consentimento e HTTPS */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-797364149"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configurar consentimento padrão (negado)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });
            
            // Configurar para HTTPS apenas
            gtag('config', 'AW-797364149', {
              'transport_type': 'beacon',
              'anonymize_ip': true,
              'allow_google_signals': false
            });
          `}
        </Script>

        {/* Script de verificação HTTPS */}
        <Script id="https-check" strategy="afterInteractive">
          {`
            // Verificar se está em HTTPS e redirecionar se necessário
            if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
              window.location.replace('https://' + window.location.hostname + window.location.pathname + window.location.search);
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
