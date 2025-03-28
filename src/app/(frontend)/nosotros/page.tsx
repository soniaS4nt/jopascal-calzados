import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Nuestra Historia
          </h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Tradición artesanal chilena en cada par de zapatos que fabricamos.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Fundador de CueroChile"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">Nuestros Inicios</h2>
            <p className="text-stone-600">
              CueroChile nació en 1985 de la pasión de Don Manuel Soto, un maestro artesano con más
              de 40 años de experiencia en el trabajo del cuero. Lo que comenzó como un pequeño
              taller familiar en Santiago, se ha convertido en una empresa reconocida por la calidad
              y el diseño de sus productos.
            </p>
            <p className="text-stone-600">
              Desde nuestros inicios, nos hemos dedicado a preservar las técnicas tradicionales de
              fabricación de calzado, combinándolas con diseños contemporáneos que satisfacen las
              necesidades y gustos de nuestros clientes.
            </p>
            <p className="text-stone-600">
              Hoy, la segunda generación de la familia Soto continúa el legado, manteniendo la
              esencia artesanal pero incorporando innovaciones en diseño y procesos de producción.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-stone-50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Nuestros Valores</h2>
            <p className="mt-2 text-stone-600">Principios que guían nuestro trabajo diario</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Calidad</h3>
                <p className="text-sm text-stone-600">
                  Seleccionamos los mejores cueros y materiales para garantizar productos duraderos
                  y confortables.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Artesanía</h3>
                <p className="text-sm text-stone-600">
                  Cada par de zapatos es elaborado a mano, prestando atención a cada detalle del
                  proceso.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Sostenibilidad</h3>
                <p className="text-sm text-stone-600">
                  Utilizamos prácticas responsables con el medio ambiente y condiciones justas para
                  nuestros artesanos.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Innovación</h3>
                <p className="text-sm text-stone-600">
                  Buscamos constantemente mejorar nuestros diseños y procesos sin perder la esencia
                  artesanal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Nuestro Proceso</h2>
            <p className="mt-2 text-stone-600">
              Cada par de zapatos pasa por un meticuloso proceso artesanal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Selección de Materiales</h3>
                  <p className="text-stone-600 mt-1">
                    Escogemos cuidadosamente los mejores cueros de proveedores locales, asegurando
                    la calidad y sostenibilidad.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Diseño y Patronaje</h3>
                  <p className="text-stone-600 mt-1">
                    Creamos patrones precisos que servirán como guía para el corte del cuero,
                    considerando estilo y ergonomía.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Corte y Preparación</h3>
                  <p className="text-stone-600 mt-1">
                    Cortamos el cuero siguiendo los patrones y preparamos todas las piezas que
                    conformarán el calzado.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Costura y Ensamblaje</h3>
                  <p className="text-stone-600 mt-1">
                    Unimos las piezas mediante costura a mano y máquina, dando forma a la parte
                    superior del calzado.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">5</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Montaje</h3>
                  <p className="text-stone-600 mt-1">
                    Colocamos la parte superior sobre la horma y fijamos la plantilla y la suela,
                    dando forma definitiva al zapato.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">6</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Acabado</h3>
                  <p className="text-stone-600 mt-1">
                    Aplicamos tintes, ceras y acabados que protegen el cuero y realzan su belleza
                    natural.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">7</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Control de Calidad</h3>
                  <p className="text-stone-600 mt-1">
                    Inspeccionamos minuciosamente cada par para asegurar que cumple con nuestros
                    estándares de calidad.
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                  <span className="font-medium">8</span>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Empaque y Envío</h3>
                  <p className="text-stone-600 mt-1">
                    Empacamos cuidadosamente cada par en cajas diseñadas para proteger el producto
                    durante el transporte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Nuestro Equipo</h2>
            <p className="mt-2 text-stone-600">Maestros artesanos con décadas de experiencia</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-stone-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workshop Images */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Nuestro Taller</h2>
            <p className="mt-2 text-stone-600">Donde la magia sucede día a día</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-64 rounded-lg overflow-hidden md:col-span-2 md:row-span-2 md:h-auto">
              <Image
                src="/placeholder.svg?height=800&width=1200"
                alt="Taller principal"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Detalle de fabricación"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Herramientas artesanales"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-stone-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres conocer más sobre nuestro trabajo?</h2>
          <p className="mb-6 text-stone-300 max-w-2xl mx-auto">
            Visita nuestro taller, conoce a nuestros artesanos y descubre cómo se fabrican nuestros
            productos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-amber-600 hover:bg-amber-700" size="lg" asChild>
              <Link href="/contacto">Agendar Visita</Link>
            </Button>
            <Button
              variant="outline"
              className="border-stone-500 text-white hover:bg-stone-700"
              size="lg"
              asChild
            >
              <Link href="/productos">Ver Productos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const team = [
  {
    name: 'Manuel Soto',
    role: 'Fundador y Maestro Artesano',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Carolina Soto',
    role: 'Directora Creativa',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Javier Muñoz',
    role: 'Maestro Zapatero',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Daniela Rojas',
    role: 'Diseñadora',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'Roberto Vega',
    role: 'Artesano Senior',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    name: 'María Pérez',
    role: 'Especialista en Acabados',
    image: '/placeholder.svg?height=400&width=400',
  },
]
