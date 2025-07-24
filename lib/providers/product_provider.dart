import 'package:flutter/material.dart';
import '../models/product.dart';

class ProductProvider extends ChangeNotifier {
  final List<Product> _products = [
    Product(
      id: '1',
      name: 'Coffee',
      price: 2.50,
      category: 'Beverages',
      stock: 50,
    ),
    Product(
      id: '2',
      name: 'Sandwich',
      price: 5.00,
      category: 'Food',
      stock: 30,
    ),
    Product(
      id: '3',
      name: 'Pastry',
      price: 3.25,
      category: 'Food',
      stock: 25,
    ),
    Product(
      id: '4',
      name: 'Tea',
      price: 2.00,
      category: 'Beverages',
      stock: 40,
    ),
    Product(
      id: '5',
      name: 'Burger',
      price: 8.50,
      category: 'Food',
      stock: 20,
    ),
    Product(
      id: '6',
      name: 'Soft Drink',
      price: 1.75,
      category: 'Beverages',
      stock: 60,
    ),
  ];

  List<Product> get products => _products;

  List<String> get categories {
    return _products.map((product) => product.category).toSet().toList();
  }

  List<Product> getProductsByCategory(String category) {
    return _products.where((product) => product.category == category).toList();
  }

  Product? getProductById(String id) {
    try {
      return _products.firstWhere((product) => product.id == id);
    } catch (e) {
      return null;
    }
  }

  void addProduct(Product product) {
    _products.add(product);
    notifyListeners();
  }

  void updateStock(String productId, int newStock) {
    final productIndex = _products.indexWhere((p) => p.id == productId);
    if (productIndex != -1) {
      final product = _products[productIndex];
      _products[productIndex] = Product(
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: newStock,
        image: product.image,
      );
      notifyListeners();
    }
  }
}