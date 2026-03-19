import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
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
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        
        {/* Google Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-797364149"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });

            gtag('config', 'AW-797364149', {
              'transport_type': 'beacon',
              'anonymize_ip': true,
              'allow_google_signals': false
            });
          `}
        </Script>

        {/* HTTPS redirect */}
        <Script id="https-check" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
              window.location.replace('https://' + window.location.hostname + window.location.pathname + window.location.search);
            }
          `}
        </Script>

        {/* LEADSTER (CORRETO) */}
        <Script id="leadster" strategy="afterInteractive">
          {`
            (function(a,b,c,d){
              try{
                var e=b.head||b.getElementsByTagName("head")[0];
                var f=b.createElement("script");
                f.setAttribute("src",c);
                f.setAttribute("charset","UTF-8");
                f.defer=true;
                a.neuroleadId=d;
                e.appendChild(f)
              }catch(g){}
            })(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","upSaJi0A6ay6AwljeJ0A4CHWz");
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}