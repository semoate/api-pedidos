import { IsNotEmpty, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EstadoPedido {
  CREADO = 'CREADO',
  EN_TRANSITO = 'EN_TRANSITO',
  ENTREGADO = 'ENTREGADO',
}

export class CreatePedidoDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsNotEmpty()
  @IsString()
  cliente: string;

  @ApiProperty({ description: 'Ciudad de origen' })
  @IsNotEmpty()
  @IsString()
  origen: string;

  @ApiProperty({ description: 'Ciudad de destino' })
  @IsNotEmpty()
  @IsString()
  destino: string;

  @ApiProperty({ description: 'Tipo de mercancía' })
  @IsNotEmpty()
  @IsString()
  mercancia: string;

  @ApiProperty({ description: 'Peso en kg', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: ' pesoKg debe ser mayor que 0' })
  pesoKg: number;

  @ApiProperty({ enum: EstadoPedido, description: 'Estado del pedido' })
  @IsNotEmpty()
  @IsEnum(EstadoPedido)
  estado: EstadoPedido;
}
