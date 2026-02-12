import type { Product } from "@/lib/types";
import { PlusIcon } from "@/components/ui/icons";

type ProductsSectionProps = {
  products: Product[];
  showNewProduct: boolean;
  newProductId: string;
  newProductName: string;
  nameDrafts: Record<string, string>;
  loading: boolean;
  onToggleNewProduct: () => void;
  onNewProductIdChange: (value: string) => void;
  onNewProductNameChange: (value: string) => void;
  onCreateProduct: () => void;
  onNameDraftChange: (productId: string, value: string) => void;
  onUpdateProductName: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
};

export function ProductsSection({
  products,
  showNewProduct,
  newProductId,
  newProductName,
  nameDrafts,
  loading,
  onToggleNewProduct,
  onNewProductIdChange,
  onNewProductNameChange,
  onCreateProduct,
  onNameDraftChange,
  onUpdateProductName,
  onDeleteProduct,
}: ProductsSectionProps) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-bold text-neutral-800">Produtos</h2>
        <button
          className="flex items-center gap-2 bg-neutral-800 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-700 disabled:opacity-60 w-fit"
          onClick={onToggleNewProduct}
          disabled={loading}
        >
          <PlusIcon className="w-4 h-4" />
          Novo
        </button>
      </div>
      {showNewProduct && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-wrap gap-3 items-end">
          <input
            className="border border-neutral-200 rounded-md px-3 py-2 text-sm w-36"
            placeholder="ID (ex: SKU-001)"
            value={newProductId}
            onChange={(e) => onNewProductIdChange(e.target.value)}
          />
          <input
            className="border border-neutral-200 rounded-md px-3 py-2 text-sm flex-1 min-w-[180px]"
            placeholder="Nome do produto"
            value={newProductName}
            onChange={(e) => onNewProductNameChange(e.target.value)}
          />
          <button
            className="bg-neutral-800 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-neutral-700"
            onClick={onCreateProduct}
            disabled={loading}
          >
            Criar
          </button>
        </div>
      )}
      <div className="mt-4 border border-neutral-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-neutral-100">
          {products.length === 0 ? (
            <li className="py-6 px-4 text-neutral-500 text-center text-sm">
              Nenhum produto cadastrado.
            </li>
          ) : (
            products.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 py-3 px-4 hover:bg-neutral-50/50"
              >
                <span className="text-neutral-800 font-medium">
                  {(nameDrafts[p.id] ?? p.name).trim() || p.name}{" "}
                  <span className="text-neutral-500 font-normal">({p.id})</span>
                </span>
                <div className="flex items-center gap-2">
                  <input
                    className="border border-neutral-200 rounded px-2 py-1.5 text-sm w-28 hidden focus:outline-none focus:ring-1 focus:ring-neutral-300"
                    id={`name-${p.id}`}
                    value={nameDrafts[p.id] ?? ""}
                    onChange={(e) => onNameDraftChange(p.id, e.target.value)}
                  />
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700 p-1"
                    onClick={() => onUpdateProductName(p.id)}
                    disabled={loading}
                    title="Salvar nome"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="text-neutral-500 hover:text-red-600 p-1 text-sm"
                    onClick={() => onDeleteProduct(p.id)}
                    disabled={loading}
                    title="Deletar"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
