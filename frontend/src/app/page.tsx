"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { DashboardSummary, Order, Product, ProductCost } from "@/lib/types";
import {
  DateFilter,
  MissingCostAlert,
  OrdersTable,
  ProductCostsTable,
  ProductsSection,
  SummaryCards,
} from "@/components/dashboard";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

export default function Home() {
  const [start, setStart] = useState("2026-02-01");
  const [end, setEnd] = useState("2026-02-12");

  const [data, setData] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [costs, setCosts] = useState<ProductCost[]>([]);

  const [showNewProduct, setShowNewProduct] = useState(false);
  const [newProductId, setNewProductId] = useState("");
  const [newProductName, setNewProductName] = useState("");

  const [nameDrafts, setNameDrafts] = useState<Record<string, string>>({});
  const [costDrafts, setCostDrafts] = useState<Record<string, string>>({});
  const [editingCostId, setEditingCostId] = useState<string | null>(null);

  async function loadAll() {
    setLoading(true);
    setError(null);

    try {
      const qs = `?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

      const [dash, ords, prods, cs] = await Promise.all([
        api.get<DashboardSummary>(`/dashboard${qs}`),
        api.get<Order[]>(`/orders${qs}`),
        api.get<Product[]>(`/products`),
        api.get<ProductCost[]>(`/product-costs`),
      ]);

      setData(dash);
      setOrders(ords);
      setProducts(prods);
      setCosts(cs);

      const nextNames: Record<string, string> = {};
      for (const p of prods) nextNames[p.id] = p.name;
      setNameDrafts(nextNames);

      const nextCosts: Record<string, string> = {};
      for (const p of prods) {
        const cost = cs.find((x) => x.productId === p.id)?.cost;
        nextCosts[p.id] = cost === undefined ? "" : String(cost);
      }
      setCostDrafts(nextCosts);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }

  async function createProduct() {
    setLoading(true);
    setError(null);
    try {
      await api.post<Product>("/products", {
        id: newProductId,
        name: newProductName,
      });
      setNewProductId("");
      setNewProductName("");
      await loadAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar produto");
    } finally {
      setLoading(false);
    }
  }

  async function updateProductName(productId: string) {
    const name = (nameDrafts[productId] ?? "").trim();
    if (!name) {
      setError("Nome não pode ser vazio");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.patch<Product>(`/products/${encodeURIComponent(productId)}`, { name });
      await loadAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao atualizar produto");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(productId: string) {
    const ok = confirm(`Deletar o produto ${productId}?`);
    if (!ok) return;
    setLoading(true);
    setError(null);
    try {
      await api.delete<{ ok: boolean }>(`/products/${encodeURIComponent(productId)}`);
      await loadAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao deletar produto");
    } finally {
      setLoading(false);
    }
  }

  async function saveCost(productId: string) {
    const raw = (costDrafts[productId] ?? "").trim();
    const cost = Number(raw);
    if (!raw || Number.isNaN(cost) || cost < 0) {
      setError("Custo inválido (use número >= 0)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.put<ProductCost>(`/product-costs/${encodeURIComponent(productId)}`, { cost });
      await loadAll();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao salvar custo");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-800">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <DateFilter
          start={start}
          end={end}
          onStartChange={setStart}
          onEndChange={setEnd}
          onFilter={loadAll}
          loading={loading}
        />

        {error && <ErrorAlert message={error} />}

        {data && <SummaryCards data={data} />}

        {data && data.missingCostProductIds?.length > 0 && (
          <MissingCostAlert productIds={data.missingCostProductIds} />
        )}

        <OrdersTable orders={orders} />

        <ProductsSection
          products={products}
          showNewProduct={showNewProduct}
          newProductId={newProductId}
          newProductName={newProductName}
          nameDrafts={nameDrafts}
          loading={loading}
          onToggleNewProduct={() => setShowNewProduct((v) => !v)}
          onNewProductIdChange={setNewProductId}
          onNewProductNameChange={setNewProductName}
          onCreateProduct={createProduct}
          onNameDraftChange={(productId, value) =>
            setNameDrafts((prev) => ({ ...prev, [productId]: value }))
          }
          onUpdateProductName={updateProductName}
          onDeleteProduct={deleteProduct}
        />

        <ProductCostsTable
          products={products}
          costs={costs}
          costDrafts={costDrafts}
          editingCostId={editingCostId}
          loading={loading}
          onCostDraftChange={(productId, value) =>
            setCostDrafts((prev) => ({ ...prev, [productId]: value }))
          }
          onStartEditCost={setEditingCostId}
          onCancelEditCost={() => setEditingCostId(null)}
          onSaveCost={saveCost}
        />
      </div>
    </main>
  );
}
