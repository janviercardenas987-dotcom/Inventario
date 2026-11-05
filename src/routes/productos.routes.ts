import { Router } from "express";
import { createProducto, deleteProducto, getProducto, getProductos, updateProducto } from "../controllers/producto.controller.js";
import { validate } from "../middlewares/validate.js";
import { schemaProducto } from "../schemas/productoSchema.js"
const router = Router();

router.get("/api/productos", validate(schemaProducto), getProductos);

router.get("/api/producto/:codigoProducto", getProducto);

router.post("/api/productos", createProducto);

router.put("/api/producto/:codigoProducto", validate(schemaProducto), updateProducto);

router.delete("/api/producto/:codigoProducto", deleteProducto);

export default router;