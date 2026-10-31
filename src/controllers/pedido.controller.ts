import { AppDataSource } from "../data-source.js";
import { Cliente } from "../entities/Cliente.js";
import { Pedido } from "../entities/Pedido.js";
import type{ Request, Response } from "express";
import { Producto } from "../entities/Producto.js";
import { DetallePedido } from "../entities/DetallePedidos.js";

const pedidoRepository = AppDataSource.getRepository(Pedido);

export const getPedidos = async (req: Request, res: Response) => {
    try{
        const pedido = await pedidoRepository.find({
            relations: {
                detalles: true,
            }
        })

        return res.json(pedido);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
    
}

export const getPedido = async (req: Request, res: Response) => {
    try{
        const { codigoPedido } = req.params;
        const pedido = await pedidoRepository.findOne({
            where: {codigoPedido: Number(codigoPedido)},
            relations:{
                detalles: true,
            }
        });

        if(!pedido) return res.status(404).json({message: 'pedido no encontrado'});

        return res.json(pedido);

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const createPedido = async (req: Request, res: Response) => {
    try{
        const { codigoCliente, formaPago, detalles} = req.body;

        if(!detalles || detalles.length === 0){
            return res.status(400).json({message: 'El pedido debe tener al menos un producto'});
        }

        //iniciamos la transacción
        const resultado = await AppDataSource.transaction(async (manager) => {

            //validar el cliente
            const cliente = await manager.findOne(Cliente, {
                where: {codigoCliente: Number(codigoCliente)}
            });
            
            if(!cliente) throw new Error('Cliente no encontrado');
            
            // crear el pedido(sin guardar aun)
            const nuevoPedido = manager.create(Pedido, {
                fecha: new Date(),
                formaPago: formaPago,
                cliente: cliente
            });

            //recorrer los detalles
            for(const item of detalles){
                const producto = await manager.findOne(Producto, {
                    where:{codigoProducto: item.codigoProducto}
                });

                if(!producto) throw new Error(`Producto con código: ${item.codigoProducto} no encontrado`);
            
                if(producto.stock < item.cantidad){
                    throw new Error(`Stock insuficiente para el producto ${producto.nombreProducto}`);
                }

                producto.stock -= item.cantidad;
                await manager.save(producto);

                // Crear detalle pedido
                const nuevoDetalle = manager.create(DetallePedido, {
                    cantidad: item.cantidad,
                    precioVenta: producto.precio,
                    producto: producto,
                    pedido: nuevoPedido
                });

                await manager.save(nuevoDetalle);
            }

            await manager.save(nuevoPedido);

            return nuevoPedido;
        });

        return res.status(201).json(resultado);

    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({message: error.message});
        }
        return res.status(500).json({message: 'Error interno del servidor'});
    }
}

export const updatePedido = async (req: Request, res: Response) => {
    try {
        const { codigoPedido } = req.params;
        const { formaPago, detalles } = req.body;

        if (!detalles || detalles.length === 0) {
            return res.status(400).json({ message: 'El pedido debe tener al menos un producto' });
        }

        const resultado = await AppDataSource.transaction(async (manager) => {
            // 1. Buscar el pedido con sus detalles actuales
            const pedido = await manager.findOne(Pedido, {
                where: { codigoPedido: Number(codigoPedido) },
                relations: { detalles: { producto: true } }
            });

            if (!pedido) throw new Error('Pedido no encontrado');

            // 2. Devolver el stock de los productos del pedido original
            for (const detalleViejo of pedido.detalles) {
                detalleViejo.producto.stock += detalleViejo.cantidad;
                await manager.save(detalleViejo.producto);
            }

            // 3. Borrar los detalles viejos (para no acumular basura)
            await manager.remove(pedido.detalles);

            // 4. Actualizar los datos básicos del pedido
            pedido.formaPago = formaPago;
            // pedido.fecha = new Date(); // Opcional, depende de tu negocio

            // 5. Recorrer los NUEVOS detalles y hacer la misma lógica del create
            for (const item of detalles) {
                const producto = await manager.findOne(Producto, { where: { codigoProducto: item.codigoProducto } });
                
                if (!producto) throw new Error(`Producto ${item.codigoProducto} no encontrado`);
                
                if (producto.stock < item.cantidad) {
                    throw new Error(`Stock insuficiente para el producto ${producto.nombreProducto}`);
                }

                producto.stock -= item.cantidad;
                await manager.save(producto);

                const nuevoDetalle = manager.create(DetallePedido, {
                    cantidad: item.cantidad,
                    precioVenta: producto.precio,
                    producto: producto,
                    pedido: pedido
                });

                await manager.save(nuevoDetalle);
            }

            await manager.save(pedido);
            return pedido;
        });

        return res.json(resultado);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Error interno' });
    }
}

export const deletePedido = async (req: Request, res: Response) => {
    try{
        const { codigoPedido } = req.params;
        const pedido = await pedidoRepository.delete({codigoPedido: Number(codigoPedido)});

        if(pedido.affected === 0) return res.status(404).json({message: 'pedido no encontrado'});


        return res.sendStatus(204);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}