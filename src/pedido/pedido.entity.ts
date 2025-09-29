import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoPedido } from './create.pedido.dto';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  cliente: string;

  @Column()
  origen: string;

  @Column()
  destino: string;

  @Column()
  mercancia: string;

  @Column('float')
  pesoKg: number;

  @Column({ type: 'enum', enum: EstadoPedido, default: EstadoPedido.CREADO })
  estado: EstadoPedido;
}
