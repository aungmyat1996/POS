import { usePOSStore } from '../stores/posStore';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Order } from '../types';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, addOrder } = usePOSStore();
  
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total,
      timestamp: new Date(),
      status: 'completed'
    };
    
    addOrder(order);
    clearCart();
    alert('Order completed successfully!');
  };
  
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart</h3>
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart</h3>
      
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {item.product.name}
              </h4>
              <p className="text-sm text-gray-500">
                ${item.product.price.toFixed(2)} each
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-1 rounded-md hover:bg-gray-100 text-red-600"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-xl font-bold text-indigo-600">
            ${total.toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 font-medium"
          >
            Checkout
          </button>
          
          <button
            onClick={clearCart}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}