// ─── Vehicle ──────────────────────────────────────────────────────────────────
export interface Vehicle {
  slug: string;
  name: string;
  brand: "Mercedes-Benz" | "Volkswagen";
  years: string;
  engines: string[];
  image: string;
  color: string;
  badge?: string;
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category {
  slug: string;
  name: string;
  icon: string;
  count?: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  slug: string;
  name: string;
  count?: number;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  name: string;
  nameUK: string;
  brand: string;
  sku: string;
  category: string;
  subcategory: string;
  vehicles: string[]; // vehicle slugs
  price: number;
  priceOld?: number;
  currency: "UAH";
  inStock: boolean;
  stockCount?: number;
  images: string[];
  description: string;
  specs: ProductSpec[];
  compatibility: CompatibilityEntry[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  deliveryDays: number;
  weight?: number;
  oem?: string[];
  tags: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CompatibilityEntry {
  vehicle: string;
  years: string;
  engines: string[];
  notes?: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  sku: string;
  brand: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

// ─── Order ───────────────────────────────────────────────────────────────────
export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  delivery: DeliveryInfo;
}

export interface DeliveryInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  method: "nova-poshta" | "ukr-poshta" | "courier" | "pickup";
}

// ─── Review ──────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  vehicle?: string;
  verified: boolean;
}

// ─── Filter State ─────────────────────────────────────────────────────────────
export interface FilterState {
  brands: string[];
  priceMin?: number;
  priceMax?: number;
  inStock: boolean;
  vehicles: string[];
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "newest" | "rating";
