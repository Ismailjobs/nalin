'use client';

import { ImageWithLoading } from '@/components/ImageWithLoading';

export function MenuItemDetailImage({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
      <ImageWithLoading
        src={imageSrc}
        alt=""
        containerClassName="absolute inset-0"
        sizes="(max-width: 768px) 100vw, 672px"
        priority
        unoptimized
      />
    </div>
  );
}
