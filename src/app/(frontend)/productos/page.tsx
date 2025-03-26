import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function ProductsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Categorías</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="category-boots" />
                <Label htmlFor="category-boots">Botines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="category-shoes" />
                <Label htmlFor="category-shoes">Zapatos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="category-loafers" />
                <Label htmlFor="category-loafers">Mocasines</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="category-sandals" />
                <Label htmlFor="category-sandals">Sandalias</Label>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h3 className="text-lg font-medium mb-4">Color</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="color-brown" />
                <Label htmlFor="color-brown">Café</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="color-black" />
                <Label htmlFor="color-black">Negro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="color-honey" />
                <Label htmlFor="color-honey">Miel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="color-natural" />
                <Label htmlFor="color-natural">Natural</Label>
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h3 className="text-lg font-medium mb-4">Precio</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-1" />
                <Label htmlFor="price-1">$0 - $50.000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-2" />
                <Label htmlFor="price-2">$50.000 - $80.000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-3" />
                <Label htmlFor="price-3">$80.000 - $120.000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="price-4" />
                <Label htmlFor="price-4">$120.000+</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Todos los Productos</h1>
            <p className="text-stone-600 mt-2">Mostrando 12 productos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden border-stone-200">
                <Link href={`/productos/${product.id}`} className="relative block aspect-square">
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4">
                  <Link href={`/productos/${product.id}`}>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                  </Link>
                  <p className="text-stone-600 mt-1">{product.category}</p>
                  <p className="font-medium mt-2">{product.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-2">
              Anterior
            </Button>
            <Button variant="outline" className="mx-2">
              1
            </Button>
            <Button variant="outline" className="mx-2">
              2
            </Button>
            <Button variant="outline" className="mx-2">
              3
            </Button>
            <Button variant="outline" className="mx-2">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    id: '1',
    name: 'Botín Artesanal Cuero Café',
    category: 'Botines',
    price: '$89.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '2',
    name: 'Zapato Oxford Cuero Natural',
    category: 'Zapatos',
    price: '$79.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '3',
    name: 'Mocasín Cuero Miel',
    category: 'Mocasines',
    price: '$69.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '4',
    name: 'Botín Chelsea Cuero Negro',
    category: 'Botines',
    price: '$94.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '5',
    name: 'Zapato Derby Cuero Café',
    category: 'Zapatos',
    price: '$84.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '6',
    name: 'Sandalia Cuero Natural',
    category: 'Sandalias',
    price: '$59.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '7',
    name: 'Botín Trabajo Cuero Café',
    category: 'Botines',
    price: '$99.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '8',
    name: 'Zapato Monk Cuero Negro',
    category: 'Zapatos',
    price: '$89.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '9',
    name: 'Mocasín Penny Cuero Miel',
    category: 'Mocasines',
    price: '$74.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '10',
    name: 'Botín Desert Cuero Natural',
    category: 'Botines',
    price: '$84.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '11',
    name: 'Zapato Brogue Cuero Café',
    category: 'Zapatos',
    price: '$89.990',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '12',
    name: 'Sandalia Trekking Cuero Café',
    category: 'Sandalias',
    price: '$64.990',
    image: '/placeholder.svg?height=400&width=400',
  },
]
