import { SearchIcon } from "@/components/ui/icons";

type DateFilterProps = {
  start: string;
  end: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onFilter: () => void;
  loading: boolean;
};

export function DateFilter({
  start,
  end,
  onStartChange,
  onEndChange,
  onFilter,
  loading,
}: DateFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Visão geral da sua loja</p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col">
          <label className="text-xs text-neutral-500 mb-1">Data Inicial</label>
          <input
            className="border border-neutral-200 rounded-md px-3 py-2 text-sm w-full min-w-[120px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
            type="date"
            value={start}
            onChange={(e) => onStartChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-neutral-500 mb-1">Data Final</label>
          <input
            className="border border-neutral-200 rounded-md px-3 py-2 text-sm w-full min-w-[120px] focus:outline-none focus:ring-2 focus:ring-neutral-300"
            type="date"
            value={end}
            onChange={(e) => onEndChange(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 bg-neutral-800 text-white rounded-md px-4 py-2.5 text-sm font-medium hover:bg-neutral-700 disabled:opacity-60 transition-colors"
          onClick={onFilter}
          disabled={loading}
        >
          <SearchIcon className="w-4 h-4" />
          {loading ? "Carregando..." : "Filtrar"}
        </button>
      </div>
    </div>
  );
}
