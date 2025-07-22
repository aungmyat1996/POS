export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Sale {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
}

export interface POSState {
  products: Product[];
  cart: CartItem[];
  sales: Sale[];
  
  // Product management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart management
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Sales
  completeSale: () => void;
  
  // Getters
  getCartTotal: () => number;
  getCartItemCount: () => number;
}