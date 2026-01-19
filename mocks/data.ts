export interface Product {
  nombre: string;
  categoria: string;
  beneficios: string;
  variantes: string;
  imagen_url: string;
  enlace_ml: string;
  descripcion: string;
}

export interface Ritual {
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_url: string;
  productos_relacionados: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    nombre: "Aceite Esencial de Lavanda",
    categoria: "Aceites Esenciales",
    beneficios: "relajación,sueño,calma",
    variantes: "10ml,30ml,100ml",
    imagen_url: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=2070&auto=format&fit=crop",
    enlace_ml: "https://mercadolibre.com.mx",
    descripcion: "Aceite 100% puro, ideal para difusores y masajes relajantes. Extraído de campos de lavanda orgánica."
  },
  {
    nombre: "Aceite Vegetal de Argán",
    categoria: "Aceites Vegetales",
    beneficios: "hidratación,cabello,piel",
    variantes: "30ml,100ml",
    imagen_url: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=2670&auto=format&fit=crop",
    enlace_ml: "https://mercadolibre.com.mx",
    descripcion: "Rico en vitamina E, revitaliza piel y cabello. Conocido como el oro líquido de Marruecos."
  },
  {
    nombre: "Aceite de Romero",
    categoria: "Aceites Esenciales",
    beneficios: "concentración,memoria,cabello",
    variantes: "10ml,30ml",
    imagen_url: "https://images.unsplash.com/photo-1615485925763-867862f854be?q=80&w=2574&auto=format&fit=crop",
    enlace_ml: "https://mercadolibre.com.mx",
    descripcion: "Estimulante natural. Mejora la concentración y fortalece el cabello desde la raíz."
  },
   {
    nombre: "Aceite de Jojoba",
    categoria: "Aceites Vegetales",
    beneficios: "equilibrio,piel grasa,acné",
    variantes: "50ml,100ml",
    imagen_url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=2535&auto=format&fit=crop",
    enlace_ml: "https://mercadolibre.com.mx",
    descripcion: "Cera líquida similar al sebo humano. Equilibra pieles grasas y mixtas sin obstruir poros."
  }
];

export const MOCK_RITUALS: Ritual[] = [
  {
    titulo: "Ritual Matutino",
    resumen: "Comienza tu día en calma y con intención.",
    contenido: "Respira profundamente con 3 gotas de aceite de menta en tus manos. Inhala y exhala 5 veces antes de revisar tu celular. Agradece por un nuevo día.",
    imagen_url: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2670&auto=format&fit=crop",
    productos_relacionados: "Aceite de Romero"
  },
  {
    titulo: "Noche Serena",
    resumen: "Prepara tu mente y cuerpo para un descanso profundo.",
    contenido: "Aplica aceite de lavanda en tus sienes y muñecas. Enciende tu difusor 30 minutos antes de dormir. Deja que el aroma inunde la habitación.",
    imagen_url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
    productos_relacionados: "Aceite Esencial de Lavanda"
  }
];
