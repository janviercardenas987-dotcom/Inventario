import { Router } from "express";
import { createCliente, deleteCliente, getCliente, getClientes, updateCliente } from "../controllers/cliente.controller.js";


const router = Router();

router.get("/api/clientes", getClientes);

router.get("/api/cliente/:codigoCliente", getCliente);

router.post("/api/clientes", createCliente);

router.put("/api/cliente/:codigoCliente", updateCliente);

router.delete("/api/cliente/:codigoCliente", deleteCliente);

export default router;
