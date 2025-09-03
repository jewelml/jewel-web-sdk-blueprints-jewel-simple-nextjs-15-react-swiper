export interface Product {
  _id?: string;
  title?: string;
  image_url?: string;
  standard_features?: {
    image_url_src?: string;
    sale_price?: number;
    price?: number;
    price_currency?: string;
    brand?: string;
    rating?: number;
    rating_count?: number;
    discount_flag?: string;
  };
}

export interface ModelResult {
  model: string;
  data: Product[] | null;
  error: string | null;
}

export interface HomePageProps {
  modelResults: ModelResult[];
  error: string | null;
  itemId: string | null;
  models: string[];
}

export interface ProductCarouselProps {
  products: Product[];
}

export interface SearchControlsProps {}

export type ModelId = 'L_prod' | 'B_prod' | 'F_prod' | 'T_prod';

export interface ModelOption {
  value: ModelId;
  label: string;
}