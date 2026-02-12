import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private readonly products = new Map<string, Product>();

  async create(product: Product): Promise<Product> {
    this.products.set(product.id, product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) ?? null;
  }

  async exists(id: string): Promise<boolean> {
    return this.products.has(id);
  }

  async update(id: string, patch: Partial<Product>): Promise<Product | null> {
    const current = this.products.get(id);
    if (!current) return null;

    const updated: Product = {
      ...current,
      ...patch,
      id: current.id, // garante que não muda o id
    };

    this.products.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

