# Online Bookstore Application
## Video Walkthrough

For a detailed walkthrough of the application's functionality, you can watch the following Loom video:

[**Watch the Video Walkthrough**](https://www.loom.com/share/4529571da6c94a3fa232abfd63699191)
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

## Setting Up Credentials

To run the application successfully, you need to set up your credentials. Add the following placeholders for your credentials in config.env file in backened folder:

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

## Running the Application

To run the project locally, follow these steps:

### Frontend
1. Navigate to the `frontend` directory: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run start`.

### Backend
1. Navigate to the root directory of the project.
2. Install dependencies: `npm install`.
3. Start backend server: `npm run dev`.


# Postman Collection for Testing Reference
[Ecommerce.postman_collection.json](https://github.com/Anushka7310/books-ecommerce-website/files/12872281/Ecommerce.postman_collection.json)


## Access the Deployed Application


You can access the deployed version of this application by following the link below:

[**Open the Application**](https://book-ecommerce-application-ccdebfb62ef0.herokuapp.com/)



