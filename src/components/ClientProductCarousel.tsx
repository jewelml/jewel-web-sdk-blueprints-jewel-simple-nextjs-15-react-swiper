'use client';

import dynamic from 'next/dynamic';
import { ProductCarouselProps } from '@/types';

const ProductCarousel = dynamic(() => import('./ProductCarousel'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Loading carousel...</div>
});

export default function ClientProductCarousel(props: ProductCarouselProps) {
  return <ProductCarousel {...props} />;
}