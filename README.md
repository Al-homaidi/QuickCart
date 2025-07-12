# 🛒 QuickCart - The All-in-One E-commerce Platform

## 📋 Project Overview

**QuickCart** is a full-featured e-commerce application built with **Next.js 15** using the **App Router**, providing a comprehensive online shopping experience with complete product, order, and user management.

## 🎯 Project Goals

This project aims to build a modern, advanced e-commerce platform that includes:

- **Exceptional user experience** with a modern, user-friendly UI
- **Comprehensive management system** for products, orders, and users
- **High-level security** with advanced authentication
- **Excellent performance** with modern optimization techniques
- **Scalability** to support future growth

## 🏗️ Full Stack Architecture

### Frontend

- **Next.js 15** - Modern React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - CSS framework
- **React Hot Toast** - Interactive notifications
- **Axios** - HTTP client

### Backend

- **Next.js API Routes** - Backend APIs
- **MongoDB** - Main database
- **Mongoose** - ODM for MongoDB
- **Inngest** - Background jobs and async operations

### Authentication & Security

- **Clerk** - Advanced authentication system
- **JWT Tokens** - Secure authentication tokens
- **Role-based Access Control** - Permission control

### External Services

- **Cloudinary** - Image and file management
- **MongoDB Atlas** - Cloud database hosting

## 📁 Project Structure

```
QuickCart/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── cart/          # Cart management
│   │   ├── order/         # Order management
│   │   ├── product/       # Product management
│   │   ├── user/          # User management
│   │   └── inngest/       # Inngest jobs
│   ├── cart/              # Cart page
│   ├── product/           # Product pages
│   ├── seller/            # Seller dashboard
│   ├── my-orders/         # My orders page
│   └── add-address/       # Add address
├── components/             # Reusable React components
├── context/               # React Context for global state
├── config/                # App configuration
├── models/                # DB models
├── lib/                   # Helper libraries
├── assets/                # Images and static files
└── public/                # Public files
```

## 🔧 Technologies Used

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Optional typing support
- **Tailwind CSS** - Styling framework

### Database & ORM

- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Authentication

- **Clerk** - Advanced auth system
- **JWT** - Auth tokens

### File Management

- **Cloudinary** - Image/file storage

### Background Jobs

- **Inngest** - Background job management

### UI/UX

- **React Hot Toast** - Interactive notifications
- **Custom Components** - Reusable UI elements

## 🗄️ Database Models

### User Model

```javascript
{
  _id: String,           // Clerk user ID
  name: String,          // User name
  email: String,         // Email address
  imageUrl: String,      // Profile picture
  cartItems: Object      // Shopping cart items
}
```

### Product Model

```javascript
{
  userId: String,        // Seller ID
  name: String,          // Product name
  description: String,   // Product description
  price: Number,         // Original price
  offerPrice: Number,    // Discounted price
  image: Array,          // Product images
  category: String,      // Product category
  date: Number           // Date added
}
```

### Order Model

```javascript
{
  userId: String,        // User ID
  items: [{              // Ordered items
    product: String,     // Product ID
    quantity: Number     // Quantity
  }],
  amount: Number,        // Total amount
  address: String,       // Shipping address
  status: String,        // Order status
  date: Number           // Order date
}
```

### Address Model

```javascript
{
  userId: String,        // User ID
  fullName: String,      // Full name
  phoneNumber: String,   // Phone number
  pincode: Number,       // Postal code
  area: String,          // Area
  city: String,          // City
  state: String          // State
}
```

## 🔐 Authentication & Security

### Clerk Authentication

- **User Registration/Login**
- **Role-based Access (buyer/seller)**
- **JWT Tokens**
- **Session Management**

### Security Features

- **Protected Routes**
- **API Authentication**
- **Input Validation**
- **Error Handling**

## 🛍️ Key Features

### For Buyers

- **Browse Products**
- **Shopping Cart**
- **Address Management**
- **Order Tracking**
- **Product Ratings**

### For Sellers

- **Seller Dashboard**
- **Add Products**
- **Inventory Management**
- **Sales Reports**

## 🔄 Background Jobs (Inngest)

### User Synchronization

```javascript
// Sync Clerk users to DB
syncUserCreation - on user creation
syncUserUpdation - on user update
```

### Order Processing

```javascript
// Handle new orders
createUserOrder - create order in DB
```

## 🌐 API Routes

### Product APIs

- `GET /api/product/list` - List all products
- `POST /api/product/add` - Add new product
- `GET /api/product/seller-list` - Seller's products

### Cart APIs

- `POST /api/cart/update` - Update cart

### Order APIs

- `POST /api/order/create` - Create order
- `GET /api/order/list` - List orders

### User APIs

- `GET /api/user/data` - User info
- `GET /api/user/get-address` - User addresses
- `POST /api/user/add-address` - Add address

## 🔧 Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Inngest
INNGEST_EVENT_KEY=your_inngest_key
INNGEST_SIGNING_KEY=your_signing_key

# App Configuration
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Installation & Running

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Clerk account
- Cloudinary account

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/quickcart.git
cd quickcart
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
# Edit values in .env.local
```

4. **Run the app**

```bash
npm run dev
```

5. **Open in browser**

```
http://localhost:3000
```

## 📦 npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Lint the code
```

## 🎨 Design Features

### Responsive Design

- **Mobile First**
- **Tablet Support**
- **Desktop Optimization**

### UI Components

- **Custom Navbar**
- **Product Cards**
- **Shopping Cart**
- **Order Summary**
- **Address Management**

### Styling

- **Tailwind CSS**
- **Custom Colors**
- **Smooth Animations**
- **Loading States**

## 🔄 External Integrations

### Clerk Authentication

```javascript
// Clerk setup in layout.js
<ClerkProvider>
  <AppContextProvider>
    {children}
  </AppContextProvider>
</ClerkProvider>
```

### Cloudinary Integration

```javascript
// Upload images to Cloudinary
const result = await cloudinary.uploader.upload_stream(
  { resource_type: 'auto' },
  (error, result) => {
    if (error) reject(error);
    else resolve(result);
  }
);
```

### MongoDB Connection

```javascript
// Connect to DB
await mongoose.connect(`${process.env.MONGODB_URI}/quickcart`);
```

### Inngest Functions

```javascript
// Create background job
export const createUserOrder = inngest.createFunction(
  { id: 'create-user-order' },
  { event: 'order/created' },
  async ({ events }) => {
    // Handle order logic
  }
);
```

## 🚀 Deployment

### Vercel Deployment

```bash
# Deploy to Vercel
vercel --prod
```

### Environment Configuration

- Add environment variables in Vercel dashboard
- Configure MongoDB Atlas
- Setup Clerk
- Configure Cloudinary

### Performance Optimization

- **Image Optimization**
- **Code Splitting**
- **Caching**
- **CDN**

## 🤝 Contributing

### How to Contribute

1. Fork the repo
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Use ESLint
- Follow Next.js best practices
- Add meaningful comments
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **GitHub Issues** - For reporting bugs
- **Discord** - For discussions & support
- **Email** - For general inquiries

---

**QuickCart** - Your all-in-one e-commerce solution 🛒✨

