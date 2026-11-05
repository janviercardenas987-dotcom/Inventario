import {z} from 'zod'

export const clienteSchema = z.object({
    cedula: z.number().int().positive("La cedula debe ser un número positivo."),
    nombre: z.string().min(1, "El nombre es obligatorio.").max(45),
    apellido: z.string().min(1, "El apellido es obligatorio.").max(45),
    numTelefono: z.string().min(7, "El telefono debe tener al menos 7 caracteres"),
    direccion: z.string().min(1, "La direccion es obligatoria.").max(45),
    poblacion: z.string().min(1, "La población es obligatoria.").max(45)

}).strict();

export default clienteSchema;