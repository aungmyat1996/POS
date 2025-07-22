import React from 'react';
import { usePOSStore } from '../store';
import { Product, Sale } from '../types';

const Reports: React.FC = () => {
  const { sales, products } = usePOSStore();

  // Calculate statistics
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = sales.length;
  const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Product sales analytics
  const productSales = sales.reduce((acc: Record<string, { product: Product; quantitySold: number; revenue: number }>, sale: Sale) => {
    sale.items.forEach(item => {
      const productId = item.product.id;
      if (!acc[productId]) {
        acc[productId] = {
          product: item.product,
          quantitySold: 0,
          revenue: 0
        };
      }
      acc[productId].quantitySold += item.quantity;
      acc[productId].revenue += item.quantity * item.product.price;
    });
    return acc;
  }, {});

  const productAnalytics = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);

  // Low stock products
  const lowStockProducts = products.filter(product => product.stock <= 5);

  // Sales by category
  const categorySales = sales.reduce((acc: Record<string, { quantity: number; revenue: number }>, sale: Sale) => {
    sale.items.forEach(item => {
      const category = item.product.category;
      if (!acc[category]) {
        acc[category] = { quantity: 0, revenue: 0 };
      }
      acc[category].quantity += item.quantity;
      acc[category].revenue += item.quantity * item.product.price;
    });
    return acc;
  }, {});

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            View sales performance and inventory insights.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white text-sm font-bold">
                  $
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">${totalRevenue.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-500 text-white text-sm font-bold">
                  #
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalSales}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-yellow-500 text-white text-sm font-bold">
                  ⌀
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Sale</dt>
                  <dd className="text-lg font-medium text-gray-900">${averageSale.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-red-500 text-white text-sm font-bold">
                  !
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Items</dt>
                  <dd className="text-lg font-medium text-gray-900">{lowStockProducts.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
          </div>
          <div className="p-6">
            {productAnalytics.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No sales data available</p>
            ) : (
              <div className="space-y-4">
                {productAnalytics.slice(0, 5).map((item, index) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-3">#{index + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-500">{item.quantitySold} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${item.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
          </div>
          <div className="p-6">
            {Object.keys(categorySales).length === 0 ? (
              <p className="text-gray-500 text-center py-4">No sales data available</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(categorySales).map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{category}</p>
                      <p className="text-sm text-gray-500">{data.quantity} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${data.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="mt-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-yellow-500 text-white text-sm font-bold">
                  !
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>The following products are running low on stock:</p>
                  <ul className="mt-2 list-disc list-inside">
                    {lowStockProducts.map((product: Product) => (
                      <li key={product.id}>
                        {product.name} - {product.stock} remaining
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;