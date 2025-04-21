'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Minus, Plus, Trash2, Download } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'

// Tipos para los formularios
type ShippingFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  postalCode: string
  notes?: string
}

type PaymentFormData = {
  paymentMethod: string
  paymentProof?: FileList
}

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
  const [orderNumber, setOrderNumber] = useState(
    'ORD-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
  )
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Referencias para los formularios
  const shippingFormRef = useRef(null)
  const paymentFormRef = useRef(null)

  // React Hook Form para el formulario de envío
  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: shippingErrors },
  } = useForm<ShippingFormData>()

  // React Hook Form para el formulario de pago
  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    formState: { errors: paymentErrors },
  } = useForm<PaymentFormData>({
    defaultValues: {
      paymentMethod: 'transfer',
    },
  })

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    )
  }

  interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    size: string
    image: string
  }

  const removeItem = (id: number): void => {
    setCartItems(cartItems.filter((item: CartItem) => item.id !== id))
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

  // Manejar envío del formulario de envío
  const onShippingSubmit = (data: ShippingFormData) => {
    setIsSubmitting(true)

    // Simular procesamiento
    setTimeout(() => {
      setShippingData(data)
      setActiveStep('payment')
      setIsSubmitting(false)
      toast({
        title: 'Información de envío guardada',
        description: 'Tus datos de envío han sido guardados correctamente.',
      })
    }, 1000)
  }

  // Manejar envío del formulario de pago
  const onPaymentSubmit = (data: PaymentFormData) => {
    setIsSubmitting(true)

    // Simular procesamiento
    setTimeout(() => {
      setActiveStep('confirmation')
      setIsSubmitting(false)
      toast({
        title: 'Pedido confirmado',
        description: 'Tu pedido ha sido recibido correctamente.',
      })
    }, 1000)
  }

  // Generar y descargar el comprobante en PDF
  const downloadReceipt = () => {
    const doc = new jsPDF()

    // Añadir título
    doc.setFontSize(20)
    doc.text('Comprobante de Pedido', 105, 20, { align: 'center' })

    // Añadir información del pedido
    doc.setFontSize(12)
    doc.text(`Número de Pedido: ${orderNumber}`, 20, 40)
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 50)

    // Añadir información del cliente
    if (shippingData) {
      doc.text('Información del Cliente:', 20, 70)
      doc.text(`Nombre: ${shippingData.firstName} ${shippingData.lastName}`, 20, 80)
      doc.text(`Email: ${shippingData.email}`, 20, 90)
      doc.text(`Teléfono: ${shippingData.phone}`, 20, 100)
      doc.text(`Dirección: ${shippingData.address}`, 20, 110)
      doc.text(`Ciudad: ${shippingData.city}, ${shippingData.region}`, 20, 120)
    }

    // Añadir tabla de productos
    const tableColumn = ['Producto', 'Cantidad', 'Precio', 'Total']
    const tableRows = cartItems.map((item) => [
      item.name,
      item.quantity.toString(),
      formatPrice(item.price),
      formatPrice(item.price * item.quantity),
    ])

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 140,
    })

    // Añadir resumen de costos
    const finalY = (doc as any).lastAutoTable.finalY || 140
    doc.text(`Subtotal: ${formatPrice(subtotal)}`, 150, finalY + 20, { align: 'right' })
    doc.text(`Envío: ${formatPrice(shipping)}`, 150, finalY + 30, { align: 'right' })
    doc.text(`Total: ${formatPrice(total)}`, 150, finalY + 40, { align: 'right' })

    // Añadir instrucciones de pago
    doc.text('Instrucciones de Pago:', 20, finalY + 60)
    doc.text('1. Realiza la transferencia por el monto total indicado.', 20, finalY + 70)
    doc.text(
      '2. Envía el comprobante a pagos@cuerochile.cl indicando tu número de pedido.',
      20,
      finalY + 80,
    )
    doc.text('3. Recibirás un email confirmando la recepción de tu pago.', 20, finalY + 90)

    // Añadir pie de página
    doc.text('Gracias por tu compra en CueroChile', 105, finalY + 110, { align: 'center' })

    // Guardar el PDF
    doc.save(`comprobante-${orderNumber}.pdf`)
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter mb-8">Tu Carrito</h1>

        <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cart">Carrito</TabsTrigger>
            <TabsTrigger value="shipping" disabled={cartItems.length === 0}>
              Envío
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={!shippingData}>
              Pago
            </TabsTrigger>
            <TabsTrigger value="confirmation" disabled={activeStep !== 'confirmation'}>
              Confirmación
            </TabsTrigger>
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
                    <form
                      id="shipping-form"
                      ref={shippingFormRef}
                      onSubmit={handleSubmitShipping(onShippingSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            Nombre <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="Tu nombre"
                            {...registerShipping('firstName', {
                              required: 'El nombre es obligatorio',
                            })}
                            className={shippingErrors.firstName ? 'border-red-500' : ''}
                          />
                          {shippingErrors.firstName && (
                            <p className="text-red-500 text-sm">
                              {shippingErrors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Apellido <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Tu apellido"
                            {...registerShipping('lastName', {
                              required: 'El apellido es obligatorio',
                            })}
                            className={shippingErrors.lastName ? 'border-red-500' : ''}
                          />
                          {shippingErrors.lastName && (
                            <p className="text-red-500 text-sm">
                              {shippingErrors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          {...registerShipping('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Email inválido',
                            },
                          })}
                          className={shippingErrors.email ? 'border-red-500' : ''}
                        />
                        {shippingErrors.email && (
                          <p className="text-red-500 text-sm">{shippingErrors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Teléfono <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+56 9 1234 5678"
                          {...registerShipping('phone', {
                            required: 'El teléfono es obligatorio',
                            pattern: {
                              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                              message: 'Teléfono inválido',
                            },
                          })}
                          className={shippingErrors.phone ? 'border-red-500' : ''}
                        />
                        {shippingErrors.phone && (
                          <p className="text-red-500 text-sm">{shippingErrors.phone.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Dirección <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="address"
                          placeholder="Calle, número, depto."
                          {...registerShipping('address', {
                            required: 'La dirección es obligatoria',
                          })}
                          className={shippingErrors.address ? 'border-red-500' : ''}
                        />
                        {shippingErrors.address && (
                          <p className="text-red-500 text-sm">{shippingErrors.address.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            Ciudad <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            placeholder="Ciudad"
                            {...registerShipping('city', {
                              required: 'La ciudad es obligatoria',
                            })}
                            className={shippingErrors.city ? 'border-red-500' : ''}
                          />
                          {shippingErrors.city && (
                            <p className="text-red-500 text-sm">{shippingErrors.city.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="region">
                            Región <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="region"
                            placeholder="Región"
                            {...registerShipping('region', {
                              required: 'La región es obligatoria',
                            })}
                            className={shippingErrors.region ? 'border-red-500' : ''}
                          />
                          {shippingErrors.region && (
                            <p className="text-red-500 text-sm">{shippingErrors.region.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">
                            Código Postal <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="postalCode"
                            placeholder="Código postal"
                            {...registerShipping('postalCode', {
                              required: 'El código postal es obligatorio',
                            })}
                            className={shippingErrors.postalCode ? 'border-red-500' : ''}
                          />
                          {shippingErrors.postalCode && (
                            <p className="text-red-500 text-sm">
                              {shippingErrors.postalCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notas de Entrega (opcional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Instrucciones especiales para la entrega"
                          rows={3}
                          {...registerShipping('notes')}
                        />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('cart')}>
                      Volver al Carrito
                    </Button>
                    <Button type="submit" form="shipping-form" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : 'Continuar al Pago'}
                      {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
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
                    <form
                      id="payment-form"
                      ref={paymentFormRef}
                      onSubmit={handleSubmitPayment(onPaymentSubmit)}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <RadioGroup
                          defaultValue="transfer"
                          className="space-y-4"
                          {...registerPayment('paymentMethod', { required: true })}
                        >
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
                              <li>
                                En el asunto o comentario incluye tu nombre y número de pedido
                              </li>
                              <li>
                                Envía el comprobante de transferencia a pagos@cuerochile.cl o súbelo
                                en el siguiente paso
                              </li>
                            </ol>
                          </div>

                          <div className="pt-4 border-t space-y-2">
                            <Label htmlFor="payment-proof" className="block">
                              Comprobante de Pago (opcional)
                            </Label>
                            <Input
                              id="payment-proof"
                              type="file"
                              accept="image/*,.pdf"
                              {...registerPayment('paymentProof')}
                            />
                            <p className="text-xs text-stone-500">
                              Puedes subir el comprobante ahora o enviarlo por email después de
                              completar tu pedido.
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('shipping')}>
                      Volver al Envío
                    </Button>
                    <Button type="submit" form="payment-form" disabled={isSubmitting}>
                      {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                      {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
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
                    <p className="font-medium">Número de Pedido: {orderNumber}</p>
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
                        {shippingData ? (
                          <>
                            <p className="text-sm">
                              {shippingData.firstName} {shippingData.lastName}
                            </p>
                            <p className="text-sm">{shippingData.email}</p>
                            <p className="text-sm">{shippingData.phone}</p>

                            <h4 className="font-medium text-sm text-stone-600 mt-4 mb-2">
                              Dirección de Envío
                            </h4>
                            <p className="text-sm">{shippingData.address}</p>
                            <p className="text-sm">
                              {shippingData.city}, {shippingData.region}
                            </p>
                            <p className="text-sm">{shippingData.postalCode}</p>
                          </>
                        ) : (
                          <p className="text-sm text-stone-500">Información no disponible</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button asChild>
                      <Link href="/">Volver al Inicio</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={downloadReceipt}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Descargar Comprobante
                    </Button>
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
