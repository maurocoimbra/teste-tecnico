import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';
import { PRODUCT_REPOSITORY } from './repositories/product.repository';
import type { ProductRepository } from './repositories/product.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    if (await this.repo.exists(dto.id)) {
      throw new ConflictException('Product already exists');
    }

    return this.repo.create({ id: dto.id, name: dto.name });
  }

  async findAll(): Promise<Product[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const updated = await this.repo.update(id, dto);
    if (!updated) {
        throw new NotFoundException('Product not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const ok = await this.repo.delete(id);
    if (!ok) throw new NotFoundException('Product not found');
  }
}

