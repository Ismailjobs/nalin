export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'alexandra',
    quote:
      'Super Kebab! Cocktailsauce schmeckt fantastisch, gutes Brot, nette Mitarbeiter, was will man mehr! Sehr gutes Preis/Leistungsverhältnis.',
    author: 'Alexandra Rinner',
  },
  {
    id: 'lena',
    quote:
      'Sehr gutes Essen und mega freundlicher service! Leckere vegane Optionen!',
    author: 'Lena Brandl',
  },
  {
    id: 'christian',
    quote:
      'Sehr gute Wahl für Döner, aber auch die Pizza ist sehr lecker. Freundliches kompetentes Personal. Gute Preise.',
    author: 'Christian Schaefer',
  },
];
