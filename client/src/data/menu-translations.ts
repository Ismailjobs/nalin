import type { Locale } from '@/i18n/config';

export type MenuItemTranslation = { name: string; description?: string };

const menuItemsAt: Record<string, MenuItemTranslation> = {
  'doner-tasche': { name: 'Döner Tasche', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce' },
  durum: { name: 'Dürüm', description: 'Hähnchen/Steak, Salat nach Wahl und Sauce' },
  'doner-bowl': { name: 'Döner Bowl', description: 'Hähnchen/Steak, Reis oder Pommes, Salat nach Wahl und Sauce' },
  'nalin-mix': { name: 'Nalin Mix', description: 'Hähnchen/Steak, Pommes und Cocktailsauce' },
  'turkische-pizza': { name: 'Türkische Pizza', description: 'mit Salat nach Wahl und Sauce' },
  'falafel-tasche': { name: 'Falafel Tasche', description: 'Hummus, Salat nach Wahl und Sauce' },
  'falafel-durum': { name: 'Falafel Dürüm', description: 'Hummus, Salat nach Wahl und Sauce' },
  'falafel-bowl': { name: 'Falafel Bowl', description: 'Reis oder Pommes, Hummus, Salat nach Wahl und Sauce' },
  salatbowl: { name: 'Salatbowl', description: 'Grüner Salat, Rotkraut, Weißkraut, Zwiebeln, Tomaten, Gurken und Sauce' },
  'classico-burger': { name: 'Classico Burger', description: 'Rinderhackfleisch, Grüner Salat, Tomaten, Zwiebeln und Cocktailsauce' },
  'cheese-burger': { name: 'Cheeseburger', description: 'Rinderhackfleisch, Cheddar, Grüner Salat, Tomaten und Cocktailsauce' },
  reis: { name: 'Reis' },
  pommes: { name: 'Pommes' },
  'chicken-nuggets': { name: 'Chicken Nuggets' },
  'chicken-wings': { name: 'Chicken Wings' },
  'onion-rings': { name: 'Onion Rings' },
  cola: { name: 'Cola' },
  'red-bull': { name: 'Red Bull' },
  romerquelle: { name: 'Römerquelle' },
  fanta: { name: 'Fanta' },
  uludag: { name: 'Uludag' },
  eistee: { name: 'Eistee' },
};

const menuItemsEn: Record<string, MenuItemTranslation> = {
  'doner-tasche': { name: 'Döner Wrap', description: 'Chicken/steak, salad of your choice and sauce' },
  durum: { name: 'Dürüm', description: 'Chicken/steak, salad of your choice and sauce' },
  'doner-bowl': { name: 'Döner Bowl', description: 'Chicken/steak, rice or fries, salad of your choice and sauce' },
  'nalin-mix': { name: 'Nalin Mix', description: 'Chicken/steak, fries and cocktail sauce' },
  'turkische-pizza': { name: 'Turkish Pizza', description: 'with salad of your choice and sauce' },
  'falafel-tasche': { name: 'Falafel Wrap', description: 'Hummus, salad of your choice and sauce' },
  'falafel-durum': { name: 'Falafel Dürüm', description: 'Hummus, salad of your choice and sauce' },
  'falafel-bowl': { name: 'Falafel Bowl', description: 'Rice or fries, hummus, salad of your choice and sauce' },
  salatbowl: { name: 'Salad Bowl', description: 'Green salad, red cabbage, white cabbage, onions, tomatoes, cucumber and sauce' },
  'classico-burger': { name: 'Classico Burger', description: 'Beef, green salad, tomatoes, onions and cocktail sauce' },
  'cheese-burger': { name: 'Cheeseburger', description: 'Beef, cheddar, green salad, tomatoes and cocktail sauce' },
  reis: { name: 'Rice' },
  pommes: { name: 'Fries' },
  'chicken-nuggets': { name: 'Chicken Nuggets' },
  'chicken-wings': { name: 'Chicken Wings' },
  'onion-rings': { name: 'Onion Rings' },
  cola: { name: 'Cola' },
  'red-bull': { name: 'Red Bull' },
  romerquelle: { name: 'Römerquelle' },
  fanta: { name: 'Fanta' },
  uludag: { name: 'Uludag' },
  eistee: { name: 'Iced Tea' },
};

const byLocale: Record<Locale, Record<string, MenuItemTranslation>> = {
  at: menuItemsAt,
  en: menuItemsEn,
};

export function getMenuItemTranslation(
  locale: Locale,
  itemId: string
): MenuItemTranslation | undefined {
  return byLocale[locale]?.[itemId] ?? byLocale.at[itemId];
}

export const categoryTitleKeys: Record<string, 'categoryDoner' | 'categoryVegetarisch' | 'categoryBurger' | 'categoryBeilagen' | 'categoryToppings' | 'categoryGetranke'> = {
  doner: 'categoryDoner',
  vegetarisch: 'categoryVegetarisch',
  burger: 'categoryBurger',
  beilagen: 'categoryBeilagen',
  toppings: 'categoryToppings',
  getranke: 'categoryGetranke',
};
