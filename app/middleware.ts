import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      
      script-src 
        'self' 
        'unsafe-inline' 
        'unsafe-eval'
        https://cdn.leadster.com.br
        https://www.googletagmanager.com
        https://www.google-analytics.com
        https://googleads.g.doubleclick.net;
      
      connect-src 
        'self' 
        https://cdn.leadster.com.br
        https://www.google-analytics.com
        https://analytics.google.com
        https://googleads.g.doubleclick.net
        https://www.google.com;
      
      img-src 
        'self' 
        data: 
        https:;
      
      style-src 
        'self' 
        'unsafe-inline' 
        https://fonts.googleapis.com;
      
      font-src 
        'self' 
        https://fonts.gstatic.com;
    `.replace(/\n/g, " ")
  )

  return response
}