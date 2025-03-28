'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Minus, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Botín Artesanal Cuero Café',
      price: 89990,
      quantity: 1,
      size: '42',
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'Zapato Oxford Cuero Natural',
      price: 79990,
      quantity: 1,
      size: '41',
      image: '/placeholder.svg?height=200&width=200',
    },
  ])

  const [activeStep, setActiveStep] = useState('cart')

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5990 : 0
  const total = subtotal + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Tu Carrito</h1>

        <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cart">Carrito</TabsTrigger>
            <TabsTrigger value="shipping">Envío</TabsTrigger>
            <TabsTrigger value="payment">Pago</TabsTrigger>
            <TabsTrigger value="confirmation">Confirmación</TabsTrigger>
          </TabsList>

          {/* Cart Step */}
          <TabsContent value="cart" className="mt-6">
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Productos en tu Carrito</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || '/placeholder.svg'}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 flex flex-col sm:flex-row justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-stone-600">Talla: {item.size}</p>
                              <p className="font-medium">{formatPrice(item.price)}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                  <span className="sr-only">Disminuir cantidad</span>
                                </Button>
                                <div className="h-8 px-3 flex items-center justify-center border-y">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                  <span className="sr-only">Aumentar cantidad</span>
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-stone-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href="/productos">Seguir Comprando</Link>
                      </Button>
                      <Button onClick={() => setActiveStep('shipping')}>
                        Continuar al Envío
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumen del Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío</span>
                        <span>{formatPrice(shipping)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium mb-4">Tu carrito está vacío</h2>
                <p className="text-stone-600 mb-8">
                  Parece que aún no has añadido productos a tu carrito.
                </p>
                <Button asChild>
                  <Link href="/productos">Ver Productos</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Shipping Step */}
          <TabsContent value="shipping" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Envío</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first-name">Nombre</Label>
                          <Input id="first-name" placeholder="Tu nombre" />
                        </div>
                        <div>
                          <Label htmlFor="last-name">Apellido</Label>
                          <Input id="last-name" placeholder="Tu apellido" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" placeholder="+56 9 1234 5678" />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" placeholder="Calle, número, depto." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" placeholder="Ciudad" />
                        </div>
                        <div>
                          <Label htmlFor="region">Región</Label>
                          <Input id="region" placeholder="Región" />
                        </div>
                        <div>
                          <Label htmlFor="postal-code">Código Postal</Label>
                          <Input id="postal-code" placeholder="Código postal" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notas de Entrega (opcional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Instrucciones especiales para la entrega"
                          rows={3}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('cart')}>
                      Volver al Carrito
                    </Button>
                    <Button onClick={() => setActiveStep('payment')}>
                      Continuar al Pago
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Payment Step */}
          <TabsContent value="payment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <RadioGroup defaultValue="transfer" className="space-y-4">
                        <div className="flex items-start space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="transfer" id="transfer" className="mt-1" />
                          <div className="grid gap-1.5">
                            <Label htmlFor="transfer" className="font-medium">
                              Transferencia Bancaria
                            </Label>
                            <p className="text-sm text-stone-600">
                              Realiza una transferencia a nuestra cuenta bancaria. Tu pedido será
                              procesado una vez que confirmemos el pago.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>

                      <div className="border p-4 rounded-md space-y-4">
                        <h3 className="font-medium">Datos para la Transferencia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-stone-600">Nombre:</p>
                            <p className="font-medium">CueroChile SpA</p>
                          </div>
                          <div>
                            <p className="text-stone-600">RUT:</p>
                            <p className="font-medium">76.123.456-7</p>
                          </div>
                          <div>
                            <p className="text-stone-600">Banco:</p>
                            <p className="font-medium">Banco de Chile</p>
                          </div>
                          <div>
                            <p className="text-stone-600">Tipo de Cuenta:</p>
                            <p className="font-medium">Cuenta Corriente</p>
                          </div>
                          <div>
                            <p className="text-stone-600">N° de Cuenta:</p>
                            <p className="font-medium">00-123-45678-90</p>
                          </div>
                          <div>
                            <p className="text-stone-600">Email:</p>
                            <p className="font-medium">pagos@cuerochile.cl</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Instrucciones:</h4>
                          <ol className="list-decimal list-inside text-sm space-y-1 text-stone-600">
                            <li>
                              Realiza la transferencia por el monto total: {formatPrice(total)}
                            </li>
                            <li>En el asunto o comentario incluye tu nombre y número de pedido</li>
                            <li>
                              Envía el comprobante de transferencia a pagos@cuerochile.cl o súbelo
                              en el siguiente paso
                            </li>
                          </ol>
                        </div>

                        <div className="pt-4 border-t">
                          <Label htmlFor="payment-proof" className="block mb-2">
                            Comprobante de Pago (opcional)
                          </Label>
                          <Input id="payment-proof" type="file" />
                          <p className="text-xs text-stone-500 mt-1">
                            Puedes subir el comprobante ahora o enviarlo por email después de
                            completar tu pedido.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('shipping')}>
                      Volver al Envío
                    </Button>
                    <Button onClick={() => setActiveStep('confirmation')}>
                      Confirmar Pedido
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Confirmation Step */}
          <TabsContent value="confirmation" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4 py-6">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">¡Gracias por tu Pedido!</h2>
                  <p className="text-stone-600 max-w-md mx-auto">
                    Tu pedido ha sido recibido y será procesado una vez que confirmemos tu pago por
                    transferencia bancaria.
                  </p>
                  <div className="bg-stone-50 p-4 rounded-md inline-block mx-auto">
                    <p className="font-medium">Número de Pedido: #ORD-2023-1234</p>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto mt-8 space-y-8">
                  <div className="border rounded-md p-6 space-y-4">
                    <h3 className="font-medium text-lg">Próximos Pasos</h3>
                    <ol className="space-y-4">
                      <li className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                          <span className="font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Realiza la Transferencia</h4>
                          <p className="text-sm text-stone-600">
                            Transfiere el monto total de {formatPrice(total)} a nuestra cuenta
                            bancaria usando los datos proporcionados.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                          <span className="font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Envía el Comprobante</h4>
                          <p className="text-sm text-stone-600">
                            Envía el comprobante de transferencia a pagos@cuerochile.cl indicando tu
                            número de pedido.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                          <span className="font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Confirmación de Pago</h4>
                          <p className="text-sm text-stone-600">
                            Te enviaremos un email confirmando la recepción de tu pago y el inicio
                            del proceso de fabricación.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                          <span className="font-medium">4</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Envío</h4>
                          <p className="text-sm text-stone-600">
                            Una vez que tu pedido esté listo, lo enviaremos a la dirección
                            proporcionada y recibirás un email con el número de seguimiento.
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="border rounded-md p-6">
                    <h3 className="font-medium text-lg mb-4">Resumen del Pedido</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-sm text-stone-600 mb-2">Productos</h4>
                        <div className="space-y-2">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <hr className="my-2" />
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Envío</span>
                            <span>{formatPrice(shipping)}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-stone-600 mb-2">
                          Información de Contacto
                        </h4>
                        <p className="text-sm">Juan Pérez</p>
                        <p className="text-sm">juan.perez@email.com</p>
                        <p className="text-sm">+56 9 8765 4321</p>

                        <h4 className="font-medium text-sm text-stone-600 mt-4 mb-2">
                          Dirección de Envío
                        </h4>
                        <p className="text-sm">Av. Providencia 1234, Depto 56</p>
                        <p className="text-sm">Providencia, Santiago</p>
                        <p className="text-sm">Región Metropolitana, Chile</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <Link href="/">Volver al Inicio</Link>
                    </Button>
                    <Button variant="outline">Descargar Comprobante</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
