import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Heart, Clock, Home, Scissors, Share2,
  MessageCircle, Calendar, ChevronLeft, Award, X, ChevronRight, Instagram,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import BookingModal from "@/components/booking/BookingModal";
import { braiders, type Service } from "@/data/braiders";

const BraiderProfile = () => {
  const { id } = useParams();
  const braider = braiders.find((b) => b.id === id);
  const [liked, setLiked] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<Service | undefined>();

  const openBooking = useCallback((service?: Service) => {
    setPreselectedService(service);
    setBookingOpen(true);
  }, []);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(() => {
    if (braider && lightboxIndex !== null)
      setLightboxIndex((lightboxIndex + 1) % braider.portfolio.length);
  }, [braider, lightboxIndex]);
  const prevImage = useCallback(() => {
    if (braider && lightboxIndex !== null)
      setLightboxIndex((lightboxIndex - 1 + braider.portfolio.length) % braider.portfolio.length);
  }, [braider, lightboxIndex]);

  if (!braider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="font-serif text-2xl text-foreground">Trancista não encontrada</p>
          <Link to="/buscar" className="text-primary hover:underline mt-4 inline-block">
            ← Voltar à busca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={braider.coverPhoto}
          alt="Capa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <Link
          to="/buscar"
          className="absolute top-20 left-4 glass rounded-full px-4 py-2 text-sm text-foreground flex items-center gap-1.5 hover:bg-card/70 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Link>
      </div>

      <main className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="-mt-16 relative z-10"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-5">
              {/* Photo */}
              <div className="relative shrink-0">
                <img
                  src={braider.photo}
                  alt={braider.name}
                  className="h-28 w-28 md:h-32 md:w-32 rounded-full object-cover border-4 border-background gold-glow"
                  style={{ borderColor: "hsl(var(--gold) / 0.5)" }}
                />
                {braider.availableToday && (
                  <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-accent border-3 border-background" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {braider.name}
                </h1>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-foreground font-bold text-lg">{braider.rating}</span>
                    <span className="text-muted-foreground text-sm">({braider.reviews} avaliações)</span>
                  </div>
                  <span className="text-border">•</span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {braider.neighborhood}, Salvador - BA
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {braider.specialty.map((s) => (
                    <Badge key={s} className="gold-gradient text-primary-foreground text-xs font-semibold border-0">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border"
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full border-border">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full border-border gap-2">
                  <MessageCircle className="h-4 w-4" /> Mensagem
                </Button>
                <Button onClick={() => openBooking()} className="gold-gradient text-primary-foreground rounded-full gap-2 hover:opacity-90">
                  <Calendar className="h-4 w-4" /> Agendar
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - About + Services */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Sobre Mim</h2>
                <p className="text-muted-foreground leading-relaxed">{braider.bio}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/30 rounded-xl p-3 text-center">
                    <Scissors className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-foreground font-bold">{braider.experience} anos</p>
                    <p className="text-muted-foreground text-xs">Experiência</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-3 text-center">
                    <Star className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-foreground font-bold">{braider.reviews}</p>
                    <p className="text-muted-foreground text-xs">Avaliações</p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-3 text-center">
                    <Home className="h-5 w-5 text-primary mx-auto mb-1" />
                    <p className="text-foreground font-bold text-sm">{braider.atendeEm[0]}</p>
                    <p className="text-muted-foreground text-xs">Local</p>
                  </div>
                </div>

                {braider.certifications.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-border/40">
                    <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-primary" /> Certificações
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {braider.certifications.map((c) => (
                        <Badge key={c} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          {c}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>

              {/* Services & Prices */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-5">Serviços e Preços</h2>
                <div className="space-y-3">
                  {braider.services.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground font-semibold">{s.name}</h3>
                        <p className="text-muted-foreground text-sm mt-0.5">{s.description}</p>
                        <span className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" /> {s.duration}
                        </span>
                      </div>
                      <div className="text-right ml-4 shrink-0">
                        <p className="text-primary font-bold text-lg">R$ {s.price}</p>
                        <Button
                          size="sm"
                          onClick={() => openBooking(s)}
                          className="gold-gradient text-primary-foreground rounded-full text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-90"
                        >
                          Agendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Portfolio Gallery */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-serif text-xl font-semibold text-foreground mb-5">Portfólio</h2>
                <div className="columns-2 md:columns-3 gap-3 space-y-3">
                  {braider.portfolio.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => openLightbox(i)}
                    >
                      <img
                        src={img}
                        alt={`Trabalho ${i + 1}`}
                        className="w-full object-cover hover:brightness-110 transition-all duration-300"
                        style={{ height: i % 3 === 0 ? "220px" : i % 3 === 1 ? "280px" : "200px" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Booking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-2xl p-6 sticky top-24"
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Agendar Horário</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Escolha um serviço e agende diretamente com {braider.name.split(" ")[0]}.
                </p>
                <div className="text-center mb-4">
                  <span className="text-xs text-muted-foreground">A partir de</span>
                  <p className="text-primary font-bold text-3xl font-serif">R$ {braider.priceMin}</p>
                </div>
                <Button onClick={() => openBooking()} className="w-full gold-gradient text-primary-foreground rounded-full h-12 text-base font-semibold hover:opacity-90 gap-2">
                  <Calendar className="h-5 w-5" /> Agendar Agora
                </Button>

                {braider.availableToday && (
                  <p className="text-accent text-sm text-center mt-3 flex items-center justify-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    Disponível hoje
                  </p>
                )}

                {/* Location */}
                <div className="mt-5 pt-5 border-t border-border/40">
                  <h4 className="text-sm font-medium text-foreground mb-2">Localização</h4>
                  <p className="text-muted-foreground text-sm flex items-start gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    {braider.address}
                  </p>
                </div>

                {/* Atende em */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Atende em</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {braider.atendeEm.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs border-border capitalize">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>

                {braider.instagram && (
                  <div className="mt-4 pt-4 border-t border-border/40">
                    <a
                      href={`https://instagram.com/${braider.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center gap-1.5 hover:underline"
                    >
                      <Instagram className="h-4 w-4" /> @{braider.instagram}
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={braider.portfolio[lightboxIndex]}
              alt={`Trabalho ${lightboxIndex + 1}`}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <p className="absolute bottom-6 text-muted-foreground text-sm">
              {lightboxIndex + 1} / {braider.portfolio.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal braider={braider} open={bookingOpen} onOpenChange={setBookingOpen} preselectedService={preselectedService} />

      <Footer />
    </div>
  );
};

export default BraiderProfile;
