import express from "express";
import morgan from "morgan";
import cors from "cors";
import empleadoRoutes from "./routes/empleado.routes.js"
import clienteRoutes from "./routes/clientes.routes.js"
import productoRoutes from "./routes/productos.routes.js"
import pedidoRoutes from "./routes/pedidos.routes.js"

const app = express();

app.set('case sensitive routing', true);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(empleadoRoutes);
app.use(clienteRoutes)
app.use(productoRoutes)
app.use(pedidoRoutes)

export default app;



