import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Check, ChevronRight, Scissors, X } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Braider, Service } from "@/data/braiders";

interface BookingModalProps {
  braider: Braider;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedService?: Service;
}

const STEPS = ["Serviço", "Data", "Horário", "Confirmação"] as const;
type Step = (typeof STEPS)[number];

// Generate fake available days (next 30 days, skip some randomly)
const generateAvailableDays = () => {
  const days: Date[] = [];
  for (let i = 1; i <= 30; i++) {
    const d = addDays(new Date(), i);
    if (d.getDay() !== 0 && Math.random() > 0.25) days.push(d);
  }
  return days;
};

const TIME_SLOTS = [
  "08:00", "09:00", "09:30", "10:00", "11:00",
  "13:00", "14:00", "14:30", "15:00", "16:00", "17:00",
];

const generateAvailableSlots = () =>
  TIME_SLOTS.filter(() => Math.random() > 0.3);

const BookingModal = ({ braider, open, onOpenChange, preselectedService }: BookingModalProps) => {
  const [step, setStep] = useState<Step>("Serviço");
  const [selectedService, setSelectedService] = useState<Service | null>(preselectedService ?? null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDays = useMemo(generateAvailableDays, []);
  const availableSlots = useMemo(generateAvailableSlots, [selectedDate]);

  const currentIdx = STEPS.indexOf(step);

  const reset = () => {
    setStep("Serviço");
    setSelectedService(preselectedService ?? null);
    setSelectedDate(undefined);
    setSelectedTime(null);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const next = () => {
    if (currentIdx < STEPS.length - 1) setStep(STEPS[currentIdx + 1]);
  };

  const prev = () => {
    if (currentIdx > 0) setStep(STEPS[currentIdx - 1]);
  };

  const isAvailableDay = (date: Date) =>
    availableDays.some((d) => isSameDay(d, date));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 bg-card border-border overflow-hidden rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Agendar com {braider.name}</DialogTitle>

        {/* Header */}
        <div className="gold-gradient px-6 py-4 flex items-center gap-3">
          <img src={braider.photo} alt={braider.name} className="h-10 w-10 rounded-full object-cover border-2 border-primary-foreground/30" />
          <div>
            <p className="font-serif font-bold text-primary-foreground">Agendar com {braider.name.split(" ")[0]}</p>
            <p className="text-primary-foreground/70 text-xs">Salvador - BA</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                    i < currentIdx
                      ? "bg-primary text-primary-foreground"
                      : i === currentIdx
                        ? "gold-gradient text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < currentIdx ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={cn("text-xs hidden sm:block", i === currentIdx ? "text-foreground font-medium" : "text-muted-foreground")}>
                  {s}
                </span>
                {i < STEPS.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 min-h-[320px]">
          <AnimatePresence mode="wait">
            {step === "Serviço" && (
              <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                <h3 className="font-serif text-lg text-foreground mb-3">Escolha o serviço</h3>
                {braider.services.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => { setSelectedService(s); next(); }}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all hover:border-primary/50",
                      selectedService?.name === s.name ? "border-primary bg-primary/10" : "border-border bg-muted/20"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground font-semibold flex items-center gap-2">
                          <Scissors className="h-3.5 w-3.5 text-primary" /> {s.name}
                        </p>
                        <p className="text-muted-foreground text-sm mt-0.5">{s.description}</p>
                        <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {s.duration}
                        </p>
                      </div>
                      <p className="text-primary font-bold text-lg shrink-0 ml-3">R$ {s.price}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === "Data" && (
              <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-lg text-foreground mb-3">Escolha a data</h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); if (d) setSelectedTime(null); }}
                    locale={ptBR}
                    disabled={(date) => date < new Date() || !isAvailableDay(date)}
                    className="p-3 pointer-events-auto"
                    classNames={{
                      day_selected: "gold-gradient text-primary-foreground hover:opacity-90",
                      day_today: "bg-muted text-foreground font-bold",
                    }}
                  />
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground justify-center">
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full gold-gradient inline-block" /> Disponível</span>
                  <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-muted inline-block" /> Indisponível</span>
                </div>
              </motion.div>
            )}

            {step === "Horário" && (
              <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-lg text-foreground mb-1">Escolha o horário</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={cn(
                        "py-3 rounded-xl text-sm font-medium transition-all border",
                        selectedTime === t
                          ? "gold-gradient text-primary-foreground border-transparent"
                          : "border-border text-foreground hover:border-primary/50 bg-muted/20"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {availableSlots.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">Nenhum horário disponível neste dia.</p>
                )}
              </motion.div>
            )}

            {step === "Confirmação" && selectedService && selectedDate && selectedTime && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-lg text-foreground mb-4">Confirmar Agendamento</h3>
                <div className="glass rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={braider.photo} alt={braider.name} className="h-12 w-12 rounded-full object-cover border-2" style={{ borderColor: "hsl(var(--gold) / 0.5)" }} />
                    <div>
                      <p className="text-foreground font-semibold">{braider.name}</p>
                      <p className="text-muted-foreground text-xs">{braider.neighborhood}, Salvador - BA</p>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-3 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Scissors className="h-3.5 w-3.5" /> Serviço</span>
                      <span className="text-foreground font-medium">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5" /> Data</span>
                      <span className="text-foreground font-medium">{format(selectedDate, "dd/MM/yyyy")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Horário</span>
                      <span className="text-foreground font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duração</span>
                      <span className="text-foreground font-medium">{selectedService.duration}</span>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-3 flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Total</span>
                    <span className="text-primary font-bold text-2xl font-serif">R$ {selectedService.price}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          {currentIdx > 0 && (
            <Button variant="outline" onClick={prev} className="rounded-full border-border flex-1">
              Voltar
            </Button>
          )}
          {step === "Data" && (
            <Button
              onClick={next}
              disabled={!selectedDate}
              className="gold-gradient text-primary-foreground rounded-full flex-1 hover:opacity-90 disabled:opacity-40"
            >
              Continuar
            </Button>
          )}
          {step === "Horário" && (
            <Button
              onClick={next}
              disabled={!selectedTime}
              className="gold-gradient text-primary-foreground rounded-full flex-1 hover:opacity-90 disabled:opacity-40"
            >
              Continuar
            </Button>
          )}
          {step === "Confirmação" && (
            <Button
              onClick={() => { handleOpenChange(false); }}
              className="gold-gradient text-primary-foreground rounded-full flex-1 h-12 text-base font-semibold hover:opacity-90 gap-2"
            >
              <Check className="h-5 w-5" /> Confirmar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
