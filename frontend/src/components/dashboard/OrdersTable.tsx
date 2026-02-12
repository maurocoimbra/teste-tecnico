import type { Order } from "@/lib/types";
import { formatDateBR, formatMoney } from "@/lib/utils";

type OrdersTableProps = {
  orders: Order[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-800">Pedidos Recentes</h2>
      <p className="text-sm text-neutral-500 mt-0.5">Últimos pedidos recebidos via webhook</p>
      <div className="mt-4 border border-neutral-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left font-medium text-neutral-600 py-3 px-4">Pedido</th>
              <th className="text-left font-medium text-neutral-600 py-3 px-4">Cliente</th>
              <th className="text-left font-medium text-neutral-600 py-3 px-4">Data</th>
              <th className="text-right font-medium text-neutral-600 py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="py-6 px-4 text-neutral-500 text-center" colSpan={4}>
                  Nenhum pedido no período.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-neutral-100 last:border-0">
                  <td className="py-3 px-4 text-neutral-600">{o.id}</td>
                  <td className="py-3 px-4 text-neutral-600">{o.buyerName}</td>
                  <td className="py-3 px-4 text-neutral-600">{formatDateBR(o.createdAt)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-neutral-800">
                    {formatMoney(o.totalAmount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
