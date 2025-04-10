import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="./images/cuero.webp"
            alt="Handcrafted leather shoes"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Artesanía en Cuero Chileno
            </h1>
            <p className="text-xl text-white/90 max-w-[600px]">
              Calzado artesanal de cuero hecho a mano con las mejores materias primas de Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/productos">Ver Productos</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm" asChild>
                <Link href="/personalizar">
                  Diseña Tu Propio Calzado
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-stone-800">
              Nuestros Productos Destacados
            </h2>
            <p className="max-w-[700px] text-stone-600">
              Descubre nuestra colección de calzado artesanal hecho a mano con cuero genuino
              chileno.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/productos/${product.id}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium text-lg text-stone-800">{product.name}</h3>
                  <p className="text-stone-600">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild>
              <Link href="/productos">Ver Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="py-16 bg-stone-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Diseña Tu Propio Calzado
              </h2>
              <p className="text-stone-300">
                Sube tu diseño y nuestros artesanos lo convertirán en un calzado único. Pedidos al
                por mayor desde 6 pares.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Elige los colores y materiales</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Sube tu diseño o boceto</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span>Pedidos mínimos de 6 pares</span>
                </li>
              </ul>
              <Button className="bg-amber-600 hover:bg-amber-700" size="lg" asChild>
                <Link href="/personalizar">Comenzar Diseño</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Custom shoe design"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Artisan crafting leather shoes"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-stone-800">
                Tradición Artesanal
              </h2>
              <p className="text-stone-600">
                Nuestros zapatos son elaborados por maestros artesanos chilenos con décadas de
                experiencia, utilizando técnicas tradicionales y los mejores cueros locales.
              </p>
              <p className="text-stone-600">
                Cada par es único, con atención meticulosa a los detalles y acabados que garantizan
                calidad y durabilidad.
              </p>
              <Button variant="outline" className="border-stone-300" asChild>
                <Link href="/nosotros">Conoce Nuestra Historia</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const featuredProducts = [
  {
    id: '1',
    name: 'Botín Artesanal Cuero Café',
    price: '$89.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '2',
    name: 'Zapato Oxford Cuero Natural',
    price: '$79.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '3',
    name: 'Mocasín Cuero Miel',
    price: '$69.990',
    image: '/placeholder.svg?height=400&width=400',
  },
]
