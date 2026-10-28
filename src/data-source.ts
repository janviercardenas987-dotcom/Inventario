import { DataSource } from "typeorm";
import { Empleado } from "./entities/Empleado.js"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "max2006.",
    database: "inventario",
    synchronize: false,
    entities: [Empleado]
})