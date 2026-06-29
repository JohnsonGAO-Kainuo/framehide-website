import x100vi from "@content/products/x100vi-half-case.json";
import retroCameraPouch from "@content/products/retro-camera-pouch.json";
import type { Locale } from "@/i18n/routing";

export type ProductColor = {
  id: string;
  hex: string;
  image: string;
};

export type ProductVariant = {
  id: string;
  image: string;
  images?: string[];
};

export type ProductCopy = {
  title: string;
  tagline: string;
  cardFit: string;
  summary: string;
  colorNames: Record<string, string>;
  variantsLabel?: string;
  variantsTitle?: string;
  variantsBody?: string;
  variantNames?: Record<string, { title: string; body: string; meta: string }>;
  features: { title: string; body: string }[];
  specGroups: { label: string; items: [string, string][] }[];
};

export type Product = {
  slug: string;
  category: string;
  order: number;
  hero: string;
  editorial: string;
  threeColors: string;
  featuresImage: string;
  detailSheet: string;
  colors: ProductColor[];
  variants?: ProductVariant[];
  gallery: { src: string; ratio: string }[];
  i18n: Record<Locale, ProductCopy>;
};

const products = [x100vi, retroCameraPouch] as unknown as Product[];

export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.order - b.order);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductCopy(product: Product, locale: Locale): ProductCopy {
  return product.i18n[locale] ?? product.i18n.en;
}
