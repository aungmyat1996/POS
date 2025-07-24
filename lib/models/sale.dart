import 'cart_item.dart';

class Sale {
  final String id;
  final DateTime timestamp;
  final List<CartItem> items;
  final double subtotal;
  final double tax;
  final double total;
  final String paymentMethod;

  Sale({
    required this.id,
    required this.timestamp,
    required this.items,
    required this.subtotal,
    required this.tax,
    required this.total,
    required this.paymentMethod,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'timestamp': timestamp.millisecondsSinceEpoch,
      'items': items.map((item) => item.toMap()).toList(),
      'subtotal': subtotal,
      'tax': tax,
      'total': total,
      'paymentMethod': paymentMethod,
    };
  }

  factory Sale.fromMap(Map<String, dynamic> map) {
    return Sale(
      id: map['id'],
      timestamp: DateTime.fromMillisecondsSinceEpoch(map['timestamp']),
      items: (map['items'] as List)
          .map((item) => CartItem(
                productId: item['productId'],
                name: item['name'],
                price: item['price'].toDouble(),
                quantity: item['quantity'],
              ))
          .toList(),
      subtotal: map['subtotal'].toDouble(),
      tax: map['tax'].toDouble(),
      total: map['total'].toDouble(),
      paymentMethod: map['paymentMethod'],
    );
  }
}