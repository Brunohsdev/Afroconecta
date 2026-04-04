import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import SearchFilters, { type Filters } from "@/components/search/SearchFilters";
import BraiderCard from "@/components/search/BraiderCard";
import { braiders } from "@/data/braiders";

const defaultFilters: Filters = {
  search: "",
  neighborhood: "",
  braidTypes: [],
  priceRange: [50, 500],
  minRating: 0,
  availableToday: false,
  atendeEm: [],
  sortBy: "relevancia",
};

const Search = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const results = useMemo(() => {
    let list = braiders.filter((b) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!b.name.toLowerCase().includes(q) && !b.specialty.some((s) => s.toLowerCase().includes(q)))
          return false;
      }
      if (filters.neighborhood && b.neighborhood !== filters.neighborhood) return false;
      if (filters.braidTypes.length && !filters.braidTypes.some((t) => b.specialty.includes(t))) return false;
      if (b.priceMin > filters.priceRange[1] || b.priceMax < filters.priceRange[0]) return false;
      if (filters.minRating && b.rating < filters.minRating) return false;
      if (filters.availableToday && !b.availableToday) return false;
      if (filters.atendeEm.length && !filters.atendeEm.some((a) => b.atendeEm.includes(a as any))) return false;
      return true;
    });

    switch (filters.sortBy) {
      case "avaliacao":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "menor-preco":
        list.sort((a, b) => a.priceMin - b.priceMin);
        break;
      case "maior-preco":
        list.sort((a, b) => b.priceMax - a.priceMax);
        break;
      case "experiencia":
        list.sort((a, b) => b.experience - a.experience);
        break;
    }

    return list;
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Trancistas em <span className="gold-text">Salvador, BA</span>
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Encontre a trancista perfeita no seu bairro
            </p>
          </motion.div>

          {/* Filters */}
          <SearchFilters filters={filters} onChange={setFilters} resultCount={results.length} />

          {/* Results grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {results.map((b, i) => (
                <BraiderCard key={b.id} braider={b} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-foreground">Nenhuma trancista encontrada</p>
              <p className="text-muted-foreground mt-2">Tente ajustar os filtros para ver mais resultados.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
