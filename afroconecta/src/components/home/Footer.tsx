import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => (
  <footer className="border-t border-border bg-muted/20 pt-16 pb-8 px-4">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl font-bold">
            <span className="gold-text">Afro</span>Conecta
          </h3>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            Conectando beleza, tradição e profissionalismo. A maior plataforma de trancistas do Brasil.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="glass rounded-full p-2.5 text-muted-foreground hover:text-primary hover:gold-glow transition-all"
                aria-label="Rede social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-serif font-semibold text-foreground mb-4">Plataforma</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Como Funciona", "Para Trancistas", "Para Clientes", "Blog", "FAQ"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-serif font-semibold text-foreground mb-4">Contato</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              contato@afroconecta.com.br
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              (11) 99999-9999
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              São Paulo, Brasil
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-serif font-semibold text-foreground mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Receba novidades e tendências em tranças afro.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Seu e-mail"
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button className="gold-gradient text-primary-foreground shrink-0 hover:opacity-90">
              Enviar
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 AfroConecta. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
