import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { POSState, Product, CartItem, Sale } from './types';

// Sample initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Coffee',
    price: 3.50,
    stock: 50,
    category: 'Beverage',
    description: 'Fresh brewed coffee'
  },
  {
    id: '2',
    name: 'Sandwich',
    price: 8.99,
    stock: 25,
    category: 'Food',
    description: 'Ham and cheese sandwich'
  },
  {
    id: '3',
    name: 'Soda',
    price: 2.50,
    stock: 100,
    category: 'Beverage',
    description: 'Carbonated soft drink'
  },
  {
    id: '4',
    name: 'Pastry',
    price: 4.75,
    stock: 20,
    category: 'Food',
    description: 'Fresh baked pastry'
  }
];

export const usePOSStore = create<POSState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      cart: [],
      sales: [],

      // Product management
      addProduct: (productData: Omit<Product, 'id'>) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString()
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
      },

      updateProduct: (id: string, updates: Partial<Product>) => {
        set((state) => ({
          products: state.products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        }));
      },

      deleteProduct: (id: string) => {
        set((state) => ({
          products: state.products.filter(product => product.id !== id),
          cart: state.cart.filter(item => item.product.id !== id)
        }));
      },

      // Cart management
      addToCart: (product: Product, quantity: number) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              cart: [...state.cart, { product, quantity }]
            };
          }
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          cart: state.cart.filter(item => item.product.id !== productId)
        }));
      },

      updateCartQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set((state) => ({
          cart: state.cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Sales
      completeSale: () => {
        const { cart, products } = get();
        if (cart.length === 0) return;

        const sale: Sale = {
          id: Date.now().toString(),
          date: new Date(),
          items: [...cart],
          total: get().getCartTotal()
        };

        // Update product stock
        const updatedProducts = products.map((product: Product) => {
          const cartItem = cart.find((item: CartItem) => item.product.id === product.id);
          if (cartItem) {
            return {
              ...product,
              stock: product.stock - cartItem.quantity
            };
          }
          return product;
        });

        set((state) => ({
          sales: [...state.sales, sale],
          cart: [],
          products: updatedProducts
        }));
      },

      // Getters
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
      },

      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count: number, item: CartItem) => count + item.quantity, 0);
      },
    }),
    {
      name: 'pos-storage'
    }
  )
);