import { z } from 'zod'

export const schemaProducto = z.object({
    seccion: z.string().min(1, "La sección es obligatoria").max(45),
    nombreProducto: z.string().min(1, "El nombre del producto").max(45),
    precio: z.number().positive("El precio tiene que ser positivo"),
    paisOrigen: z.string().min(1, "El obligatorio el país de origen"),
    stock: z.number().positive("El stock tiene que se positivo")
}).strict();

export default schemaProducto;