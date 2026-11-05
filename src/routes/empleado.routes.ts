import { Router} from "express";
import { 
    getEmpleados, 
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../controllers/empleado.controller.js";

import { validate } from "../middlewares/validate.js";
import { empleadoSchema} from "../schemas/empleadoSchema.js"

const router = Router();

router.get("/api/empleados", validate(empleadoSchema), getEmpleados);

router.get("api//empleado/:codigoEmpleado", getEmpleado);

router.post("/api/empleados", createEmpleado);

router.put("/api/empleados/:codigoEmpleado", validate(empleadoSchema),updateEmpleado);

router.delete("api//empleados/:codigoEmpleado", deleteEmpleado);

export default router;