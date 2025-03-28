import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contacto</h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Estamos aquí para responder tus preguntas. Contáctanos y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Asunto</Label>
                      <Input id="subject" placeholder="Asunto de tu mensaje" />
                    </div>
                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea id="message" placeholder="¿Cómo podemos ayudarte?" rows={5} />
                    </div>
                  </div>
                  <Button className="w-full">Enviar Mensaje</Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 bg-stone-100 rounded-full">
                    <Phone className="h-6 w-6 text-stone-800" />
                  </div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-sm text-stone-600">+56 2 2123 4567</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 bg-stone-100 rounded-full">
                    <Mail className="h-6 w-6 text-stone-800" />
                  </div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-stone-600">contacto@cuerochile.cl</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 bg-stone-100 rounded-full">
                    <MapPin className="h-6 w-6 text-stone-800" />
                  </div>
                  <h3 className="font-medium">Dirección</h3>
                  <p className="text-sm text-stone-600">Av. Artesanos 123, Santiago, Chile</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Mapa de ubicación"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="bg-white/90 px-4 py-2 rounded-md text-sm">
                  Mapa de ubicación (Reemplazar con Google Maps)
                </p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Horarios de Atención</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lunes a Viernes</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo</span>
                    <span>Cerrado</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Visitas al Taller</h4>
                  <p className="text-sm text-stone-600">
                    Si deseas conocer nuestro taller y ver el proceso de fabricación, puedes agendar una visita
                    contactándonos previamente por teléfono o email.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Preguntas Frecuentes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">¿Realizan envíos a todo Chile?</h4>
                    <p className="text-sm text-stone-600">
                      Sí, realizamos envíos a todo Chile y también exportamos a países limítrofes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">¿Cuánto tiempo toma fabricar un pedido personalizado?</h4>
                    <p className="text-sm text-stone-600">
                      Los pedidos personalizados toman entre 2 a 3 semanas, dependiendo de la complejidad del diseño y
                      la cantidad.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">¿Ofrecen garantía por sus productos?</h4>
                    <p className="text-sm text-stone-600">
                      Todos nuestros productos tienen garantía de 6 meses por defectos de fabricación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

