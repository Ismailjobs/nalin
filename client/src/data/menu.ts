export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  allergens?: string[];
  image?: string;
  price?: string;
}

/** Public klasöründeki resimlerle eşleşir; yoksa varsayılan döner görseli. */
const itemImageMap: Record<string, string> = {
  'doner-tasche': '/doner-tashce.jpg',
  'doner-box': '/döner_box.jpg',
  durum: '/durum_kebab-1.jpg',
  'doner-teller': '/döner_teller.jpg',
  'turkische-pizza': '/türkische_pizza.jpg',
  'falafel-tasche': '/falafel-tasche.jpg',
  'falafel-wrap': '/falafel_wrap.jpg',
  'falafel-box': '/falafel-box.jpg',
  'falafel-durum': '/falafel-durum.jpg',
  'falafel-teller': '/falafel_teller.jpg',
  'hot-dog': '/hot-dog.jpg',
  'hot-dog-spezial': '/hot-dog-spezial.jpg',
  'nasse-burger': '/nasse-burger.jpg',
  'classico-burger': '/classico-burger.jpg',
  'cheese-burger': '/cheese-burger.jpg',
  'ratatouille-tasche': '/ratatouille-tasche.jpg',
  'doner-salat': '/doner-salat.jpg',
  'mediterraner-salat': '/mediterraner-salat.jpg',
  'bauernsalat': '/bauernsalat.jpg',
  'reis': '/reis.jpg',
  'pommes': '/pommes.jpg',
  'linsensuppe': '/linsensuppe.jpg',
};

export function getItemImage(id: string): string {
  return itemImageMap[id] ?? '/doner-tashce.jpg';
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
      {
        id: 'doner-tasche',
        name: 'Döner Tasche',
        description: 'Chicken/Veal, Salad, Sauce',
        allergens: ['A', 'G', 'E', 'F', 'L', 'M'],
        image: '/doner-tashce.jpg',
      },
      {
        id: 'doner-box',
        name: 'Box',
        description: 'Chicken/Veal, Rice/Fries, Salad, Sauce',
        allergens: ['A', 'G', 'E', 'F', 'L', 'M'],
      },
      {
        id: 'durum',
        name: 'Dürüm',
        description: 'Chicken/Veal, Salad, Sauce',
        allergens: ['A', 'G', 'E', 'F', 'L', 'M'],
      },
      {
        id: 'doner-teller',
        name: 'Döner Teller',
        description: 'Chicken/Veal, Rice/Fries, Salad, Sauce',
        allergens: ['A', 'G', 'E', 'F', 'L', 'M'],
      },
      {
        id: 'turkische-pizza',
        name: 'Türkische Pizza',
        description: 'mit Salat nach Wahl und Sauce',
      },
    ],
  },
  {
    id: 'vegetarisch',
    title: 'Vegetarisch',
    items: [
      {
        id: 'falafel-tasche',
        name: 'Falafel Tasche',
        description: 'Salad, Falafel, Hummus, Sauce',
        image: '/falafel-tasche.jpg',
      },
      {
        id: 'falafel-wrap',
        name: 'Falafel Wrap',
        description: 'Salat nach Wahl, Falafel, Hummus und Sauce',
      },
      {
        id: 'falafel-box',
        name: 'Falafel Box',
        description: 'Fries/Rice, Salad, Falafel, Hummus, Sauce',
      },
      {
        id: 'falafel-durum',
        name: 'Falafel Dürüm',
        description: 'Salad, Falafel, Hummus, Sauce',
        allergens: ['A', 'N'],
      },
      {
        id: 'falafel-teller',
        name: 'Falafel Teller',
        description: 'Rice/Fries, Eggplant, Zucchini, Tomato, Onion, Paprika',
        allergens: ['A', 'N'],
      },
    ],
  },
  {
    id: 'burger',
    title: 'Hausgemachte Burger',
    items: [
      {
        id: 'classico-burger',
        name: 'Classico Burger',
        description: 'Tomato, Onion, Beef',
        image: '/classico-burger.jpg',
      },
      {
        id: 'cheese-burger',
        name: 'Cheese Burger',
        description: 'Cheese, Tomato, Beef',
      },
    ],
  },
  {
    id: 'ratatouille',
    title: 'Ratatouille Vegan',
    items: [
      {
        id: 'ratatouille-tasche',
        name: 'Tasche',
        description: 'Mix of Eggplant, Zucchini, Tomato, Paprika, Sauce',
        image: '/ratatouille-tasche.jpg',
      },
      {
        id: 'ratatouille-durum',
        name: 'Dürüm',
        description: 'Mix of Eggplant, Zucchini, Tomato, Paprika, Sauce',
      },
      {
        id: 'ratatouille-box',
        name: 'Box',
        description: 'Mix of Eggplant, Zucchini, Tomato, Paprika, Sauce',
      },
      {
        id: 'ratatouille-teller',
        name: 'Teller',
        description: 'Mix of Eggplant, Zucchini, Tomato, Paprika, Sauce',
      },
    ],
  },
  {
    id: 'spezialitaten',
    title: 'Spezialitäten',
    items: [
      {
        id: 'hot-dog',
        name: 'Hot Dog',
        description: 'Cheddar',
        allergens: ['A', 'C', 'E', 'F'],
        image: '/hot-dog.jpg',
      },
      {
        id: 'hot-dog-spezial',
        name: 'Hot Dog Spezial',
        description: 'Jalapeno, Roasted Onion, Cheddar',
        allergens: ['A', 'C', 'E', 'F', 'G'],
      },
      {
        id: 'nasse-burger',
        name: 'Nasse Burger',
        description: 'Beef, Tomato Sauce',
      },
    ],
  },
  {
    id: 'salate-beilagen',
    title: 'Salate und Beilagen',
    items: [
      {
        id: 'doner-salat',
        name: 'Döner Salat',
        allergens: ['A', 'G', 'E', 'F', 'L', 'M'],
      },
      {
        id: 'mediterraner-salat',
        name: 'Mediterraner Salat',
      },
      {
        id: 'bauernsalat',
        name: 'Bauernsalat',
        allergens: ['G'],
      },
      {
        id: 'reis',
        name: 'Reis',
      },
      {
        id: 'pommes',
        name: 'Pommes',
      },
      {
        id: 'linsensuppe',
        name: 'Linsensuppe',
      },
    ],
  },
  {
    id: 'toppings',
    title: 'Toppings',
    items: [
      { id: 'schafkase', name: 'Schafkäse' },
      { id: 'cheddar', name: 'Cheddar' },
      { id: 'ratatouille-top', name: 'Ratatouille' },
      { id: 'falafel-top', name: 'Falafel' },
      { id: 'jalapeno', name: 'Jalapeno' },
      { id: 'essiggurken', name: 'Essiggurken' },
      { id: 'rostzwiebel', name: 'Röstzwiebel' },
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
