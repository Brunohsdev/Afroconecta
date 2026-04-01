import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [hero1, hero2, hero3];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current]}
            alt="Tranças afro profissionais"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-3 text-foreground/70 hover:text-primary transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass rounded-full p-3 text-foreground/70 hover:text-primary transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-foreground/30"
            }`}
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            <span className="gold-text">Afro</span>
            <span className="text-foreground">Conecta</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Onde Beleza e Tradição Se Encontram. Conectamos você às melhores
            trancistas profissionais do Brasil.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <Button className="gold-gradient text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full gold-glow hover:opacity-90 transition-opacity">
            Encontrar Trancista
          </Button>
          <Button
            variant="outline"
            className="border-primary/50 text-primary px-8 py-6 text-lg font-semibold rounded-full hover:bg-primary/10 transition-colors"
          >
            Sou Trancista
          </Button>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 w-full max-w-2xl"
        >
          <div className="glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sua localização..."
                className="pl-10 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tipo de trança..."
                className="pl-10 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
            <Button className="gold-gradient text-primary-foreground rounded-xl px-6 font-semibold hover:opacity-90 transition-opacity">
              Buscar
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
