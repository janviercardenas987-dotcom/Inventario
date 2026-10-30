import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Pedido } from "./Pedido.js";

@Entity('cliente')
export class Cliente extends BaseEntity{
    @PrimaryGeneratedColumn({type: 'int', name: 'codigo_cliente'})
    codigoCliente: number;

    @Column({type: 'int', unique:true})
    cedula: number;

    @Column({type: 'varchar', length: 45})
    nombre: string;

    @Column({type: 'varchar', length: 45})
    apellido: string;

    @Column({name: 'numero_telefono', type: 'varchar', length: 45})
    numTelefono: string;

    @Column({type: 'varchar', length: 45})
    direccion: string

    @Column({type: 'varchar', length: 45})
    poblacion: string;

    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Relation<Pedido[]>
}