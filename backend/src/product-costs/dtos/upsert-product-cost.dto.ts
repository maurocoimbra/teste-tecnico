import { IsNumber, Min } from 'class-validator';

export class UpsertProductCostDto {
  @IsNumber()
  @Min(0)
  cost: number;
}

