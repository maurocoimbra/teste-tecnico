import { Order } from '../entities/order.entity';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY' as const;

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByPeriod(start: Date, end: Date): Promise<Order[]>;
}

