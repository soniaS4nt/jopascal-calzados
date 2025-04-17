'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Filter, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet'

// Datos de productos
const allProducts = [
  {
    id: '1',
    name: 'Botín Artesanal Cuero Café',
    category: 'Botines',
    price: 89990,
    color: 'café',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '2',
    name: 'Zapato Oxford Cuero Natural',
    category: 'Zapatos',
    price: 79990,
    color: 'natural',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '3',
    name: 'Mocasín Cuero Miel',
    category: 'Mocasines',
    price: 69990,
    color: 'miel',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '4',
    name: 'Botín Chelsea Cuero Negro',
    category: 'Botines',
    price: 94990,
    color: 'negro',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '5',
    name: 'Zapato Derby Cuero Café',
    category: 'Zapatos',
    price: 84990,
    color: 'café',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '6',
    name: 'Sandalia Cuero Natural',
    category: 'Sandalias',
    price: 59990,
    color: 'natural',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '7',
    name: 'Botín Trabajo Cuero Café',
    category: 'Botines',
    price: 99990,
    color: 'café',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '8',
    name: 'Zapato Monk Cuero Negro',
    category: 'Zapatos',
    price: 89990,
    color: 'negro',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '9',
    name: 'Mocasín Penny Cuero Miel',
    category: 'Mocasines',
    price: 74990,
    color: 'miel',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '10',
    name: 'Botín Desert Cuero Natural',
    category: 'Botines',
    price: 84990,
    color: 'natural',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '11',
    name: 'Zapato Brogue Cuero Café',
    category: 'Zapatos',
    price: 89990,
    color: 'café',
    image: '/placeholder.svg?height=400&width=400',
  },
  {
    id: '12',
    name: 'Sandalia Trekking Cuero Café',
    category: 'Sandalias',
    price: 64990,
    color: 'café',
    image: '/placeholder.svg?height=400&width=400',
  },
]

// Opciones de filtro
const categoryOptions = ['Botines', 'Zapatos', 'Mocasines', 'Sandalias']
const colorOptions = ['café', 'negro', 'miel', 'natural']
const priceRanges = [
  { id: 'price-1', label: '$0 - $50.000', min: 0, max: 50000 },
  { id: 'price-2', label: '$50.000 - $80.000', min: 50000, max: 80000 },
  { id: 'price-3', label: '$80.000 - $120.000', min: 80000, max: 120000 },
  { id: 'price-4', label: '$120.000+', min: 120000, max: Number.POSITIVE_INFINITY },
]

// Componente Skeleton para productos
function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border-stone-200">
      <div className="relative aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-5 w-1/3 mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
}

// Componente Skeleton para filtros
function FilterSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-24 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <Skeleton className="h-7 w-16 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <Skeleton className="h-7 w-16 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente de Filtros
function FilterContent({
  loading,
  filterLoading,
  selectedCategories,
  selectedColors,
  selectedPriceRanges,
  handleCategoryChange,
  handleColorChange,
  handlePriceChange,
  clearAllFilters,
  isMobile = false,
}: {
  loading: boolean
  filterLoading: boolean
  selectedCategories: string[]
  selectedColors: string[]
  selectedPriceRanges: string[]
  handleCategoryChange: (category: string) => void
  handleColorChange: (color: string) => void
  handlePriceChange: (priceId: string) => void
  clearAllFilters: () => void
  isMobile?: boolean
}) {
  return (
    <div className="space-y-6">
      {loading ? (
        <FilterSkeleton />
      ) : (
        <>
          {isMobile && (
            <div className="flex justify-between items-center mb-2">
              <SheetTitle>Filtros</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium mb-4">Categorías</h3>
            <div className="space-y-3">
              {categoryOptions.map((category, index) => (
                <div key={`${category}-${index}`} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.toLowerCase()}${isMobile ? '-mobile' : ''}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    disabled={filterLoading}
                  />
                  <Label
                    htmlFor={`category-${category.toLowerCase()}${isMobile ? '-mobile' : ''}`}
                    className={`cursor-pointer ${filterLoading ? 'opacity-50' : ''}`}
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div>
            <h3 className="text-lg font-medium mb-4">Color</h3>
            <div className="space-y-3">
              {colorOptions.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}${isMobile ? '-mobile' : ''}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => handleColorChange(color)}
                    disabled={filterLoading}
                  />
                  <Label
                    htmlFor={`color-${color}${isMobile ? '-mobile' : ''}`}
                    className={`cursor-pointer capitalize ${filterLoading ? 'opacity-50' : ''}`}
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div>
            <h3 className="text-lg font-medium mb-4">Precio</h3>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <div key={range.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${range.id}${isMobile ? '-mobile' : ''}`}
                    checked={selectedPriceRanges.includes(range.id)}
                    onCheckedChange={() => handlePriceChange(range.id)}
                    disabled={filterLoading}
                  />
                  <Label
                    htmlFor={`${range.id}${isMobile ? '-mobile' : ''}`}
                    className={`cursor-pointer ${filterLoading ? 'opacity-50' : ''}`}
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button className="w-full" disabled={filterLoading}>
                  Ver resultados
                </Button>
              </SheetClose>
              <Button
                variant="outline"
                className="w-full"
                onClick={clearAllFilters}
                disabled={filterLoading}
              >
                Limpiar filtros
              </Button>
            </SheetFooter>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductsPage() {
  // Estados para los filtros
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [products, setProducts] = useState<typeof allProducts>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Cargar productos inicialmente
  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setProducts(allProducts)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Función para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Manejadores de cambio de filtros
  const handleCategoryChange = (category: string) => {
    setFilterLoading(true)

    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        const newFilters = prev.filter((c) => c !== category)
        updateActiveFilters('category', category, false)
        return newFilters
      } else {
        updateActiveFilters('category', category, true)
        return [...prev, category]
      }
    })

    // Simular tiempo de carga al aplicar filtros
    setTimeout(() => {
      setFilterLoading(false)
    }, 500)
  }

  const handleColorChange = (color: string) => {
    setFilterLoading(true)

    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        const newFilters = prev.filter((c) => c !== color)
        updateActiveFilters('color', color, false)
        return newFilters
      } else {
        updateActiveFilters('color', color, true)
        return [...prev, color]
      }
    })

    // Simular tiempo de carga al aplicar filtros
    setTimeout(() => {
      setFilterLoading(false)
    }, 500)
  }

  const handlePriceChange = (priceId: string) => {
    setFilterLoading(true)

    const priceRange = priceRanges.find((range) => range.id === priceId)
    if (!priceRange) return

    setSelectedPriceRanges((prev) => {
      if (prev.includes(priceId)) {
        const newFilters = prev.filter((p) => p !== priceId)
        updateActiveFilters('price', priceRange.label, false)
        return newFilters
      } else {
        updateActiveFilters('price', priceRange.label, true)
        return [...prev, priceId]
      }
    })

    // Simular tiempo de carga al aplicar filtros
    setTimeout(() => {
      setFilterLoading(false)
    }, 500)
  }

  // Actualizar filtros activos
  const updateActiveFilters = (type: string, value: string, isAdding: boolean) => {
    const filterLabel = `${type}: ${value}`

    if (isAdding) {
      // Solo agrega si no está ya en el array
      setActiveFilters((prev) => (prev.includes(filterLabel) ? prev : [...prev, filterLabel]))
    } else {
      setActiveFilters((prev) => prev.filter((filter) => filter !== filterLabel))
    }
  }

  // Remover un filtro activo
  const removeFilter = (filter: string) => {
    setFilterLoading(true)

    const [type, value] = filter.split(': ')

    if (type === 'category') {
      setSelectedCategories((prev) => prev.filter((c) => c !== value))
    } else if (type === 'color') {
      setSelectedColors((prev) => prev.filter((c) => c !== value))
    } else if (type === 'price') {
      const priceId = priceRanges.find((range) => range.label === value)?.id
      if (priceId) {
        setSelectedPriceRanges((prev) => prev.filter((p) => p !== priceId))
      }
    }

    setActiveFilters((prev) => prev.filter((f) => f !== filter))

    // Simular tiempo de carga al aplicar filtros
    setTimeout(() => {
      setFilterLoading(false)
    }, 500)
  }

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setFilterLoading(true)

    setSelectedCategories([])
    setSelectedColors([])
    setSelectedPriceRanges([])
    setActiveFilters([])

    // Simular tiempo de carga al aplicar filtros
    setTimeout(() => {
      setFilterLoading(false)
    }, 500)
  }

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    // Filtro por categoría
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filtro por color
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
      return false
    }

    // Filtro por rango de precio
    if (selectedPriceRanges.length > 0) {
      const inPriceRange = selectedPriceRanges.some((rangeId) => {
        const range = priceRanges.find((r) => r.id === rangeId)
        if (!range) return false
        return product.price >= range.min && product.price <= range.max
      })

      if (!inPriceRange) {
        return false
      }
    }

    return true
  })

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        {/* Filters Sidebar - Desktop Only */}
        <div className="hidden md:block space-y-6">
          <FilterContent
            loading={loading}
            filterLoading={filterLoading}
            selectedCategories={selectedCategories}
            selectedColors={selectedColors}
            selectedPriceRanges={selectedPriceRanges}
            handleCategoryChange={handleCategoryChange}
            handleColorChange={handleColorChange}
            handlePriceChange={handlePriceChange}
            clearAllFilters={clearAllFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold tracking-tighter">Todos los Productos</h1>

              {/* Mobile Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrar
                    {activeFilters.length > 0 && (
                      <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                        {activeFilters.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mb-5">
                    <FilterContent
                      loading={loading}
                      filterLoading={filterLoading}
                      selectedCategories={selectedCategories}
                      selectedColors={selectedColors}
                      selectedPriceRanges={selectedPriceRanges}
                      handleCategoryChange={handleCategoryChange}
                      handleColorChange={handleColorChange}
                      handlePriceChange={handlePriceChange}
                      clearAllFilters={clearAllFilters}
                      isMobile={true}
                    />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

            {loading ? (
              <Skeleton className="h-5 w-40 mt-2" />
            ) : (
              <p className="text-stone-600 mt-2">
                Mostrando {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'producto' : 'productos'}
              </p>
            )}

            {/* Active Filters */}
            {!loading && activeFilters.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-stone-600">Filtros activos:</span>
                  {activeFilters.map((filter) => (
                    <Badge key={filter} variant="outline" className="flex items-center gap-1">
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="ml-1 h-4 w-4 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs"
                        disabled={filterLoading}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-sm h-8"
                    disabled={filterLoading}
                  >
                    Limpiar todos
                  </Button>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          ) : filterLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(filteredProducts.length || 3)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                    <p className="font-medium mt-2">{formatPrice(product.price)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      Ver Detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No se encontraron productos</h3>
              <p className="text-stone-600 mb-4">
                No hay productos que coincidan con los filtros seleccionados.
              </p>
              <Button onClick={clearAllFilters}>Limpiar filtros</Button>
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}
