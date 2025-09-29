import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido/pedido.entity';
import { PedidosModule } from './pedido/pedido.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'prueba_user',
      password: 'prueba_password',
      database: 'prueba_db',
      entities: [Pedido],
      synchronize: true,
    }),
    PedidosModule,
  ],
})
export class AppModule {}
