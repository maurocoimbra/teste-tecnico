import type { Product, ProductCost } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import { PencilIcon } from "@/components/ui/icons";

type ProductCostsTableProps = {
  products: Product[];
  costs: ProductCost[];
  costDrafts: Record<string, string>;
  editingCostId: string | null;
  loading: boolean;
  onCostDraftChange: (productId: string, value: string) => void;
  onStartEditCost: (productId: string) => void;
  onCancelEditCost: () => void;
  onSaveCost: (productId: string) => void;
};

export function ProductCostsTable({
  products,
  costs,
  costDrafts,
  editingCostId,
  loading,
  onCostDraftChange,
  onStartEditCost,
  onCancelEditCost,
  onSaveCost,
}: ProductCostsTableProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-800">Custos de Produto</h2>
      <div className="mt-4 border border-neutral-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left font-medium text-neutral-600 py-3 px-4">Produto</th>
              <th className="text-right font-medium text-neutral-600 py-3 px-4">Custo</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td className="py-6 px-4 text-neutral-500 text-center" colSpan={3}>
                  Nenhum produto cadastrado.
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const current = costs.find((x) => x.productId === p.id)?.cost;
                const isEditing = editingCostId === p.id;
                return (
                  <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                    <td className="py-3 px-4 text-neutral-800 font-medium">{p.name}</td>
                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <input
                            className="border border-neutral-200 rounded px-2 py-1.5 text-sm w-24 text-right focus:outline-none focus:ring-1 focus:ring-neutral-300"
                            type="number"
                            min="0"
                            step="0.01"
                            value={costDrafts[p.id] ?? ""}
                            onChange={(e) => onCostDraftChange(p.id, e.target.value)}
                            autoFocus
                          />
                          <button
                            type="button"
                            className="text-neutral-600 hover:text-neutral-800 text-sm font-medium"
                            onClick={() => {
                              onSaveCost(p.id);
                              onCancelEditCost();
                            }}
                            disabled={loading}
                          >
                            Salvar
                          </button>
                          <button
                            type="button"
                            className="text-neutral-500 hover:text-neutral-700"
                            onClick={onCancelEditCost}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <span className="font-semibold text-neutral-800">
                          {current === undefined ? (
                            <span className="text-neutral-500 font-normal">—</span>
                          ) : (
                            formatMoney(current)
                          )}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {!isEditing && (
                        <button
                          type="button"
                          className="text-neutral-400 hover:text-neutral-600 p-1 inline-flex"
                          onClick={() => onStartEditCost(p.id)}
                          title="Editar custo"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
