"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomDesignPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Diseña Tu Propio Calzado</h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Sube tu diseño y nuestros artesanos lo convertirán en un calzado único. Pedidos al por mayor desde 6 pares.
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Subir Diseño</TabsTrigger>
            <TabsTrigger value="wholesale">Pedido Mayorista</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sube tu Diseño</CardTitle>
                <CardDescription>
                  Sube una imagen o boceto de tu diseño. Aceptamos archivos JPG, PNG o PDF.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="design-upload"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="design-upload"
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      {previewUrl ? (
                        <div className="relative w-full max-w-md h-64 mx-auto">
                          <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-stone-400" />
                          <span className="text-stone-600">Haz clic para subir o arrastra y suelta</span>
                          <span className="text-sm text-stone-500">Máximo 10MB</span>
                        </>
                      )}
                    </Label>
                    {selectedFile && (
                      <p className="mt-2 text-sm text-stone-600">Archivo seleccionado: {selectedFile.name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="design-name">Nombre de tu Diseño</Label>
                    <Input id="design-name" placeholder="Ej: Botín Casual Urbano" />
                  </div>

                  <div>
                    <Label htmlFor="design-description">Descripción</Label>
                    <Textarea
                      id="design-description"
                      placeholder="Describe tu diseño, materiales preferidos, colores, etc."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Calzado</Label>
                    <RadioGroup defaultValue="boots">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boots" id="boots" />
                        <Label htmlFor="boots">Botines</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="shoes" id="shoes" />
                        <Label htmlFor="shoes">Zapatos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="loafers" id="loafers" />
                        <Label htmlFor="loafers">Mocasines</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Otro</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <Button className="w-full">Continuar al Pedido Mayorista</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wholesale" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pedido Mayorista</CardTitle>
                <CardDescription>Completa la información para tu pedido mayorista. Mínimo 6 pares.</CardDescription>
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
                      <Label htmlFor="quantity">Cantidad (mínimo 6 pares)</Label>
                      <Input id="quantity" type="number" min="6" defaultValue="6" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="sizes">Tallas y Cantidades</Label>
                    <Textarea id="sizes" placeholder="Ej: 38 (2 pares), 39 (2 pares), 40 (2 pares)" rows={2} />
                  </div>

                  <div>
                    <Label htmlFor="additional-info">Información Adicional</Label>
                    <Textarea id="additional-info" placeholder="Cualquier detalle adicional sobre tu pedido" rows={3} />
                  </div>
                </div>

                <Button className="w-full">Enviar Solicitud</Button>
                <p className="text-sm text-stone-500 text-center">
                  Te contactaremos en 24-48 horas para discutir los detalles y proporcionar un presupuesto.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

