type MissingCostAlertProps = {
  productIds: string[];
};

export function MissingCostAlert({ productIds }: MissingCostAlertProps) {
  if (productIds.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md text-sm">
      <span className="font-medium">Produtos sem custo cadastrado:</span>{" "}
      {productIds.join(", ")}
    </div>
  );
}
