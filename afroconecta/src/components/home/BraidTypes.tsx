import { motion } from "framer-motion";
import braidBox from "@/assets/braid-box.jpg";
import braidNago from "@/assets/braid-nago.jpg";
import braidTwist from "@/assets/braid-twist.jpg";
import braidDread from "@/assets/braid-dread.jpg";
import braidCrochet from "@/assets/braid-crochet.jpg";
import braidFulani from "@/assets/braid-fulani.jpg";
import braidGoddess from "@/assets/braid-goddess.jpg";
import braidFeedin from "@/assets/braid-feedin.jpg";

const braids = [
  { name: "Box Braids", img: braidBox },
  { name: "Nagô / Cornrows", img: braidNago },
  { name: "Twist", img: braidTwist },
  { name: "Dreadlocks", img: braidDread },
  { name: "Crochet Braids", img: braidCrochet },
  { name: "Fulani Braids", img: braidFulani },
  { name: "Goddess Braids", img: braidGoddess },
  { name: "Feed-in Braids", img: braidFeedin },
];

const BraidTypes = () => (
  <section className="py-24 px-4 bg-muted/30">
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-4xl font-bold md:text-5xl">
          Tipos de <span className="gold-text">Tranças</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Explore os estilos mais populares e encontre a trancista perfeita
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {braids.map((braid, i) => (
          <motion.div
            key={braid.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl gold-border hover-levitate">
              <img
                src={braid.img}
                alt={braid.name}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">{braid.name}</h3>
                <p className="text-sm text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver especialistas →
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BraidTypes;
