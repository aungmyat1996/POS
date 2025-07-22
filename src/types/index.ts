export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}