import { formatMoney } from "@/lib/utils";

type SummaryCardProps = {
  label: string;
  value: number;
  money?: boolean;
};

export function SummaryCard({ label, value, money }: SummaryCardProps) {
  return (
    <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-5 shadow-sm">
      <div className="text-sm text-neutral-500">{label}</div>
      <div className="text-xl font-bold text-neutral-800 mt-1">
        {money ? formatMoney(value) : value.toLocaleString("pt-BR")}
      </div>
    </div>
  );
}
