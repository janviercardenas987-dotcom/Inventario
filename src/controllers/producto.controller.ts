import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Producto } from "../entities/Producto.js";

export const productoRepository = AppDataSource.getRepository(Producto);

export const getProductos = async (req: Request, res: Response) => {
    try{
        const productos = await productoRepository.find();
        res.json(productos);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    } 
}

export const getProducto = async (req: Request, res: Response) => {
    try{
        const { codigoProducto } = req.params;
        const producto = await productoRepository.findOneBy({codigoProducto: Number(codigoProducto)});

        if(!producto) return res.status(404).json({message: 'producto no encontrado'});

        res.json(producto);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const createProducto = async (req: Request, res: Response) => {
    try{
        const nuevoProducto = productoRepository.create(req.body);
        const result = await productoRepository.save(nuevoProducto);

        return res.status(201).json(result);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({messge: error.message});
        }
    }
}

export const updateProducto = async (req: Request, res: Response) => {
    try{
        const { codigoProducto } = req.params;
        const producto = await productoRepository.findOneBy({codigoProducto: Number(codigoProducto)});

        if(!producto) return res.status(404).json({message: 'producto no encontrado'});

        productoRepository.merge(producto, req.body);

        const resultado = await productoRepository.save(producto);

        res.json(resultado);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const deleteProducto = async (req: Request, res: Response) => {
    try{
        const { codigoProducto } = req.params;
        const resultado = await productoRepository.delete({codigoProducto: Number(codigoProducto)});

        if(resultado.affected === 0){
            return res.status(404).json({message: 'producto no encontrado'});
        }

        res.sendStatus(204);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}