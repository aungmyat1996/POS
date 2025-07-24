class Product {
  final String id;
  final String name;
  final double price;
  final String category;
  final int stock;
  final String? image;

  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.category,
    required this.stock,
    this.image,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'price': price,
      'category': category,
      'stock': stock,
      'image': image,
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'],
      name: map['name'],
      price: map['price'].toDouble(),
      category: map['category'],
      stock: map['stock'],
      image: map['image'],
    );
  }
}