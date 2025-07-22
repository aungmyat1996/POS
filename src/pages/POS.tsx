import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import CategoryFilter from '../components/CategoryFilter';

export default function POS() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Product Section */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
            <CategoryFilter />
          </div>
          <ProductGrid />
        </div>
        
        {/* Cart Section */}
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}