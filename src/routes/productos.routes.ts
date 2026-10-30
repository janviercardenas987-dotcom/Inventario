import { Router } from "express";
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from "../controllers/producto.controller.js";

const router = Router();

router.get("/api/productos", getProductos);

router.get("/api/producto/:codigoProducto", getProducto);

router.post("/api/productos", createProducto);

router.put("/api/producto/:codigoProducto", updateProducto);

router.delete("/api/producto/:codigoProducto", deleteProducto);

export default router;