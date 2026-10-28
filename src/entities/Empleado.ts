import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity('empleado')
export class Empleado extends BaseEntity{
    @PrimaryGeneratedColumn({name: 'codigo_empleado'})
    codigoEmpleado: number;

    @Column({type: 'int', unique: true})
    cedula: number;

    @Column({type: 'varchar', length: 45})
    nombre: string;

    @Column({name:'segundo_nombre' ,type: 'varchar', length: 45, nullable:true})
    segundoNombre: string;

    @Column({name:'apellido_paterno', type: 'varchar', length: 45})
    apellidoPaterno: string;

    @Column({name:'apellido_materno', type: 'varchar', length: 45})
    apellidoMaterno: string;

    @Column({type: 'varchar', length: 20, nullable: true})
    telefono: string | null;

    @Column({type: 'varchar', length: 45, nullable: true, unique: true})
    email: string;

    @Column({type:'varchar', nullable: true})
    cargo: string | null;

    @Column({name: 'fecha_alta', type: 'date', default: () => 'CURRENT_DATE', nullable: true})
    fechaAlta:Date
}