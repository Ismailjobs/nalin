export interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: 'doner-tasche',
    name: 'Döner Tasche',
    description: 'Hühner oder Kalbfleisch, Salat nach Wahl und Sauce',
    image: '/doner-tashce.jpg',
  },
  {
    id: 'doner-box',
    name: 'Döner Box',
    description: 'Hühner oder Kalbfleisch, Reis oder Pommes, Salat nach Wahl und Sauce',
    image: '/döner_box.jpg',
  },
  {
    id: 'kebab-durum',
    name: 'Kebab Dürüm',
    description: 'Hühner oder Kalbfleisch, Salat nach Wahl und Sauce',
    image: '/durum_kebab-1.jpg',
  },
  {
    id: 'turkische-pizza',
    name: 'Türkische Pizza',
    description: 'mit Salat nach Wahl und Sauce',
    image: '/türkische_pizza.jpg',
  },
  {
    id: 'falafel-wrap',
    name: 'Falafel Wrap',
    description: 'Salat nach Wahl, Falafel, Hummus und Sauce',
    image: '/falafel_wrap.jpg',
  },
  {
    id: 'falafel-teller',
    name: 'Falafel Teller',
    description: 'Reis o. Pommes, Melanzani, Zucchini, Tomaten, Zwiebel und Paprika',
    image: '/falafel_teller.jpg',
  },
  {
    id: 'doner-teller',
    name: 'Döner Teller',
    description: 'Hühner oder Kalbfleisch, Reis oder Pommes, Salat nach Wahl und Sauce',
    image: '/döner_teller.jpg',
  },
  {
    id: 'hot-dog',
    name: 'Hot Dog',
    description: 'Cheddar',
    image: '/hot_dog.jpg',
  },
];
