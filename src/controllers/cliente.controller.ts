import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Cliente } from "../entities/Clientes.js";

const clienteRepository = AppDataSource.getRepository(Cliente);

export const getClientes = async(req:Request, res: Response) => {
    try{
        const clientes = await clienteRepository.find();
        return res.json(clientes)
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const getCliente = async(req: Request, res: Response) => {
    try{
        const { codigoCliente } = req.params;
        const cliente = await clienteRepository.findOneBy({codigoCliente: Number(codigoCliente)})
        
        if(!cliente) return res.status(404).json({message: 'cliente no encontrado'});

        return res.json(cliente);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const createCliente = async(req: Request, res: Response) => {
    try{
        const nuevoCliente = clienteRepository.create(req.body);
        const result = await clienteRepository.save(nuevoCliente);

        return res.status(201).json(result);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const updateCliente = async(req: Request, res: Response) => {
    try{
        const { codigoCliente } = req.params;
        const cliente = await clienteRepository.findOneBy({codigoCliente: Number(codigoCliente)});
        
        if(!cliente) return res.status(404).json({message: 'cliente no encontrado'});

        clienteRepository.merge(cliente, req.body);
        const resultado = await clienteRepository.save(cliente);

        return res.json(resultado);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const deleteCliente = async(req: Request, res: Response) => {
    try{
        const { codigoCliente } = req.params;
        const resultado = await clienteRepository.delete({codigoCliente: Number(codigoCliente)});

        if(resultado.affected === 0){
            return res.status(404).json({message: 'cliente no encontrado'});
        }

        return res.sendStatus(204);

    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}
