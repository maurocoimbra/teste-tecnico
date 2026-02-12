import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  async create(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }

  async findByPeriod(start: Date, end: Date): Promise<Order[]> {
    const s = start.getTime();
    const e = end.getTime();

    return Array.from(this.orders.values()).filter((o) => {
      const t = o.createdAt.getTime();
      return t >= s && t <= e;
    });
  }
}

