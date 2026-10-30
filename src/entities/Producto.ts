import { BaseEntity, Check, Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { DetallePedido } from "./DetallePedidos.js";

@Entity('producto')
@Check("precio > 0")
@Check("stock >= 0")
export class Producto extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'codigo_producto'})
    codigoProducto: number;

    @Column({type: "varchar", length: 60})
    seccion: string;

    @Column({name: 'nombre_producto', type: "varchar", length: 45})
    nombreProducto: string;

    @Column({type: 'numeric', precision: 10, scale: 2})
    precio: number;

    @Column({name: 'pais_origen', type: "varchar", length: 45, nullable: true})
    paisOrigen: string;

    @Column({type: 'int', default: 0})
    stock: number;

    @OneToMany(() => DetallePedido, (detalle) => detalle.producto)
    detalle: Relation<DetallePedido>
}