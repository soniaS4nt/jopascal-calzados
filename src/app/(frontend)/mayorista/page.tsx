import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function WholesalePage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pedidos al por Mayor</h1>
            <p className="mt-4 text-stone-600">
              Ofrecemos condiciones especiales para pedidos mayoristas a partir de 6 pares. Completa el formulario y nos
              pondremos en contacto contigo para discutir precios, plazos de entrega y condiciones.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium">Pedido Mínimo</h3>
                <p className="text-sm text-stone-600">Mínimo 6 pares por modelo y diseño</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium">Personalización</h3>
                <p className="text-sm text-stone-600">Posibilidad de personalizar diseños y materiales</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium">Plazos de Entrega</h3>
                <p className="text-sm text-stone-600">Entre 3 y 4 semanas dependiendo del volumen</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="font-medium">4</span>
              </div>
              <div>
                <h3 className="font-medium">Envíos</h3>
                <p className="text-sm text-stone-600">Envíos a todo Chile y exportación a países limítrofes</p>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Taller de producción"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitud de Pedido Mayorista</CardTitle>
            <CardDescription>Completa el formulario y te contactaremos en un plazo máximo de 48 horas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="company-name">Nombre de Empresa o Tienda</Label>
                <Input id="company-name" placeholder="Nombre de tu empresa" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Nombre de Contacto</Label>
                  <Input id="contact-name" placeholder="Nombre completo" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="email@ejemplo.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-phone">Teléfono</Label>
                  <Input id="contact-phone" placeholder="+56 9 1234 5678" />
                </div>
                <div>
                  <Label htmlFor="location">Ciudad/País</Label>
                  <Input id="location" placeholder="Santiago, Chile" />
                </div>
              </div>

              <div>
                <Label htmlFor="product-interest">Productos de Interés</Label>
                <Textarea
                  id="product-interest"
                  placeholder="Describe los modelos que te interesan o si deseas un diseño personalizado"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Cantidad Estimada</Label>
                  <Input id="quantity" type="number" min="6" placeholder="Número de pares" />
                </div>
                <div>
                  <Label htmlFor="timeframe">Plazo Deseado</Label>
                  <Input id="timeframe" placeholder="¿Cuándo necesitas el pedido?" />
                </div>
              </div>

              <div>
                <Label htmlFor="additional-info">Información Adicional</Label>
                <Textarea id="additional-info" placeholder="Cualquier detalle adicional sobre tu pedido" rows={3} />
              </div>
            </div>

            <Button className="w-full">Enviar Solicitud</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

