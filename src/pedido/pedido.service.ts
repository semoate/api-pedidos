import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { CreatePedidoDto } from './create.pedido.dto';
import { NotFoundException } from '@nestjs/common';
import { GetPedidosQueryDto } from './get-pedidos-query-dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(pedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new Pedido();
    pedido.cliente = pedidoDto.cliente;
    pedido.origen = pedidoDto.origen;
    pedido.destino = pedidoDto.destino;
    pedido.mercancia = pedidoDto.mercancia;
    pedido.pesoKg = pedidoDto.pesoKg;
    pedido.estado = pedidoDto.estado;
    pedido.createdAt = new Date();
    return this.pedidoRepository.save(pedido);
  }
  async findAll(query: GetPedidosQueryDto) {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    const where = query.estado ? { estado: query.estado } : {};

    const [data, total] = await this.pedidoRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return {
      data,
      meta: {
        total,
        pagina: query.page,
        limite: query.limit,
        totalPaginas: Math.ceil(total / query.limit),
      },
    };
  }

  async findOne(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOneBy({ id });
    if (!pedido) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    }
    return pedido;
  }
}
