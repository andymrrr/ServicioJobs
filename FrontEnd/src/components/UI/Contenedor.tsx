import { ReactNode } from "react"

interface ContenedorPropiedad{
    children: ReactNode
}

export const Contenedor = ({children}:ContenedorPropiedad) => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
    {children}
    </div>
  )
}
