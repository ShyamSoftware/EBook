# 📘 E-Book & Expense Manager

> **Empowering Small Businesses with Smart, Simple, and Secure Ledger Management.**  
> *Powered by **Shyam Software***

---

## 📱 About the Project

**E-Book & Expense Manager** (formerly *Khata*) is a professional, mobile-first, and 100% offline-capable credit/debit account management system. Designed for retail shopkeepers, wholesale dealers, and personal lending, this application provides a premium, "wow-factor" experience for tracking your business and personal finances.

Built with a commitment to privacy, the app ensures that your data stays on **your device** while providing advanced features like multi-language support and cloud-integrated backups.

---

## ✨ Key Features

- 🌍 **Multi-Language Support** - Full interface support for **English**, **Gujarati (ગુજરાતી)**, and **Hindi (हिंदी)**.
- ⚡ **PWA Ready** - Install as a native app on Android, iOS, and PC with a single click.
- 📶 **100% Offline Support** - Robust IndexedDB/LocalStorage system for working anywhere, anytime.
- 💬 **WhatsApp Ledger Sharing** - Instantly share transaction history and dues with customers via WhatsApp.
- ☁️ **Google Drive Backup** - Secure and easy backup/restore via your personal Google account.
- 📊 **Comprehensive Reports** - Detailed breakdown of "Money Due To Me" vs. "Money I Owe."
- 📥 **Export to JSON/CSV** - Your data, your choice. Export for Excel, Google Sheets, or local storage.
- 📱 **Phone Contact Sync** - Quickly import contacts from your phone to start tracking instantly.

---

## 🚀 Deployment & Installation

### Web Deployment (GitHub Pages)
This project is designed to be hosted effortlessly on **GitHub Pages** or any static web hosting service.

1. **Upload** the project files to your GitHub repository.
2. Go to **Settings > Pages**.
3. Select the `main` branch as the source and click **Save**.
4. Your application will be live at `https://ShyamSoftware.com/EBook`.

### 📲 Install as a PWA
For the best experience, install the app on your device. This allows for offline use and a native app feel.

- **Desktop (Chrome/Edge):** Click the **Install** plus icon in the address bar.
- **Android:** Open the URL in Chrome, tap the three dots (⋮), and select **Install app**.
- **iOS (iPhone/iPad):** Open the URL in Safari, tap the **Share** icon, and select **Add to Home Screen**.

---

## 📖 Feature Guide

### 1. Dashboard & Balances
- **Real-time Totals:** Instantly see your net credit and debit balances.
- **Color Coding:** 🟢 Green represents money you are owed, 🔴 Red represents money you owe.

### 2. Managing People
- **Add Person:** Create a profile with Phone, Email, and Address.
- **Search:** Instant filtering by name or number.
- **Edit/Sync:** Keep your contact list updated or sync from your mobile device.

### 3. Smart Transactions
- **Credit & Debit:** One-tap entry for money moving in or out.
- **Categorization:** Tag transactions (Retail, Service, Loan, Expense, etc.) for better reporting.
- **Status Tracking:** Mark transactions as "Settled" to keep your ledger clean.

### 4. Advanced Data Management
- **Manual Backups:** Create point-in-time snapshots of your data.
- **Restoration History:** Revert to any previous backup from your history list.
- **Google Drive Sync:** Keep your data safe across devices.

---

## � Technical Overview

### Architecture
- **Front-End:** Modern Semantic HTML5, CSS3 (with Glassmorphism), and Vanilla JavaScript.
- **Persistence:** LocalStorage/IndexedDB for offline reliability.
- **Branding:** Seamless integration of **Shyam Software** branding across the UI and documentation.

### � File Structure
```text
EBook/
├── index.html           # Main Application Shell
├── manifest.json        # PWA & Branding Configuration
├── service-worker.js    # Offline Sync & PWA Controller
├── css/
│   ├── style.css       # Core Design System
│   └── modals.css      # Interactive UI Styling
└── js/
    ├── db.js           # Database & Data Logic
    ├── ui.js           # Visual Interactions & Page Flow
    ├── app.js          # Core Application Logic
    └── i18n.js         # Multi-language Translation Engine
```

---

## �️ Privacy First

- **No Server Tracking:** We don't see your data. It's stored locally on your device.
- **Secure Backups:** Exports are handled by the browser's secure data picker.
- **Privacy Guaranteed:** Professional-grade encryption and device-only access.

---

## � Support & Branding

This project is maintained and branded by **Shyam Software**.  
Visit us at [shyamsoftware.com](https://shyamsoftware.com) for more premium software solutions.

**Built with ❤️ for Small Business Owners.**  
*Last Updated: March 1, 2026*
