import { usePOSStore } from '../stores/posStore';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ProductGrid() {
  const { products, selectedCategory, addToCart } = usePOSStore();
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-4xl">
              {product.category === 'Beverages' ? '☕' : '🥪'}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Stock: {product.stock}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}