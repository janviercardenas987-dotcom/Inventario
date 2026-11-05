import { z } from 'zod';

export const empleadoSchema = z.object({
    cedula: z.number().int().positive("La cédula debe ser un número positivo"),
    nombre: z.string().min(1, "El nombre es obligatorio").max(45),
    
    segundoNombre: z.string().max(45).optional(),
    
    apellidoPaterno: z.string().min(1, "El apellido paterno es obligatorio").max(45),
    apellidoMaterno: z.string().min(1, "El apellido materno es obligatorio").max(45),
    
    telefono: z.string().max(20).optional().nullable(),
    
    email: z.string().email("El formato del correo no es válido").max(45).optional().nullable(),
    
    cargo: z.string().max(45).optional().nullable(),
    
    // Fecha de alta opcional (si no viene, PostgreSQL pone la actual)
    fechaAlta: z.string().optional() // O z.date() si planeas recibir un objeto Date
}).strict();

export default empleadoSchema;