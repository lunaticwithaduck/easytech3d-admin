// Mirrors the easytech3d-backend admin API responses.

export interface AdminOrderItem {
  title: string;
  variant: string;
  quantity: number;
  lineTotalCents: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  deliveryType: string; // ADDRESS | OFFICE
  officeName: string | null;
  officeCode: string | null;
  address1: string;
  postalCode: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  status: 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED' | 'FULFILLED';
  paymentMethod: 'COD' | 'CARD';
  paymentStatus: string;
  shippingMethod: string;
  itemCount: number;
  items: AdminOrderItem[];
  createdAt: string;
}

export interface AdminQuoteFile {
  id: string;
  fileName: string;
  sizeBytes: number;
}

export interface AdminQuote {
  id: string;
  quoteNumber: string;
  name: string;
  email: string;
  phone: string;
  material: string;
  color: string;
  infill: number;
  qty: number;
  fileNames: string[];
  files: AdminQuoteFile[];
  dims: string;
  totalWeightG: number;
  totalPriceCents: number;
  status: 'NEW' | 'QUOTED' | 'ACCEPTED' | 'REJECTED';
  notes: string | null;
  createdAt: string;
}

export interface AdminStats {
  revenueCents: number;
  ordersCount: number;
  quotesCount: number;
  messagesCount: number;
  subscribersCount: number;
  backInStockCount: number;
  recentOrders: AdminOrder[];
  recentQuotes: AdminQuote[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
}

export interface BackInStock {
  id: string;
  email: string;
  productHandle: string;
  variantId: string | null;
  createdAt: string;
}
