import { Router} from "express";
import type{ Request, Response } from "express";
import { 
    getEmpleados, 
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../controllers/cliente.controller.js";

const router = Router();

router.get('/hello', (req: Request, res: Response) => {
    res.send("<h1>Hello world</h1>")
})

router.get("/empleados", getEmpleados);

router.get("/empleado/:codigoEmpleado", getEmpleado);

router.post("/empleados", createEmpleado);

router.put("/empleados/:codigoEmpleado", updateEmpleado);

router.delete("/empleados/:codigoEmpleado", deleteEmpleado);

export default router;