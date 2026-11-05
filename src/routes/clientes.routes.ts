import { Router } from "express";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../controllers/cliente.controller.js";
import { validate } from "../middlewares/validate.js";
import clienteSchema from "../schemas/clienteSchema.js";

const router = Router();

router.get("/api/clientes", validate(clienteSchema), getClientes);

router.get("/api/cliente/:codigoCliente", getCliente);

router.post("/api/clientes", createCliente);

router.put("/api/cliente/:codigoCliente", validate(clienteSchema), updateCliente);

router.delete("/api/cliente/:codigoCliente", deleteCliente);

export default router;
