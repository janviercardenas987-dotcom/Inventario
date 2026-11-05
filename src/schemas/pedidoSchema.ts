import { z } from 'zod';

export const detallePedidoSchema = z.object({
    codigoProducto: z.number().int().positive("El código de producto debe ser un número positivo"),
    cantidad: z.number().int().positive("La cantidad debe ser mayor a 0")
}).strict();

export const pedidoSchema = z.object({
    codigoCliente: z.number().int().positive("El código del cliente debe ser válido"),
    formaPago: z.string().min(1, "La forma de pago es obligatoria"),
    
    detalles: z.array(detallePedidoSchema).min(1, "El pedido debe tener al menos un producto")
}).strict();

export default pedidoSchema;