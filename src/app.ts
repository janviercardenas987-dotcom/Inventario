import express from "express";
import morgan from "morgan";
import cors from "cors";
import clienteRoutes from "./routes/clientes.routes.js"
const app = express();

app.set('case sensitive routing', true);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(clienteRoutes);

export default app;



