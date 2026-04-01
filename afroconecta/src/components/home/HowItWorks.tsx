import { motion } from "framer-motion";
import { Search, UserPlus, Calendar, Briefcase, TrendingUp, Clock } from "lucide-react";

const clientSteps = [
  { icon: Search, title: "Busque", desc: "Encontre trancistas por localização, estilo e avaliação." },
  { icon: UserPlus, title: "Compare", desc: "Veja portfólios, preços e avaliações de cada profissional." },
  { icon: Calendar, title: "Agende", desc: "Escolha o melhor horário e confirme seu agendamento." },
];

const proSteps = [
  { icon: Briefcase, title: "Crie seu Perfil", desc: "Monte seu portfólio profissional e mostre seu talento." },
  { icon: Clock, title: "Gerencie sua Agenda", desc: "Controle seus horários e disponibilidade com facilidade." },
  { icon: TrendingUp, title: "Expanda seu Negócio", desc: "Alcance mais clientes e aumente sua receita." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const HowItWorks = () => (
  <section className="py-24 px-4">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          Como <span className="gold-text">Funciona</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Simples, rápido e seguro para todos
        </p>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Clientes */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-primary mb-8 text-center">
            Para Clientes
          </h3>
          <div className="space-y-6">
            {clientSteps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover-levitate flex items-start gap-4"
              >
                <div className="gold-gradient rounded-xl p-3 shrink-0">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-foreground">{step.title}</h4>
                  <p className="mt-1 text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trancistas */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-primary mb-8 text-center">
            Para Trancistas
          </h3>
          <div className="space-y-6">
            {proSteps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 hover-levitate flex items-start gap-4"
              >
                <div className="gold-gradient rounded-xl p-3 shrink-0">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-semibold text-foreground">{step.title}</h4>
                  <p className="mt-1 text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
