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
    try{

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const deletePedido = async (req: Request, res: Response) => {
    try{

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}