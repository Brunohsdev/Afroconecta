import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, Star, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BRAID_TYPES, NEIGHBORHOODS } from "@/data/braiders";

export interface Filters {
  search: string;
  neighborhood: string;
  braidTypes: string[];
  priceRange: [number, number];
  minRating: number;
  availableToday: boolean;
  atendeEm: string[];
  sortBy: string;
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
}

const SearchFilters = ({ filters, onChange, resultCount }: Props) => {
  const [showFilters, setShowFilters] = useState(false);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleBraidType = (type: string) => {
    const next = filters.braidTypes.includes(type)
      ? filters.braidTypes.filter((t) => t !== type)
      : [...filters.braidTypes, type];
    set("braidTypes", next);
  };

  const toggleAtendeEm = (place: string) => {
    const next = filters.atendeEm.includes(place)
      ? filters.atendeEm.filter((p) => p !== place)
      : [...filters.atendeEm, place];
    set("atendeEm", next);
  };

  const activeCount =
    (filters.neighborhood ? 1 : 0) +
    filters.braidTypes.length +
    (filters.priceRange[0] > 50 || filters.priceRange[1] < 500 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.availableToday ? 1 : 0) +
    filters.atendeEm.length;

  const clearAll = () =>
    onChange({
      search: filters.search,
      neighborhood: "",
      braidTypes: [],
      priceRange: [50, 500],
      minRating: 0,
      availableToday: false,
      atendeEm: [],
      sortBy: "relevancia",
    });

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou especialidade..."
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="pl-10 bg-card border-border rounded-full h-12"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="rounded-full h-12 px-5 border-border gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeCount > 0 && (
            <span className="gold-gradient text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass rounded-2xl p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold text-foreground">Filtros</h3>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-sm text-primary hover:underline">
                Limpar tudo
              </button>
            )}
          </div>

          {/* Neighborhood */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <MapPin className="inline h-3.5 w-3.5 mr-1" />
              Bairro
            </label>
            <Select value={filters.neighborhood} onValueChange={(v) => set("neighborhood", v === "all" ? "" : v)}>
              <SelectTrigger className="bg-card border-border rounded-xl">
                <SelectValue placeholder="Todos os bairros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os bairros</SelectItem>
                {NEIGHBORHOODS.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Braid types */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Tipo de Trança</label>
            <div className="flex flex-wrap gap-2">
              {BRAID_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleBraidType(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filters.braidTypes.includes(type)
                      ? "gold-gradient text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Faixa de Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
            </label>
            <Slider
              min={50}
              max={500}
              step={10}
              value={filters.priceRange}
              onValueChange={(v) => set("priceRange", v as [number, number])}
              className="py-2"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Avaliação Mínima</label>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => set("minRating", r)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filters.minRating === r
                      ? "gold-gradient text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {r === 0 ? "Todas" : <><Star className="h-3 w-3 fill-current" /> {r}+</>}
                </button>
              ))}
            </div>
          </div>

          {/* Atende em */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Atende em</label>
            <div className="flex flex-wrap gap-3">
              {["salão próprio", "domicílio", "estúdio compartilhado"].map((place) => (
                <label key={place} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.atendeEm.includes(place)}
                    onCheckedChange={() => toggleAtendeEm(place)}
                  />
                  <span className="text-sm text-foreground capitalize">{place}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Available today */}
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={filters.availableToday}
              onCheckedChange={(c) => set("availableToday", !!c)}
            />
            <span className="text-sm text-foreground">Disponível hoje</span>
          </label>
        </motion.div>
      )}

      {/* Sort & count bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-semibold">{resultCount}</span> trancistas encontradas em Salvador, BA
        </p>
        <Select value={filters.sortBy} onValueChange={(v) => set("sortBy", v)}>
          <SelectTrigger className="w-[180px] bg-card border-border rounded-xl text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevancia">Relevância</SelectItem>
            <SelectItem value="avaliacao">Melhor Avaliadas</SelectItem>
            <SelectItem value="menor-preco">Menor Preço</SelectItem>
            <SelectItem value="maior-preco">Maior Preço</SelectItem>
            <SelectItem value="experiencia">Mais Experientes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
