// En un componente de React
import { Media } from '@/payload-types'
import Image from 'next/image'

interface Product {
  'Product Image': string | Media /* { url: string } */
  'Product Name': string
}

const ProductImage = ({ product }: { product: Product }) => {
  // Función para asegurar que la URL comience con https:// o http://
  const getFullImageUrl = (url: string) => {
    // Si la URL ya es absoluta (comienza con http:// o https://)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    // Si la URL es relativa, añade el serverURL
    return `${process.env.NEXT_PUBLIC_API_URL}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return (
    <Image
      src={getFullImageUrl((product['Product Image'] as { url: string }).url)}
      alt={product['Product Name']}
      fill
      className="object-cover transition-transform hover:scale-105"
    />
  )
}
export { ProductImage }
