# POS Flutter Application

A modern Point of Sale (POS) system built with Flutter for mobile and tablet devices.

## Features

- **Product Management**: Display products with categories, prices, and stock information
- **Cart System**: Add, remove, and modify items in the shopping cart
- **Category Filtering**: Filter products by categories (Food, Beverages, etc.)
- **Checkout Process**: Complete sales with payment method selection
- **Receipt Generation**: Generate digital receipts for transactions
- **Responsive UI**: Optimized for tablet use in landscape mode

## Screenshots

The application features a clean, modern interface with:
- Product grid on the left showing items with prices and stock
- Cart sidebar on the right for order management
- Category tabs for easy product filtering
- Checkout dialog for payment processing

## Getting Started

### Prerequisites

- Flutter SDK (3.0.0 or higher)
- Android Studio or VS Code with Flutter extensions
- Android SDK for APK building

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aungmyat1996/POS.git
   cd POS
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the application:
   ```bash
   flutter run
   ```

### Building APK

To build an APK for Android devices:

1. Build debug APK:
   ```bash
   flutter build apk --debug
   ```

2. Build release APK:
   ```bash
   flutter build apk --release
   ```

The APK files will be generated in `build/app/outputs/flutter-apk/`

### Building for different architectures

Build APKs for specific architectures:

```bash
# For ARM64 devices (most modern Android devices)
flutter build apk --target-platform android-arm64

# For ARMv7 devices (older Android devices)
flutter build apk --target-platform android-arm

# For x86_64 devices (emulators and some tablets)
flutter build apk --target-platform android-x64
```

## Project Structure

```
lib/
├── main.dart                 # Application entry point
├── models/                   # Data models
│   ├── product.dart         # Product model
│   ├── cart_item.dart       # Cart item model
│   └── sale.dart            # Sale transaction model
├── providers/               # State management
│   ├── product_provider.dart # Product state management
│   └── cart_provider.dart    # Cart state management
├── screens/                 # Application screens
│   └── home_screen.dart     # Main POS screen
└── widgets/                 # Reusable UI components
    ├── product_grid.dart    # Product display grid
    ├── cart_sidebar.dart    # Shopping cart sidebar
    ├── category_tabs.dart   # Category filter tabs
    └── checkout_dialog.dart  # Checkout process dialog
```

## Dependencies

- **flutter**: UI framework
- **provider**: State management
- **shared_preferences**: Local data storage
- **intl**: Internationalization and date formatting
- **sqflite**: Local SQLite database
- **pdf**: PDF receipt generation
- **printing**: Print functionality

## Configuration

The application is configured for landscape orientation to provide optimal tablet experience. The Android manifest includes:

- Internet permission for future cloud sync features
- Landscape orientation lock
- Modern Flutter embedding (v2)

## Development

### Adding New Products

Products are currently defined in `lib/providers/product_provider.dart`. To add new products, modify the `_products` list in the `ProductProvider` class.

### Customizing UI

The application uses Material Design 3 with a blue color scheme. Colors and themes can be customized in `lib/main.dart`.

### Database Integration

The project is prepared for SQLite integration using the `sqflite` package. Database models are already defined and can be extended for persistent storage.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Myanmar Language Support

This POS system can be easily localized for Myanmar language support by:
1. Adding Myanmar fonts to the `fonts/` directory
2. Implementing localization using the `intl` package
3. Adding Myanmar currency formatting
4. Including Myanmar payment methods

## Future Enhancements

- Cloud synchronization
- Inventory management
- Sales reporting and analytics
- Multi-language support
- Barcode scanning
- Receipt printing
- Employee management
- Tax calculation customization