import { usePOSStore } from '../stores/posStore';

const categories = ['All', 'Beverages', 'Food'];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = usePOSStore();
  
  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}