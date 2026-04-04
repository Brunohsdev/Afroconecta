import { motion } from "framer-motion";
import { Star, MapPin, Heart, Clock, Home, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Braider } from "@/data/braiders";
import { useState } from "react";
import { Link } from "react-router-dom";

const BraiderCard = ({ braider, index }: { braider: Braider; index: number }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass rounded-2xl overflow-hidden hover-levitate group"
    >
      {/* Portfolio preview strip */}
      <div className="flex h-24 overflow-hidden">
        {braider.portfolio.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Trabalho ${i + 1}`}
            className="flex-1 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ))}
      </div>

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={braider.photo}
                alt={braider.name}
                className="h-14 w-14 rounded-full object-cover gold-border"
              />
              {braider.availableToday && (
                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent border-2 border-card" />
              )}
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
                {braider.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-foreground text-sm font-semibold">{braider.rating}</span>
                <span className="text-muted-foreground text-xs">({braider.reviews})</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            aria-label="Favoritar"
          >
            <Heart className={`h-5 w-5 ${liked ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {braider.specialty.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="text-xs bg-primary/10 text-primary border-primary/20 font-medium"
            >
              {s}
            </Badge>
          ))}
          {braider.availableToday && (
            <Badge className="text-xs bg-accent/15 text-accent border-accent/20">
              <Clock className="h-3 w-3 mr-1" /> Disponível Hoje
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {braider.neighborhood}, Salvador - BA
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Scissors className="h-3.5 w-3.5 shrink-0" />
            {braider.experience} anos de experiência
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Home className="h-3.5 w-3.5 shrink-0" />
            {braider.atendeEm.join(", ")}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
          <div>
            <span className="text-xs text-muted-foreground">A partir de</span>
            <p className="text-primary font-bold text-lg leading-tight">R$ {braider.priceMin}</p>
          </div>
          <Link
            to={`/trancista/${braider.id}`}
            className="gold-gradient text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Ver Perfil
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BraiderCard;
