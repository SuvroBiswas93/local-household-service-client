# 🏠 Local Household Service Booking Website

**Local Household Service Booking Website** is a modern full-stack service management and booking platform built using **React**, **Tailwind CSS**, **Firebase Authentication**, and **MongoDB**.
It enables users to browse services, view details, book services, and manage bookings.
Service providers can add, update, and delete their own service listings through secure private routes protected by Firebase authentication.

---

## 🎯 Project Goals

* ✅ Build a **responsive and user-friendly** service booking system
* ✅ Implement **secure Firebase authentication** (Signup, Login, Google Sign-In)
* ✅ Implement fully functional **CRUD operations** for services and bookings
* ✅ Create private routes for sensitive pages like Add Service, My Services, My Bookings, and Profile
* ✅ Ensure seamless SPA navigation and clean UI/UX design

---

## 🧩 Core Features & Functional Requirements

---

### 🧱 1. Layout Structure

#### 🔝 Navbar

* **Navigation Links:**

  * Home
  * Services
  * My Services *(Private)*
  * Add Service *(Private)*
  * My Bookings *(Private)*
  * Profile *(Private)*
* **Conditional Rendering:**

  * **Logged In:** Shows user info + logout option
  * **Logged Out:** Shows Login and Register buttons
* Fully responsive, available on all pages
* Smooth route transitions and protected navigation

---

#### 📎 Footer

* Includes:

  * Quick links
  * Social media icons
  * Contact information
  * `© 2025 Local Household Service Booking. All rights reserved.`
* Shown consistently across the entire system

---

### 🏠 Home Page

#### 🎡 Hero Slider

* Beautiful hero section with at least **3 slides**
* Each slide includes:

  * Service image
  * Headline
  * Description
  * Explore button → redirects to Services page
* Fully responsive and visually engaging

---

#### 💼 Featured Services Section

* Displays **six services fetched dynamically** from the database
* Fully animated using Framer Motion or equivalent animation tools

---

#### 📌 Additional Static Sections

Includes two custom sections of student choice such as:

* **Why Choose Us**
* **Customer Testimonials**

Clean and responsive design throughout.

---

### 🔐 Authentication System (Firebase)

---

## 🔑 Login Page

* Fields:

  * Email
  * Password
* Includes:

  * Google Sign-In
* Shows toast notifications for:

  * Invalid credentials
  * Successful login
* On success:

  * Redirects user to Home or intended route

---

## 📝 Signup Page

* Fields:

  * Name
  * Email
  * Photo URL
  * Password
* Password validation:

  * Minimum 6 characters
  * Must include uppercase and lowercase
* Includes:

  * Google Sign-In
* Shows toast responses for success/error
* Redirects to Home after successful registration

⚡ **Note:** Email verification was skipped to ensure a smoother evaluation experience.

---

## 👤 My Profile Page

* Shows:

  * Name
  * Email
  * Profile Image
  * Last login time
* Includes:

  * Update profile option (update name and picture)
* Changes apply instantly without page reload
* Responsive and user-friendly interface

---

## 🧑‍🔧 For Service Providers

---

### ➕ Add Service (Private Route)

Form fields include:

* Service Name
* Category
* Price
* Description
* Image URL
* Provider Name
* Provider Email

On submission:

* Data stored in MongoDB referencing provider email

---

### 📂 My Services Page (Private Route)

* Displays **only the logged-in provider’s services**
* Shown in clean table layout
* Includes:

  * **Edit Service**
  * **Delete Service**
* Validation and feedback via toast

---

### ✏️ Update Service

* Services can be edited via PATCH/PUT
* Allows updating any field as needed

---

### ❌ Delete Service

* Providers may delete their own service listings
* Removal reflected immediately in UI and database

---

## 🧑‍💻 For Customers

---

### 📑 Services Page

* Displays all services in cards
* Each includes:

  * Image
  * Title
  * Key information
  * **View Details** button

---

### 🔍 Service Details Page

* Displays complete service info
* Includes:

  * **Book Now** button
* Clicking opens booking modal with:

  * User email *(read-only from auth)*
  * Booking date
  * Price
  * Service ID
* On success:

  * Booking stored in database

---

### 📦 My Bookings Page (Private Route)

* Shows all bookings made by the authenticated user
* Displayed in table format
* Includes:

  * **Cancel Booking** button
* Deleting removes the booking from database and UI

---

## 🗄️ Database Structure

### 📚 Collections

* **services** — Stores service listings
* **bookings** — Stores user bookings

### 🔗 Relationships

* `bookings.userEmail` → Firebase user email
* `bookings.serviceId` → `_id` from services collection

---

## ⚙️ System Requirements

* Loading spinners shown during database fetch
* Custom 404 “Not Found” page with **Back to Home** button
* Notifications handled using Toast or SweetAlert2

---

## 🧰 Technologies Used

| Category               | Technologies                 |
| ---------------------- | ---------------------------- |
| **Frontend Framework** | React (v19)                  |
| **Styling**            | Tailwind CSS, DaisyUI        |
| **Animations**         | Framer Motion / Motion       |
| **Routing**            | React Router (v7)            |
| **Authentication**     | Firebase                     |
| **Database**           | MongoDB                      |
| **HTTP Requests**      | Axios                        |
| **Notifications**      | React Toastify / SweetAlert2 |
| **Slider**             | Swiper                       |
| **Build Tool**         | Vite                         |
| **Linting**            | ESLint                       |

---

## ⚡ Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/SuvroBiswas93/local-household-service-client.git
```

2️⃣ **Navigate to the project directory**

```bash
cd local-household-service-client
```

3️⃣ **Install dependencies**

```bash
npm install
```

4️⃣ **Configure Firebase environment variables**
Create and fill `.env`:

```env
VITE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_APP_ID=YOUR_FIREBASE_APP_ID
```

5️⃣ **Run development server**

```bash
npm run dev
```

6️⃣ **Open in browser**

```
http://localhost:5173
```

---

### 👨‍💻 Developer

Developed by: **Suvro Biswas**

Building modern, scalable, and user-centered web applications.

---

### 🏷️ License

© 2025 Local Household Service Booking. All rights reserved.
Open-source and free for educational & portfolio use.

