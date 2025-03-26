import React from 'react'

export const metadata = {
  description: 'Calzados hechos a mano 100% cuero, venta de unidades y al por mayor',
  title: 'Jo Pascal Calzados',
}

import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
