import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Producto } from "./Producto.js";
import { Pedido } from "./Pedido.js";

@Entity('detalle_pedido')
export class DetallePedido{
    @PrimaryGeneratedColumn({name: 'codigo_detalle', type: 'int'})
    codigoDetalle: number;

    @Column({name: 'precio_venta', type:'numeric', precision: 10, scale: 2})
    precioVenta: number;

    @ManyToOne(() => Producto, (producto) => producto.detalles)
    @JoinColumn({name: 'codigo_producto'})
    producto: Relation<Producto>

    @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
    @JoinColumn({name: 'codigo_pedido'})
    pedido: Relation<Pedido>
}