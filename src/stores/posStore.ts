import { create } from 'zustand';
import { Product, CartItem, Order } from '../types';

interface POSStore {
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  
  // UI State
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const usePOSStore = create<POSStore>((set) => ({
  // Initial state
  products: [
    {
      id: '1',
      name: 'Coffee',
      price: 3.50,
      category: 'Beverages',
      stock: 100
    },
    {
      id: '2',
      name: 'Sandwich',
      price: 7.99,
      category: 'Food',
      stock: 50
    },
    {
      id: '3',
      name: 'Pastry',
      price: 4.25,
      category: 'Food',
      stock: 30
    },
    {
      id: '4',
      name: 'Tea',
      price: 2.75,
      category: 'Beverages',
      stock: 80
    }
  ],
  
  cart: [],
  orders: [],
  selectedCategory: 'All',
  
  // Actions
  setProducts: (products) => set({ products }),
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, { product, quantity: 1 }]
      };
    }
  }),
  
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),
  
  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return {
        cart: state.cart.filter(item => item.product.id !== productId)
      };
    }
    return {
      cart: state.cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    };
  }),
  
  clearCart: () => set({ cart: [] }),
  
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  })),
  
  setSelectedCategory: (category) => set({ selectedCategory: category })
}));