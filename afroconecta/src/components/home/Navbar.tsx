import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Buscar Trancistas", href: "/buscar" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Sobre", href: "/sobre" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <a href="/" className="font-serif text-2xl font-bold">
          <span className="gold-text">Afro</span>
          <span className="text-foreground">Conecta</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline" className="border-primary/50 text-primary rounded-full hover:bg-primary/10">
            Entrar
          </Button>
          <Button className="gold-gradient text-primary-foreground rounded-full hover:opacity-90">
            Cadastrar
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-strong border-t border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 border-primary/50 text-primary rounded-full">
                  Entrar
                </Button>
                <Button className="flex-1 gold-gradient text-primary-foreground rounded-full">
                  Cadastrar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
