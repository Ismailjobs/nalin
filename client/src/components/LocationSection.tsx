'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Dictionary } from '@/i18n/get-dictionary';

const address = 'Wilheminenstraße 69, 1160 Wien';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export function LocationSection({ dict }: { dict: Dictionary }) {
  const t = dict.location;
  return (
    <section id="standorte" className="w-full border-t border-charcoal/10 bg-cream-bright py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-2 text-charcoal-muted">{t.subtitle}</p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border-2 border-orange bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            <MapPin size={18} />
            {t.showOnMap}
          </a>
          <p className="mt-4 text-sm text-charcoal-muted">{address}</p>
        </motion.div>
      </div>
    </section>
  );
}
