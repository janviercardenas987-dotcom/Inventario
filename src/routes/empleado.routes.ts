import { Router} from "express";
import { 
    getEmpleados, 
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../controllers/empleado.controller.js";

const router = Router();

router.get("/api/empleados", getEmpleados);

router.get("api//empleado/:codigoEmpleado", getEmpleado);

router.post("/api/empleados", createEmpleado);

router.put("/api/empleados/:codigoEmpleado", updateEmpleado);

router.delete("api//empleados/:codigoEmpleado", deleteEmpleado);

export default router;