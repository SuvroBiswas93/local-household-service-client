# 🏠 Local Household Service Booking Website (HomeHero)

**Local Household Service Booking Website** is a modern full-stack service management and booking platform built using **React**, **Tailwind CSS**, **Firebase Authentication**, and **MongoDB**.
It enables users to browse services, view details, book services, and manage bookings.
Service providers can add, update, and delete their own service listings through secure private routes protected by Firebase authentication.

---

## 🎯 Project Goals

* ✅ Build a **responsive and user-friendly** service booking system
* ✅ Implement **secure Firebase authentication** (Signup, Login, Google Sign-In)
* ✅ Implement fully functional **CRUD operations** for services and bookings
* ✅ Create private routes for sensitive pages like Add Service, My Services, My Bookings, and My Profile
* ✅ Ensure seamless SPA navigation and clean UI/UX design

---

## 🧩 Core Features & Functional Requirements

---

### 🧱 1. Layout Structure

#### 🔝 Navbar


A fully responsive, React-based navigation bar with conditional rendering, theme toggling, and smooth animations.

## Features

- **Navigation Links**
  - Public: Home, Services
  - Private (requires login): My Services, Add Service, My Bookings, Profile

- **User Section**
  - Logged in: Avatar dropdown showing Name, Email, Theme toggle, Logout button
  - Logged out: Login & Register buttons, Theme toggle

- **Responsive Design**
  - Mobile-friendly dropdown menu
  - Desktop horizontal menu

- **Theme Toggling**
  - Light/Dark mode stored in `localStorage`
  - Toggle available in both avatar dropdown and public view

- **Animations**
  - Smooth hover & tap effects using `motion` (Framer Motion)

- **Conditional Rendering**
  - Dynamic menu links based on authentication state from `AuthContext`

- **Logout Feedback**
  - Logout triggers a toast notification

## Technologies Used

- React
- Tailwind CSS + DaisyUI
- Framer Motion
- React Router
- React Toastify
- Firebase Auth (via `AuthContext`)

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

* Displays all services fetched dynamically from the backend.
* Uses Axios to retrieve service data on component mount.
* All services are rendered as individual cards using a reusable `ServiceCard` component.
* Each card typically shows:

  * Service image
  * Service title
  * Category / price
  * **View Details** button leading to the Service Details page

---

#### 🔍 Price Filtering

* Includes two input fields:

  * **Min Price**
  * **Max Price**

* A button labeled **Apply Filter** allows users to reload services based on selected price range.

* The request is sent with query parameters such as:

  ```
  /services?minPrice=VALUE&maxPrice=VALUE
  ```

* Filtered results instantly update the UI.

---

#### ⚙️ Data Fetching

* Data is fetched through:

  ```js
  axios.get(...)
  ```

* A `useCallback` hook is used to prevent unnecessary re-fetching.

* Fetching re-triggers whenever the user adjusts:

  * `minPrice`
  * `maxPrice`

---

#### ⏳ Loading State

* While waiting for data, a loader/spinner is displayed:

  ```
  border-t-4 border-blue-600 ... animate-spin
  ```

* Prevents the UI from appearing empty while fetching.

---

#### 📭 Empty Result Handling

* If no data is returned:

  ```
  No services found.
  ```

  is shown centered on the page.

---

#### 🧱 Responsive Grid Layout

* Services are displayed in a responsive card grid:

  * 1 column on mobile
  * 2 on small devices
  * 3–4 on desktop

This ensures a clean layout across all screen sizes.

---

### 🧠 Technologies Used in This Page

| Purpose           | Library                          |
| ----------------- | -------------------------------- |
| Data Fetching     | Axios                            |
| State & Lifecycle | React Hooks                      |
| UI Rendering      | Reusable `ServiceCard` component |
| Styling           | Tailwind CSS                     |

---

This design allows users to easily browse, filter, and navigate through services while maintaining smooth and modern UI behavior.


### 🔍 Service Details Page

* Displays full detailed information of a single service, including:

  * Service name
  * Image
  * Category
  * Provider name and email
  * Created by & created date
  * Price
  * Description

* The page uses **Framer Motion** for smooth entrance animations and transitions.

---

#### ⭐ Review Display

* If the service has reviews, they are shown in a clean, scrollable list.
* Each review displays:

  * Reviewer email
  * Star rating (1–5)
  * Comment (if provided)
  * Review date
* Reviews appear automatically once added from the **My Bookings** page.

---

#### 🧠 Booking Restrictions

The “Book Now” button is intelligently controlled:

* If user is **not logged in**
  → Toast message: *“Please login to book!”*

* If the logged-in user **is the owner of the service**
  → Button disabled and displays:
  `Owner (Can't Book)`

* If the user has **already booked this service**
  → Button changes to:
  `Already Booked`

This prevents duplicate or invalid bookings.

---

#### 🧾 Booking Modal (When Book Now is clicked)

The booking form opens in an animated modal using **AnimatePresence**, and contains:

* **Service ID** *(read-only)*
* **Price** *(read-only)*
* **User email** *(auto-filled from Firebase auth, not editable)*
* **Booking Date** *(required)*

---

#### 📨 On Booking Submission

* Sends a POST request to:

  ```
  /bookings
  ```

* Data stored includes:

  * `serviceId`
  * `bookingDate`
  * `price`
  * `Service name`
  * `userEmail`

* On success:

  * Toast notification: *“Booking Successful!”*
  * Modal closes
  * User is redirected to:

    ```
    /my-bookings
    ```

* On failure:

  * Displays appropriate error message via toast.

---

#### 🎨 UI & Experience

* Fully responsive design
* Uses:

  * **Framer Motion** for animated layout transitions
  * **Tailwind CSS** for modern styling
  * **React Icons / Lucide-React** for iconography

This ensures a clean and smooth user experience throughout the booking process.


### 📦 My Bookings Page (Private Route)

* Displays all bookings made by the currently authenticated user.
* If no bookings exist, the user is shown a helpful message:

  ```
  You have no bookings.
  ```
* Bookings are shown responsively in:

  * **Table layout (desktop)**
  * **Animated cards (mobile)** using Framer Motion
* Each booking record includes:

  * Service name
  * Service ID
  * Booking date
  * Price
  * Action buttons

---

#### ❌ Cancel Booking

* Clicking **Cancel Booking** opens a confirmation popup using **SweetAlert2**.
* On confirmation:

  * A DELETE request is sent to the server:

    ```
    /bookings/:id
    ```
  * If successful:

    * The booking is removed from both the database and the UI immediately.
    * A toast or alert confirms successful cancellation.

---

#### ⭐ Add Review

* Each booking includes an **Add Review** button.
* Clicking opens an animated modal using:

  * `AnimatePresence`
  * `motion` from Framer Motion

Inside the modal, users can:

* Select a rating (1–5 stars)
* Write an optional comment

On submitting:

* A POST request is sent to:

  ```
  /services/:serviceId/reviews
  ```
* The payload includes:

  * `rating`
  * `comment`
  * `userEmail` (from Firebase auth)
* A success toast is displayed.
* Modal closes automatically after submission.

---

#### 📝 Review Visibility

* Once a review is submitted:

  * It is stored inside the specific service’s `reviews` array in MongoDB.
  * The review is displayed on the **Service Details Page**, where users can see:

    * The rating
    * Comment
    * Reviewer email

This provides a fully integrated and user-friendly feedback system.

---

#### ✨ Additional Experience Details

* Smooth animation is applied to both:

  * Modal appearance/disappearance
  * Mobile card transitions
* Fully responsive layout for all screen sizes.
* Toast and alert notifications guide the user through all interactions.

---

### 🧠 Technologies Used in This Page

| Purpose                 | Library                         |
| ----------------------- | ------------------------------- |
| Authentication          | Firebase Auth + Context         |
| API Calls               | Axios                           |
| Alerts & Confirmation   | SweetAlert2                     |
| Notifications           | React Toastify                  |
| Animation & Transitions | Framer Motion / AnimatePresence |
| UI & Styling            | Tailwind CSS                    |


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

