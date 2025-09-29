import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreatePedidoDto } from './create.pedido.dto';
import { PedidosService } from './pedido.service';
import { Pedido } from './pedido.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPedidosQueryDto } from './get-pedidos-query-dto';
import { ApiQuery } from '@nestjs/swagger';
import { EstadoPedido } from './create.pedido.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {} 
  @Get()
  @ApiOperation({
    summary: 'Listar pedidos con paginación y filtro por estado',
  })
  @ApiQuery({
    name: 'pagina',
    required: false,
    type: Number,
    description: 'Número de página, default 1',
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    type: Number,
    description: 'Cantidad de registros por página, default 10, máx 50',
  })
  @ApiQuery({ name: 'estado', required: false, enum: EstadoPedido })
  async findAll(@Query() query: GetPedidosQueryDto) {
    return this.pedidoService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado correctamente',
    type: Pedido,
  })
  async create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.pedidoService.create(createPedidoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un pedido por id' })
  @ApiResponse({
    status: 200,
    description: 'Pedido obtenido correctamente',
    type: Pedido,
  })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async findOne(@Param('id') id: string): Promise<Pedido> {
    return await this.pedidoService.findOne(id);
  }
}
