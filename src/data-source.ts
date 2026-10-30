import { DataSource } from "typeorm";
import { Empleado } from "./entities/Empleado.js"
import { Cliente } from "./entities/Cliente.js";
import { Producto } from "./entities/Producto.js";
import { Pedido } from "./entities/Pedido.js";
import { DetallePedido } from "./entities/DetallePedidos.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "max2006.",
    database: "inventario",
    synchronize: false,
    entities: [Empleado, Cliente, Producto, Pedido, DetallePedido]
})