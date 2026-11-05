import { Router } from "express";
import { createPedido, deletePedido, getPedido, getPedidos, updatePedido } from "../controllers/pedido.controller.js";
import { validate } from "../middlewares/validate.js";
import { pedidoSchema } from "../schemas/pedidoSchema.js"


const router = Router();

router.get("/api/pedidos", validate(pedidoSchema), getPedidos);

router.get("/api/pedido/:codigoPedido", getPedido);

router.post("/api/pedido", createPedido);

router.put("/api/pedido:codigoPedido", validate(pedidoSchema),  updatePedido);

router.delete("/api/pedido/codigoPedido", deletePedido);

export default router