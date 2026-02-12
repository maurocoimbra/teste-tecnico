export type Product = { id: string; name: string };

export type ProductCost = { productId: string; cost: number };

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
  createdAt: string; // ISO
};

export type DashboardSummary = {
  period: { start: string; end: string } | null;
  ordersCount: number;
  revenue: number;
  cost: number;
  profit: number;
  missingCostProductIds: string[];
};

