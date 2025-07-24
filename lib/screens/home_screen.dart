import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/product_provider.dart';
import '../providers/cart_provider.dart';
import '../widgets/product_grid.dart';
import '../widgets/cart_sidebar.dart';
import '../widgets/category_tabs.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String selectedCategory = 'All';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('POS Flutter'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        elevation: 0,
      ),
      body: Row(
        children: [
          // Main content area
          Expanded(
            flex: 2,
            child: Column(
              children: [
                // Category tabs
                CategoryTabs(
                  selectedCategory: selectedCategory,
                  onCategorySelected: (category) {
                    setState(() {
                      selectedCategory = category;
                    });
                  },
                ),
                // Product grid
                Expanded(
                  child: ProductGrid(selectedCategory: selectedCategory),
                ),
              ],
            ),
          ),
          // Cart sidebar
          const SizedBox(
            width: 350,
            child: CartSidebar(),
          ),
        ],
      ),
    );
  }
}