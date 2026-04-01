import { motion } from "framer-motion";
import { Star, MapPin, Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const trancistas = [
  { name: "Ana Silva", specialty: "Box Braids", rating: 4.9, reviews: 127, city: "São Paulo, SP", price: "R$ 150" },
  { name: "Mariana Santos", specialty: "Nagô/Cornrows", rating: 4.8, reviews: 89, city: "Rio de Janeiro, RJ", price: "R$ 120" },
  { name: "Camila Oliveira", specialty: "Goddess Braids", rating: 5.0, reviews: 203, city: "Salvador, BA", price: "R$ 180" },
  { name: "Juliana Costa", specialty: "Crochet Braids", rating: 4.7, reviews: 65, city: "Belo Horizonte, MG", price: "R$ 100" },
  { name: "Beatriz Lima", specialty: "Fulani Braids", rating: 4.9, reviews: 156, city: "Recife, PE", price: "R$ 140" },
  { name: "Fernanda Souza", specialty: "Twist", rating: 4.8, reviews: 92, city: "Brasília, DF", price: "R$ 130" },
];

const FeaturedBraiders = () => (
  <section className="py-24 px-4">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          Trancistas em <span className="gold-text">Destaque</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Profissionais verificadas e altamente avaliadas
        </p>
      </motion.div>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {trancistas.map((t) => (
            <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover-levitate h-full"
              >
                {/* Avatar placeholder */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-16 w-16 rounded-full gold-border flex items-center justify-center gold-gradient text-primary-foreground font-serif text-xl font-bold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Favoritar">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="font-serif text-xl font-semibold text-foreground">{t.name}</h3>
                <p className="text-primary text-sm font-medium">{t.specialty}</p>

                <div className="flex items-center gap-1 mt-3">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-foreground font-semibold">{t.rating}</span>
                  <span className="text-muted-foreground text-sm">({t.reviews} avaliações)</span>
                </div>

                <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {t.city}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-primary font-semibold text-lg">A partir de {t.price}</span>
                  <button className="gold-gradient text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                    Ver Perfil
                  </button>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="hidden md:flex -right-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
    </div>
  </section>
);

export default FeaturedBraiders;
