import { Column, Entity, JoinColumn, OneToMany, ManyToOne,PrimaryGeneratedColumn} from "typeorm";
import type { Relation } from "typeorm";
import { Cliente } from "./Cliente.js";
import { DetallePedido } from "./DetallePedidos.js";

@Entity()
export class Pedido{
    @PrimaryGeneratedColumn({name: 'codigo_pedido', type:'int'})
    codigoPedido: number;

    @Column({type: 'date'})
    fecha: Date;

    @Column({name: 'forma_pago', type: 'varchar', length: 45})
    formaPago: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
    @JoinColumn({name: 'codigo_cliente'})
    cliente: Relation<Cliente>;

    @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
    detalle: Relation<DetallePedido>
}