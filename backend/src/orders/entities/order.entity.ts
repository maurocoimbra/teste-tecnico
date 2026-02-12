export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  buyerName: string;
  buyerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: Date;
};

