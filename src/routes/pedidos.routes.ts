import { Router } from "express";
import { createPedido, getPedido, getPedidos } from "../controllers/pedido.controller.js";

const router = Router();

router.get("/api/pedidos", getPedidos);

router.get("/api/pedido/:codigoPedido", getPedido);

router.post("/api/pedido/:codigoPedido", createPedido);

export default router