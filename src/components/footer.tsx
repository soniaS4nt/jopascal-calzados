import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">CueroChile</h3>
            <p className="text-sm">Calzado artesanal de cuero hecho a mano con las mejores materias primas de Chile.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/personalizar" className="hover:text-white">
                  Personalizar
                </Link>
              </li>
              <li>
                <Link href="/mayorista" className="hover:text-white">
                  Mayorista
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/envios" className="hover:text-white">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-white">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>Av. Artesanos 123, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+56 2 2123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>contacto@cuerochile.cl</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CueroChile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

