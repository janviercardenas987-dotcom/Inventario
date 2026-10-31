import { Router } from "express";
import { createPedido, deletePedido, getPedido, getPedidos, updatePedido } from "../controllers/pedido.controller.js";

const router = Router();

router.get("/api/pedidos", getPedidos);

router.get("/api/pedido/:codigoPedido", getPedido);

router.post("/api/pedido", createPedido);

router.put("/api/pedido:codigoPedido", updatePedido);

router.delete("/api/pedido/codigoPedido", deletePedido);

export default router