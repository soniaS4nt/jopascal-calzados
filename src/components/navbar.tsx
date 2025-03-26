'use client'

import { useState } from 'react'
import Link from 'next/link'
//mport Image from 'next/image'
import { Menu, ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* <Image src="" alt="Logo" width={40} height={40} /> */}
          <span className="text-xl font-bold tracking-tight text-amber-600">Jo Pascal</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Inicio
          </Link>
          <Link
            href="/productos"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Productos
          </Link>
          <Link
            href="/personalizar"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Personalizar
          </Link>
          <Link
            href="/mayorista"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Mayorista
          </Link>
          <Link href="/nosotros" className="text-sm font-medium hover:underline underline-offset-4">
            Nosotros
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:underline underline-offset-4">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/carrito">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Inicio
                </Link>
                <Link
                  href="/productos"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  href="/personalizar"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Personalizar
                </Link>
                <Link
                  href="/mayorista"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Mayorista
                </Link>
                <Link
                  href="/nosotros"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  href="/contacto"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
