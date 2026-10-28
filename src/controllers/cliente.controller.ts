import{ response, type Request, type Response } from "express";
import { Empleado } from "../entities/Empleado.js";
import { request } from "node:http";

interface BodyEmpleado{
    cedula: number,
    nombre: string,
    segundoNombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    telefono: string | null,
    email: string,
    cargo: string,
    fechaAlta: Date
}

export const getEmpleados = async(req: Request, res: Response) => {
    try{
        const empleado = await Empleado.find();
        return res.json(empleado);
    }catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const getEmpleado = async(req: Request, res: Response) => {
    try{
        const { codigoEmpleado } = req.params;
        const empleado = await Empleado.findOneBy({codigoEmpleado: Number(codigoEmpleado)});
        
        if(!empleado) return res.status(404).json({message: 'Empleado no encontrado.'});
    
        return res.json(empleado);
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}

export const createEmpleado = async(req: Request<BodyEmpleado>, res: Response) => {
    const { cedula, nombre, segundoNombre, apellidoPaterno, apellidoMaterno, telefono, email, cargo, fechaAlta} = req.body;
    const empleado = new Empleado();
    empleado.cedula = Number(cedula);
    empleado.nombre = nombre;
    empleado.segundoNombre = segundoNombre;
    empleado.apellidoPaterno = apellidoPaterno;
    empleado.apellidoMaterno = apellidoMaterno;
    empleado.telefono = telefono;
    empleado.email = email;
    empleado.cargo = cargo;
    empleado.fechaAlta = fechaAlta;

    await empleado.save();
    res.json(empleado);
}

export const updateEmpleado = async(req: Request, res: Response) => {
    const { codigoEmpleado } = req.params;
    try{
        const result = await Empleado.findOneBy({codigoEmpleado: Number(codigoEmpleado)});
        if(!Empleado) return res.status(404).json({message: 'Empleado no encontrado.'});
        
        await Empleado.update({codigoEmpleado: Number(codigoEmpleado)}, req.body);

        return res.sendStatus(204);
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}

export const deleteEmpleado = async(req: Request, res: Response) => {
    const { codigoEmpleado } = req.params;
    try{
        const result = await Empleado.delete({codigoEmpleado: Number(codigoEmpleado)});

        if(result.affected === 0){
            return res.status(404).json({message: 'Empleado no encontrado'});
        }

        return res.sendStatus(204);
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}



