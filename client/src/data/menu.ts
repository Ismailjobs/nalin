export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  allergens?: string[];
  image?: string;
  price?: string;
}

/** Public klasöründeki resimler. Reis için reis.jpg veya Reis.jpeg koyun. */
const itemImageMap: Record<string, string> = {
  'doner-tasche': '/Döner Tasche Neu.jpeg',
  durum: '/Dürüm - Steak.jpeg',
  'doner-bowl': '/Döner Bowl Neu.jpeg',
  'nalin-mix': '/Nalin Mix.jpeg',
  'turkische-pizza': '/Türkische Pizza.jpeg',
  'falafel-tasche': '/Falafel.jpeg',
  'falafel-durum': '/Falafel Dürüm.jpeg',
  'falafel-bowl': '/Falafel Bowl.jpeg',
  'salatbowl': '/Salat Bowl.jpeg',
  'classico-burger': '/Burger.jpeg',
  'cheese-burger': '/Chicken Burger.jpeg',
  reis: '/reis.jpg',
  pommes: '/Pommes.jpeg',
  'chicken-nuggets': '/Nuggets.jpeg',
  'chicken-wings': '/Chicken Wings.jpeg',
  'onion-rings': '/Onion Rings.jpeg',
};

export function getItemImage(id: string): string {
  return itemImageMap[id] ?? '/Döner Tasche Neu.jpeg';
}

export function getAllMenuItems(): MenuItem[] {
  return menuCategories.flatMap((c) => c.items);
}

export function getMenuItemById(slug: string): MenuItem | null {
  for (const category of menuCategories) {
    const item = category.items.find((i) => i.id === slug);
    if (item) return item;
  }
  return null;
}

export function getAllMenuSlugs(): string[] {
  return getAllMenuItems().map((i) => i.id);
}

export function isDrinkItem(slug: string): boolean {
  const cat = menuCategories.find((c) => c.id === 'getranke');
  return Boolean(cat?.items.some((i) => i.id === slug));
}

export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'doner',
    title: 'Döner',
    items: [
      { id: 'doner-tasche', name: 'Döner Tasche', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce', allergens: ['A', 'G', 'E', 'F', 'L', 'M'] },
      { id: 'durum', name: 'Dürüm', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce', allergens: ['A', 'G', 'E', 'F', 'L', 'M'] },
      { id: 'doner-bowl', name: 'Döner Bowl', description: 'Hähnchen/Steak, Reis oder Pommes, Salat nach Wahl und Sauce', allergens: ['A', 'G', 'E', 'F', 'L', 'M'] },
      { id: 'nalin-mix', name: 'Nalin Mix', description: 'Hähnchen/Steak, Pommes und Cocktailsauce', allergens: ['A', 'G', 'E', 'F', 'L', 'M'] },
      { id: 'turkische-pizza', name: 'Türkische Pizza', description: 'mit Salat nach Wahl und Sauce' },
    ],
  },
  {
    id: 'vegetarisch',
    title: 'Vegetarisch',
    items: [
      { id: 'falafel-tasche', name: 'Falafel Tasche', description: 'Hummus, Salat nach Wahl und Sauce', allergens: ['A', 'N'] },
      { id: 'falafel-durum', name: 'Falafel Dürüm', description: 'Hummus, Salat nach Wahl und Sauce', allergens: ['A', 'N'] },
      { id: 'falafel-bowl', name: 'Falafel Bowl', description: 'Reis oder Pommes, Hummus, Salat nach Wahl und Sauce', allergens: ['A', 'N'] },
      { id: 'salatbowl', name: 'Salatbowl', description: 'Grüner Salat, Rotkraut, Weißkraut, Zwiebeln, Tomaten, Gurken und Sauce' },
    ],
  },
  {
    id: 'burger',
    title: 'Hausgemachte Burger',
    items: [
      { id: 'classico-burger', name: 'Classico Burger', description: 'Rinderhackfleisch, Grüner Salat, Tomaten, Zwiebeln und Cocktailsauce' },
      { id: 'cheese-burger', name: 'Cheeseburger', description: 'Rinderhackfleisch, Cheddar, Grüner Salat, Tomaten und Cocktailsauce' },
    ],
  },
  {
    id: 'beilagen',
    title: 'Beilagen',
    items: [
      { id: 'reis', name: 'Reis', image: '/reis.jpg' },
      { id: 'pommes', name: 'Pommes' },
      { id: 'chicken-nuggets', name: 'Chicken Nuggets' },
      { id: 'chicken-wings', name: 'Chicken Wings' },
      { id: 'onion-rings', name: 'Onion Rings' },
    ],
  },
  {
    id: 'toppings',
    title: 'Toppings',
    items: [
      { id: 'schafkase', name: 'Schafkäse' },
      { id: 'cheddar', name: 'Cheddar' },
      { id: 'falafel-top', name: 'Falafel' },
      { id: 'jalapeno', name: 'Jalapeno' },
      { id: 'essiggurken', name: 'Essiggurken' },
      { id: 'sauce', name: 'Sauce' },
    ],
  },
  {
    id: 'getranke',
    title: 'Getränke',
    items: [
      { id: 'cola', name: 'Cola' },
      { id: 'red-bull', name: 'Red Bull' },
      { id: 'romerquelle', name: 'Römerquelle' },
      { id: 'fanta', name: 'Fanta' },
      { id: 'uludag', name: 'Uludag' },
      { id: 'eistee', name: 'Eistee' },
    ],
  },
];
