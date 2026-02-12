import { Product } from '../entities/product.entity';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  exists(id: string): Promise<boolean>;
  update(id: string, patch: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

