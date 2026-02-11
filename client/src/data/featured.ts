export interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
}

/** Anasayfada "Beliebt" bölümünde gösterilecek ürünler. */
export const featuredProducts: FeaturedProduct[] = [
  { id: 'doner-tasche', name: 'Döner Tasche', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce', image: '/Döner Tasche Neu.jpeg' },
  { id: 'durum', name: 'Dürüm', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce', image: '/Dürüm - Steak.jpeg' },
  { id: 'doner-bowl', name: 'Döner Bowl', description: 'Hähnchen/Steak, Reis oder Pommes, Salat nach Wahl und Sauce', image: '/Döner Bowl Neu.jpeg' },
  { id: 'nalin-mix', name: 'Nalin Mix', description: 'Hähnchen/Steak, Pommes und Cocktailsauce', image: '/Nalin Mix.jpeg' },
  { id: 'turkische-pizza', name: 'Türkische Pizza', description: 'mit Salat nach Wahl und Sauce', image: '/Türkische Pizza.jpeg' },
  { id: 'falafel-tasche', name: 'Falafel Tasche', description: 'Hummus, Salat nach Wahl und Sauce', image: '/Falafel.jpeg' },
  { id: 'falafel-durum', name: 'Falafel Dürüm', description: 'Hummus, Salat nach Wahl und Sauce', image: '/Falafel Dürüm.jpeg' },
  { id: 'salatbowl', name: 'Salatbowl', description: 'Grüner Salat, Rotkraut, Weißkraut, Zwiebeln, Tomaten, Gurken und Sauce', image: '/Salat Bowl.jpeg' },
  { id: 'classico-burger', name: 'Classico Burger', description: 'Rinderhackfleisch, Grüner Salat, Tomaten, Zwiebeln und Cocktailsauce', image: '/Burger.jpeg' },
];
