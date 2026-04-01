import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Isabela Fernandes",
    text: "Encontrei a trancista perfeita na minha região em menos de 5 minutos! O resultado ficou incrível, exatamente como eu queria.",
    rating: 5,
    service: "Box Braids",
  },
  {
    name: "Tatiana Moreira",
    text: "A plataforma mudou meu negócio. Agora tenho agenda cheia e consigo gerenciar tudo pelo celular. Recomendo demais!",
    rating: 5,
    service: "Trancista Profissional",
  },
  {
    name: "Raquel Almeida",
    text: "Adorei a facilidade de agendar e a qualidade das profissionais. Virei cliente fiel do AfroConecta!",
    rating: 5,
    service: "Nagô Cornrows",
  },
  {
    name: "Priscila Nunes",
    text: "O portfólio com fotos reais me ajudou muito a escolher. O atendimento da trancista foi impecável do início ao fim.",
    rating: 5,
    service: "Goddess Braids",
  },
];

const Testimonials = () => (
  <section className="py-24 px-4 bg-muted/30">
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          O que dizem nossas <span className="gold-text">Clientes</span>
        </h2>
      </motion.div>

      <Carousel opts={{ align: "center", loop: true }} className="w-full">
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem key={t.name} className="basis-full md:basis-1/2">
              <div className="glass rounded-2xl p-8 h-full relative">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 italic leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gold-gradient flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-primary">{t.service}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
        <CarouselNext className="hidden md:flex -right-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
      </Carousel>
    </div>
  </section>
);

export default Testimonials;
