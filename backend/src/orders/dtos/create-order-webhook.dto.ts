import {
  IsArray,
  IsEmail,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BuyerDto {
  @IsString()
  @IsNotEmpty()
  buyerName: string;

  @IsEmail()
  buyerEmail: string;
}

class LineItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsInt()
  @Min(1)
  qty: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateOrderWebhookDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ValidateNested()
  @Type(() => BuyerDto)
  buyer: BuyerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];

  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsISO8601()
  createdAt: string;
}

