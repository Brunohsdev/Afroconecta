import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Heart, CalendarCheck, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Trancistas Cadastradas" },
  { icon: Heart, value: 15000, suffix: "+", label: "Clientes Satisfeitas" },
  { icon: CalendarCheck, value: 45000, suffix: "+", label: "Agendamentos Realizados" },
  { icon: MapPin, value: 180, suffix: "+", label: "Cidades Atendidas" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="gold-text text-4xl md:text-5xl font-bold font-serif">
      {count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
};

const StatsSection = () => (
  <section className="py-24 px-4">
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 gold-gradient rounded-2xl p-4 w-fit">
              <stat.icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <Counter target={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-muted-foreground font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
