import braider1 from "@/assets/braider-1.jpg";
import braider2 from "@/assets/braider-2.jpg";
import braider3 from "@/assets/braider-3.jpg";
import braider4 from "@/assets/braider-4.jpg";
import braider5 from "@/assets/braider-5.jpg";
import braider6 from "@/assets/braider-6.jpg";
import braider7 from "@/assets/braider-7.jpg";
import braider8 from "@/assets/braider-8.jpg";
import braider9 from "@/assets/braider-9.jpg";
import braider10 from "@/assets/braider-10.jpg";
import braider11 from "@/assets/braider-11.jpg";

import braidBox from "@/assets/braid-box.jpg";
import braidNago from "@/assets/braid-nago.jpg";
import braidTwist from "@/assets/braid-twist.jpg";
import braidDread from "@/assets/braid-dread.jpg";
import braidCrochet from "@/assets/braid-crochet.jpg";
import braidFulani from "@/assets/braid-fulani.jpg";
import braidGoddess from "@/assets/braid-goddess.jpg";
import braidFeedin from "@/assets/braid-feedin.jpg";

export interface Service {
  name: string;
  description: string;
  duration: string;
  price: number;
}

export interface Braider {
  id: string;
  name: string;
  photo: string;
  specialty: string[];
  rating: number;
  reviews: number;
  neighborhood: string;
  address: string;
  priceMin: number;
  priceMax: number;
  experience: number;
  availableToday: boolean;
  atendeEm: ("domicílio" | "salão próprio" | "estúdio compartilhado")[];
  portfolio: string[];
  bio: string;
  services: Service[];
  coverPhoto: string;
  certifications: string[];
  instagram?: string;
}

const generateServices = (specialties: string[], priceMin: number): Service[] => {
  const serviceMap: Record<string, Service> = {
    "Box Braids": { name: "Box Braids", description: "Tranças box clássicas, comprimento médio a longo", duration: "4-6 horas", price: priceMin },
    "Nagô/Cornrows": { name: "Nagô/Cornrows", description: "Tranças nagô rente ao couro cabeludo", duration: "2-4 horas", price: priceMin },
    "Twist": { name: "Twist", description: "Twists dois fios com acabamento profissional", duration: "3-5 horas", price: priceMin + 20 },
    "Dreadlocks": { name: "Dreadlocks", description: "Instalação ou manutenção de dreads", duration: "4-8 horas", price: priceMin + 50 },
    "Crochet Braids": { name: "Crochet Braids", description: "Crochet com cabelo sintético ou natural", duration: "2-3 horas", price: priceMin },
    "Fulani Braids": { name: "Fulani Braids", description: "Tranças fulani com detalhes e acessórios", duration: "3-5 horas", price: priceMin + 30 },
    "Goddess Braids": { name: "Goddess Braids", description: "Goddess braids volumosas e elegantes", duration: "4-6 horas", price: priceMin + 40 },
    "Feed-in Braids": { name: "Feed-in Braids", description: "Feed-in com acabamento natural e leve", duration: "3-5 horas", price: priceMin + 10 },
  };
  return specialties.map((s) => serviceMap[s] || { name: s, description: "Serviço especializado", duration: "3-5 horas", price: priceMin });
};

export const BRAID_TYPES = [
  "Box Braids",
  "Nagô/Cornrows",
  "Twist",
  "Dreadlocks",
  "Crochet Braids",
  "Fulani Braids",
  "Goddess Braids",
  "Feed-in Braids",
] as const;

export const NEIGHBORHOODS = [
  "Pelourinho",
  "Rio Vermelho",
  "Barra",
  "Pituba",
  "Liberdade",
  "Itapuã",
  "Ondina",
  "Federação",
  "Brotas",
  "Cabula",
  "Nazaré",
  "Garcia",
] as const;

export const braiders: Braider[] = [
  {
    id: "1", name: "Aline dos Santos", photo: braider1,
    specialty: ["Box Braids", "Feed-in Braids"], rating: 4.9, reviews: 187,
    neighborhood: "Pelourinho", address: "Rua do Passo, 42 - Pelourinho, Salvador - BA",
    priceMin: 120, priceMax: 350, experience: 8, availableToday: true,
    atendeEm: ["salão próprio"], portfolio: [braidBox, braidFeedin, braidBox, braidFeedin, braidBox, braidFeedin],
    bio: "Especialista em box braids e feed-in há mais de 8 anos no coração do Pelourinho. Meu trabalho é fruto da tradição afro-baiana, trazendo técnicas ancestrais com acabamento moderno. Já atendi mais de 500 clientes e cada trança é feita com amor e dedicação.",
    services: generateServices(["Box Braids", "Feed-in Braids"], 120),
    coverPhoto: braidBox, certifications: ["Curso Avançado de Tranças Afro - SENAC BA", "Workshop Internacional de Box Braids"], instagram: "alinetrancas_ssa",
  },
  {
    id: "2", name: "Mariana Conceição", photo: braider2,
    specialty: ["Nagô/Cornrows", "Fulani Braids"], rating: 4.8, reviews: 143,
    neighborhood: "Rio Vermelho", address: "Rua da Paciência, 115 - Rio Vermelho, Salvador - BA",
    priceMin: 100, priceMax: 280, experience: 6, availableToday: false,
    atendeEm: ["salão próprio", "domicílio"], portfolio: [braidNago, braidFulani, braidNago, braidFulani, braidNago],
    bio: "Trancista apaixonada por nagô e fulani, atendendo no vibrante Rio Vermelho. Cada trança que faço carrega a história e a beleza da cultura africana.",
    services: generateServices(["Nagô/Cornrows", "Fulani Braids"], 100),
    coverPhoto: braidNago, certifications: ["Formação em Estética Afro - UFBA"], instagram: "mari.trancas",
  },
  {
    id: "3", name: "Tatiane Oliveira", photo: braider3,
    specialty: ["Goddess Braids", "Box Braids"], rating: 5.0, reviews: 231,
    neighborhood: "Barra", address: "Av. Oceânica, 780 - Barra, Salvador - BA",
    priceMin: 150, priceMax: 400, experience: 12, availableToday: true,
    atendeEm: ["salão próprio"], portfolio: [braidGoddess, braidBox, braidGoddess, braidBox, braidGoddess, braidBox],
    bio: "12 anos de experiência, premiada em concursos de beleza afro na Bahia. Meu ateliê na Barra é referência em goddess braids e box braids com acabamento premium.",
    services: generateServices(["Goddess Braids", "Box Braids"], 150),
    coverPhoto: braidGoddess, certifications: ["1º Lugar - Concurso Beleza Afro BA 2022", "Curso Master Braider - SP", "Certificação Internacional em Tranças Africanas"], instagram: "tati.goddess",
  },
  {
    id: "4", name: "Cássia Ferreira", photo: braider4,
    specialty: ["Twist", "Crochet Braids"], rating: 4.7, reviews: 98,
    neighborhood: "Pituba", address: "Rua Paraíba, 320 - Pituba, Salvador - BA",
    priceMin: 80, priceMax: 220, experience: 4, availableToday: true,
    atendeEm: ["domicílio", "estúdio compartilhado"], portfolio: [braidTwist, braidCrochet, braidTwist, braidCrochet, braidTwist],
    bio: "Especialista em twist e crochet braids com atendimento domiciliar na Pituba. Praticidade e qualidade no conforto da sua casa.",
    services: generateServices(["Twist", "Crochet Braids"], 80),
    coverPhoto: braidTwist, certifications: ["Curso de Crochet Braids - Instituto Beleza Negra"],
  },
  {
    id: "5", name: "Raquel Nascimento", photo: braider5,
    specialty: ["Dreadlocks", "Twist"], rating: 4.9, reviews: 176,
    neighborhood: "Liberdade", address: "Rua Lima e Silva, 88 - Liberdade, Salvador - BA",
    priceMin: 100, priceMax: 300, experience: 9, availableToday: false,
    atendeEm: ["salão próprio"], portfolio: [braidDread, braidTwist, braidDread, braidTwist, braidDread, braidTwist],
    bio: "Referência em dreads e twist no bairro da Liberdade, raiz da cultura afro-brasileira. Trabalho com técnicas tradicionais e modernas.",
    services: generateServices(["Dreadlocks", "Twist"], 100),
    coverPhoto: braidDread, certifications: ["Especialização em Dreadlocks - Escola Afro Arte", "Curso de Manutenção de Dreads"], instagram: "raquel.dreads",
  },
  {
    id: "6", name: "Jéssica Almeida", photo: braider6,
    specialty: ["Nagô/Cornrows", "Goddess Braids"], rating: 4.6, reviews: 72,
    neighborhood: "Itapuã", address: "Rua das Amendoeiras, 55 - Itapuã, Salvador - BA",
    priceMin: 90, priceMax: 250, experience: 5, availableToday: true,
    atendeEm: ["salão próprio", "domicílio"], portfolio: [braidNago, braidGoddess, braidNago, braidGoddess, braidNago],
    bio: "Trancista em Itapuã, unindo tradição nagô com goddess braids modernas. O som do mar e a energia de Itapuã inspiram cada trabalho.",
    services: generateServices(["Nagô/Cornrows", "Goddess Braids"], 90),
    coverPhoto: braidGoddess, certifications: ["Curso de Tranças Afro - SENAC BA"],
  },
  {
    id: "7", name: "Priscila Souza", photo: braider7,
    specialty: ["Fulani Braids", "Feed-in Braids"], rating: 4.8, reviews: 134,
    neighborhood: "Ondina", address: "Av. Adhemar de Barros, 200 - Ondina, Salvador - BA",
    priceMin: 130, priceMax: 320, experience: 7, availableToday: false,
    atendeEm: ["salão próprio"], portfolio: [braidFulani, braidFeedin, braidFulani, braidFeedin, braidFulani],
    bio: "Atendimento premium em Ondina com foco em fulani e feed-in braids. Cada detalhe importa no meu trabalho.",
    services: generateServices(["Fulani Braids", "Feed-in Braids"], 130),
    coverPhoto: braidFulani, certifications: ["Master Braider Certificate", "Workshop Fulani Style - RJ"], instagram: "pri.braids",
  },
  {
    id: "8", name: "Débora Lima", photo: braider8,
    specialty: ["Box Braids", "Crochet Braids", "Goddess Braids"], rating: 4.9, reviews: 209,
    neighborhood: "Federação", address: "Rua Caetano Moura, 145 - Federação, Salvador - BA",
    priceMin: 110, priceMax: 380, experience: 10, availableToday: true,
    atendeEm: ["salão próprio", "domicílio"], portfolio: [braidBox, braidCrochet, braidGoddess, braidBox, braidCrochet, braidGoddess],
    bio: "10 anos de arte com as mãos, especialista em múltiplos estilos de tranças. Meu salão na Federação é um espaço de acolhimento e beleza negra.",
    services: generateServices(["Box Braids", "Crochet Braids", "Goddess Braids"], 110),
    coverPhoto: braidBox, certifications: ["Curso Avançado de Tranças - SP", "Formação em Colorimetria Capilar", "Prêmio Beleza Negra 2023"], instagram: "debora.braids.ssa",
  },
  {
    id: "9", name: "Fernanda Reis", photo: braider9,
    specialty: ["Feed-in Braids", "Nagô/Cornrows"], rating: 4.7, reviews: 89,
    neighborhood: "Brotas", address: "Rua Waldemar Falcão, 310 - Brotas, Salvador - BA",
    priceMin: 80, priceMax: 200, experience: 3, availableToday: true,
    atendeEm: ["estúdio compartilhado"], portfolio: [braidFeedin, braidNago, braidFeedin, braidNago, braidFeedin],
    bio: "Jovem talento em Brotas com preços acessíveis e trabalho impecável. Acredito que beleza afro deve ser acessível a todas.",
    services: generateServices(["Feed-in Braids", "Nagô/Cornrows"], 80),
    coverPhoto: braidFeedin, certifications: ["Curso Básico de Tranças Afro"],
  },
  {
    id: "10", name: "Camila Barbosa", photo: braider10,
    specialty: ["Twist", "Dreadlocks", "Box Braids"], rating: 4.8, reviews: 156,
    neighborhood: "Cabula", address: "Rua Silveira Martins, 450 - Cabula, Salvador - BA",
    priceMin: 100, priceMax: 260, experience: 6, availableToday: false,
    atendeEm: ["salão próprio", "domicílio"], portfolio: [braidTwist, braidDread, braidBox, braidTwist, braidDread, braidBox],
    bio: "Trancista versátil no Cabula, do twist clássico ao dreadlock moderno. Cada estilo é adaptado à personalidade da cliente.",
    services: generateServices(["Twist", "Dreadlocks", "Box Braids"], 100),
    coverPhoto: braidTwist, certifications: ["Formação em Estética Capilar Afro", "Curso de Dreadlocks Profissional"], instagram: "camila.braids",
  },
  {
    id: "11", name: "Luciana Cardoso", photo: braider11,
    specialty: ["Fulani Braids", "Goddess Braids", "Crochet Braids"], rating: 5.0, reviews: 198,
    neighborhood: "Nazaré", address: "Rua do Tijolo, 78 - Nazaré, Salvador - BA",
    priceMin: 140, priceMax: 420, experience: 11, availableToday: true,
    atendeEm: ["salão próprio"], portfolio: [braidFulani, braidGoddess, braidCrochet, braidFulani, braidGoddess, braidCrochet],
    bio: "Premium braider em Nazaré, referência em estilos africanos autênticos. 11 anos dedicados à arte das tranças com excelência e respeito à ancestralidade.",
    services: generateServices(["Fulani Braids", "Goddess Braids", "Crochet Braids"], 140),
    coverPhoto: braidFulani, certifications: ["Master Braider International", "Especialização em Tranças Africanas - Lagos", "Prêmio Trancista do Ano BA 2024"], instagram: "lu.cardoso.braids",
  },
];
