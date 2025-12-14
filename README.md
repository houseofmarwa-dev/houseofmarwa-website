# 🏛️ HOUSE OF MARWA — Luxury E-Commerce Platform

A high-end luxury digital experience built for couture, beauty, accessories, and digital products — crafted with premium UI/UX, mobile-app behavior, and a modern component-based front-end architecture.

House of Marwa blends **fashion-house aesthetics** with **mobile-first technology**, delivering a seamless luxury shopping experience across all devices.

---

## ✨ Features Overview

### 💎 Luxury Couture-Grade UI
- Plum–Gold–Rose premium color palette  
- Glassmorphism navigation drawer (blurred transparency)  
- Fashion-industry typography  
- Smooth animations & transitions  
- High-end hero sections  
- Cinematic product visuals  

---

## 📱 Mobile-App Experience
This UI behaves like a native iOS/Android shopping app:

- Slide-out **glass drawer** navigation  
- Touch-friendly accordion mega menu  
- Floating Cart (🛒) and Chat (💬) buttons  
- Bottom navigation bar (Home / Couture / Beauty / Cart / Profile)  
- Sticky header with scroll shadow  
- Full responsive grid system  
- Optimized for all iPhone and Android screen sizes  

---

## 🛍️ E-Commerce Capabilities
- Product rendering powered by **products.json**  
- Featured products section  
- Latest arrivals section  
- Category-wise pages:
  - Couture  
  - Beauty  
  - Accessories  
  - Digital  
- Add-to-cart functionality  
- LocalStorage-based persistent cart  
- Cart toast on Add  
- Checkout form (demo mode)  

---

## 🧩 Product Administration (Demo)
The admin dashboard includes:

- Product listing  
- Image preview  
- Category/Price display  
- LocalStorage powered cart environment  
- Ready for Firebase/Node backend upgrade  

---
houseofmarwa-website/
│
├── index.html                  # Main homepage. Includes:
│                               # - Slide-out mobile drawer
│                               # - Desktop mega menu
│                               # - Floating cart/chat buttons
│                               # - Bottom mobile nav bar
│                               # - Featured & latest products
│
├── couture.html                # Couture division landing page
├── beauty.html                 # Beauty division landing page
├── accessories.html            # Accessories & lifestyle landing
├── digital.html                # Digital products landing page
│
├── cart.html                   # Interactive cart with localStorage
├── checkout.html               # Checkout flow (UI only / demo)
├── product.html                # Individual product view (optional)
│
├── admin-login.html            # Demo login for admin area
├── admin-dashboard.html        # Displays product list, preview cards
│
├── style.css                   # Global styles + glassmorphism +
│                               # responsive layouts + animations
│
├── script.js                   # Main logic:
│                               # - Drawer open/close
│                               # - Accordion menu
│                               # - Product rendering
│                               # - Add to cart
│                               # - Cart toast animations
│                               # - Scroll shadow header
│
├── products.json               # JSON database of all products
│
└── assets/                     # Contains:
                                # - Logos
                                # - Banners
                                # - Placeholder images
                                # - Product images
                                # - Icons

---

## 🎨 UI Components Included

### **1. Glassmorphism Mobile Drawer**
- Blurred glass effect  
- Gold dividers  
- Accordion mega menu inside drawer  
- Smooth slide animation  

### **2. Desktop Mega Menu**
- 4-column layout  
- Couture, Beauty, Accessories, Digital  
- Hover-trigger animations  
- Gradient backgrounds  

### **3. Floating Buttons**
- 🛒 Cart  
- 💬 Chat / Help  

### **4. Bottom Navigation Bar**
Inspired by modern mobile apps:

- Home  
- Couture  
- Beauty  
- Cart  
- Profile  

### **5. Dynamic Product Cards**
- Image  
- Title  
- Description  
- Price  
- Add-to-cart  
- Elegant shadows + hover animations  

---

## ⚙️ Technologies Used

- **HTML5**  
- **CSS3**: Responsive grids, glassmorphism, blur filters, animations  
- **JavaScript (Vanilla)**:
  - Drawer functionality  
  - Accordion menu logic  
  - Dynamic product rendering  
  - Cart system (LocalStorage)  
- **SVG/PNG assets**  
- **JSON** for product data  

---

## 🚀 How to Run Locally

Clone the repo:

```bash
git clone https://github.com/houseofmarwa-dev/houseofmarwa-website.git
