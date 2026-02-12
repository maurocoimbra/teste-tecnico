import { Injectable } from '@nestjs/common';
import { ProductCost } from '../entities/product-cost.entity';
import { ProductCostRepository } from './product-cost.repository';

@Injectable()
export class InMemoryProductCostRepository implements ProductCostRepository {
  private readonly costs = new Map<string, number>();

  async upsert(productId: string, cost: number): Promise<ProductCost> {
    this.costs.set(productId, cost);
    return { productId, cost };
  }

  async findAll(): Promise<ProductCost[]> {
    return Array.from(this.costs.entries()).map(([productId, cost]) => ({
      productId,
      cost,
    }));
  }

  async findByProductId(productId: string): Promise<ProductCost | null> {
    const cost = this.costs.get(productId);
    if (cost === undefined) return null;
    return { productId, cost };
  }

  async findByProductIds(productIds: string[]): Promise<ProductCost[]> {
    const set = new Set(productIds);
    return Array.from(this.costs.entries())
      .filter(([id]) => set.has(id))
      .map(([productId, cost]) => ({ productId, cost }));
  }
}

