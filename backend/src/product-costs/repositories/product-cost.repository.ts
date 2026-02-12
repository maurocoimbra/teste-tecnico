import { ProductCost } from '../entities/product-cost.entity';

export const PRODUCT_COST_REPOSITORY = 'PRODUCT_COST_REPOSITORY' as const;

export interface ProductCostRepository {
  upsert(productId: string, cost: number): Promise<ProductCost>;
  findAll(): Promise<ProductCost[]>;
  findByProductId(productId: string): Promise<ProductCost | null>;
  findByProductIds(productIds: string[]): Promise<ProductCost[]>;
}

