import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedido.service';
import { PedidosController } from './pedido.controller';
import { Pedido } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])], // 📌 Conecta la entidad con TypeORM
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
