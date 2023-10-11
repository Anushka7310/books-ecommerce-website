# Online Bookstore Application
## Project Overview

## Features

- Browse, search, and purchase books.
- User authentication and authorization using JSON Web Tokens (JWT).
- User registration, login, and logout.
- User-friendly web interface with a responsive design.
- Display a list of books on the homepage.
- Add books to a shopping cart and proceed to checkout.
- View detailed information about a book.
- Calculate the total price during the checkout process.
## Running the Application

To run the project locally, follow these steps:

### Frontend (Client)
1. Navigate to the `client` directory: `cd client`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run start`.

### Backend (Server)
1. Navigate to the `server` directory: `cd server`.
2. Install dependencies: `npm install`.
3. Start both the frontend and backend servers concurrently: `npm run dev`.

## Setting Up Credentials

To run the application successfully, you need to set up your credentials. Create a `.env` file in the project root directory and add the following placeholders for your credentials:

```dotenv
# .env

PORT=

# MongoDB Database URI
DB_URI=""

# JWT (JSON Web Tokens) Secret Key
JWT_SECRET=

# JWT Token Expiration (e.g., 5d for 5 days)
JWT_EXPIRE=

# Cookie Expiration (e.g., 5 for 5 days)
COOKIE_EXPIRE=

# SMTP Email Service (e.g., "Gmail")
SMTP_SERVICE=""

# SMTP Email Address
SMTP_MAIL=""

# SMTP Email Password
SMTP_PASSWORD=""

# SMTP Host (e.g., "smtp.gmail.com")
SMTP_HOST=

# SMTP Port (e.g., 465)
SMTP_PORT=

```

# Postman Collection for Testing Reference
[Ecommerce.postman_collection.json](https://github.com/Anushka7310/books-ecommerce-website/files/12872281/Ecommerce.postman_collection.json)


## Access the Deployed Application


You can access the deployed version of this application by following the link below:

[**Open the Application**]()



