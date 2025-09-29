import { EstadoPedido } from './create.pedido.dto';
import { IsInt, Min, Max, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPedidosQueryDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;
}
