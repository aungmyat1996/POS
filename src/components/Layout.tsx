import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CubeIcon,
  ShoppingCartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { usePOSStore } from '../store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const cartItemCount = usePOSStore((state) => state.getCartItemCount());

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Products', href: '/products', icon: CubeIcon },
    { name: 'Sales', href: '/sales', icon: ShoppingCartIcon },
    { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">POS System</h1>
              </div>
              <div className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-1`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      {item.name === 'Sales' && cartItemCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;