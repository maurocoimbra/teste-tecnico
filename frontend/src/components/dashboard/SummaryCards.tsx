import type { DashboardSummary } from "@/lib/types";
import { SummaryCard } from "./SummaryCard";

type SummaryCardsProps = {
  data: DashboardSummary;
};

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard label="Lucro" value={data.profit} money />
      <SummaryCard label="Faturamento" value={data.revenue} money />
      <SummaryCard label="Custo Total" value={data.cost} money />
      <SummaryCard label="Total de Pedidos" value={data.ordersCount} />
    </div>
  );
}
