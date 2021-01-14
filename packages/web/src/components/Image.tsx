import React from 'react';

interface Type {
  className?: string;
  src: string;
  alt?: string;
  isMobile?: boolean;
  onLoad?: () => void;
}

const Image = ({ className, alt, src, isMobile, onLoad }: Type) => (
  <picture className={className} onLoad={onLoad}>
    <source srcSet={`${src}${isMobile ? '--m' : ''}.webp`} type="image/webp" />
    <source srcSet={`${src}${isMobile ? '--m' : ''}.png`} type="image/png" />
    <img
      className="image"
      src={`${src}${isMobile ? '--m' : ''}.png`}
      alt={alt}
      width="100%"
      height="100%"
    />
  </picture>
);

export default Image;
