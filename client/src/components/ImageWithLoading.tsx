'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

type ImageWithLoadingProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  unoptimized?: boolean;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  containerClassName?: string;
};

export function ImageWithLoading({
  src,
  alt,
  fill = true,
  className = '',
  sizes,
  unoptimized,
  priority,
  onError,
  containerClassName = 'relative aspect-[4/3] w-full overflow-hidden bg-cream',
}: ImageWithLoadingProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        unoptimized={unoptimized}
        priority={priority}
        className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center bg-cream transition-opacity duration-300 ${
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden
      >
        <Loader2 className="h-8 w-8 animate-spin text-orange" strokeWidth={2} />
      </div>
    </div>
  );
}
