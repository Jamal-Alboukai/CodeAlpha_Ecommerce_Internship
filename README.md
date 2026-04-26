Markdown# 🛒 CodeAlpha Full-Stack E-commerce Application

Welcome to my Full-Stack E-commerce application, built as part of the **CodeAlpha Internship**. This project demonstrates a complete end-to-end data pipeline, from a secure MongoDB database through an Express/Node.js API, rendered dynamically on a vanilla JavaScript and HTML/CSS frontend.

## 🌟 Key Features

* **User Authentication:** Secure login system using JSON Web Tokens (JWT) and `localStorage` for session management.
* **Dynamic Product Catalog:** Products are fetched from a MongoDB database via RESTful API endpoints and rendered dynamically in the browser.
* **Shopping Cart System:** Users can add items, update quantities, and view real-time price calculations managed via browser `localStorage`.
* **Secure Checkout Pipeline:** Protected backend routes ensure only authenticated users can place orders. Orders securely link User IDs and Product IDs in the database.
* **Responsive UI:** Clean, modern, and responsive user interface built with raw CSS (no heavy frameworks).

## 🛠️ Technology Stack

**Frontend:**
* HTML5 & CSS3
* Vanilla JavaScript (ES6+)
* Fetch API

**Backend:**
* Node.js
* Express.js
* JSON Web Token (JWT) for Authentication
* Bcrypt.js for Password Hashing
* CORS

**Database:**
* MongoDB
* Mongoose (ODM)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 2. Installation
Clone the repository to your local machine:
```bash
git clone [https://github.com/Jamal-Alboukai/CodeAlpha_Ecommerce_Internship.git](https://github.com/Jamal-Alboukai/CodeAlpha_Ecommerce_Internship.git)
3. Backend SetupNavigate to the backend directory and install the necessary dependencies:Bashcd backend
npm install
Create a .env file in the root of the backend folder and add your environment variables:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
Start the backend server:Bashnpm run dev
4. Frontend SetupBecause the frontend uses vanilla HTML/JS, no build step is required!Simply open the frontend/index.html file in your web browser, or use the VS Code "Live Server" extension for the best experience.📡 API EndpointsMethodEndpointDescriptionAccessPOST/api/usersRegister a new userPublicPOST/api/users/loginAuthenticate user & get tokenPublicGET/api/productsFetch all productsPublicPOST/api/ordersCreate a new orderPrivate (Requires JWT)👨‍💻 AuthorJamal-AlboukaiGitHub: @Jamal-AlboukaiProject completed for the CodeAlpha Internship Program.If you like this project, feel free to leave a ⭐ on the repository!
### How to push this to GitHub:
Once you have saved this file, run these three quick commands in your terminal to update your repository:

```bash
git add README.md
git commit -m "Added professional README file"
git push
