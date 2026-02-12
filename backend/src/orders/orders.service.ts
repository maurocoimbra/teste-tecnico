import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService }from '../products/products.service';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import type{ OrderRepository } from './repositories/order.repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
    private readonly productsService: ProductsService,
  ) {}

  async createFromWebhook(order: Order) {
    if (Number.isNaN(order.createdAt.getTime())) {
      throw new BadRequestException('Invalid createdAt');
    }

    // valida existência dos produtos + força nome do catálogo
    for (const item of order.items) {
      const product = await this.productsService.findById(item.productId).catch(() => null);
      if (!product) throw new NotFoundException(`Product not found: ${item.productId}`);

      item.productName = product.name;
    }

    // valida coerência de preço (total = soma dos itens)
    const itemsTotal = order.items.reduce(
      (acc, i) => acc + i.quantity * i.unitPrice,
      0,
    );

    const epsilon = 0.01; // tolerância p/ float
    if (Math.abs(itemsTotal - order.totalAmount) > epsilon) {
      throw new BadRequestException(
        `totalAmount mismatch: itemsTotal=${itemsTotal} totalAmount=${order.totalAmount}`,
      );
    }

    return this.repo.create(order);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findById(id: string) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByPeriod(start: Date, end: Date) {
    return this.repo.findByPeriod(start, end);
  }
}

