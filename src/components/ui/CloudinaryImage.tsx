
'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Gamepad2 } from 'lucide-react';

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

/**
 * A wrapper for next/image that handles Cloudinary fallback logic.
 */
export default function CloudinaryImage({ src, fallbackSrc, alt, className, ...props }: CloudinaryImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Fallback to a Picsum placeholder or a local one if the original fails
  const handleImageError = () => {
    if (!error) {
      setError(true);
      // Use the provided fallback or a generic placeholder
      setImgSrc(fallbackSrc || `https://picsum.photos/seed/placeholder/400/400`);
    }
  };

  // If no source at all, show a "Game" icon placeholder
  if (!imgSrc) {
    return (
      <div className={`flex items-center justify-center bg-white/5 border border-white/10 ${className}`}>
        <Gamepad2 className="w-1/3 h-1/3 text-white/20" />
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Game Image"}
      className={className}
      onError={handleImageError}
    />
  );
}
