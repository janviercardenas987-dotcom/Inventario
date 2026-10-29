import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Empleado } from "../entities/Empleado.js";

const empleadoRepository = AppDataSource.getRepository(Empleado);

export const getEmpleados = async (req: Request, res: Response) => {
    try {
        const empleados = await empleadoRepository.find();
        return res.json(empleados);
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
};

export const getEmpleado = async (req: Request, res: Response) => {
    try {
        const { codigoEmpleado } = req.params;
        const empleado = await empleadoRepository.findOneBy({ codigoEmpleado: Number(codigoEmpleado) });
        
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado.' });
        return res.json(empleado);
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
};

export const createEmpleado = async (req: Request, res: Response) => {
    try {
        const nuevoEmpleado = empleadoRepository.create(req.body);
        const resultado = await empleadoRepository.save(nuevoEmpleado);
        
        return res.status(201).json(resultado); 
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
};

export const updateEmpleado = async (req: Request, res: Response) => {
    try {
        const { codigoEmpleado } = req.params;
        const empleado = await empleadoRepository.findOneBy({ codigoEmpleado: Number(codigoEmpleado) });
        
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado.' });
        
        // Mezclamos los datos actuales con los nuevos
        empleadoRepository.merge(empleado, req.body);
        const resultado = await empleadoRepository.save(empleado);

        return res.json(resultado);
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
};

export const deleteEmpleado = async (req: Request, res: Response) => {
    try {
        const { codigoEmpleado } = req.params;
        const result = await empleadoRepository.delete({ codigoEmpleado: Number(codigoEmpleado) });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        return res.sendStatus(204); 
    } catch (error) {
        if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
};