# C-Form: Survey Adminstration Application

## 📋 Project Overview

C-Form is a powerful, user-friendly form builder application that allows users to create custom forms with a drag-and-drop interface, generate shareable links, and manage form submissions efficiently.

## ✨ Key Features

- **Dynamic Form Builder**
  - Drag-and-drop interface for creating forms
  - Support for multiple field types:
    - Text Input
    - Number Input
    - Checkbox
    - Dropdown
    - Radio Buttons
- **Form Customization**
  - Set field properties (label, placeholder, required status)
  - Reorder and remove form fields
  - Customize form title and description
- **Form Sharing**
  - Generate unique shareable links
  - Public form submission
- **Submission Management**
  - View form submissions
  - Export submissions to CSV
- **User Authentication**
  - User registration and login
  - Secure form and submission access

## 🛠 Technology Stack

### Frontend
- React
- Vite
- TypeScript
- Axios
- React Router
- Tailwind CSS
- Shadcn UI Components

### Backend
- Express
- TypeScript
- MySQL (Sequelize ORM)
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing

## 📦 Prerequisites

- Node.js (v18+ recommended)
- npm 
- MySQL database

## 🚀 Setup Instructions

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Wali-dev/c-form_survey_administration_application
   cd c-form/backend
   ```

2. Install dependencies
   ```bash
    npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   # Server Configuration
   PORT=8000

   # Database Configuration
   DB_HOST=localhost
   DB_USERNAME=your_mysql_username
   DB_PASSWORD =your_mysql_password
   DB_NAME=c_form_database

   # JWT Configuration
   JWT_KEY = 1221e


   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_SERVER= http://localhost:8000/api/ 
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 🔍 API Endpoints

### User Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login

### Form Management
- `POST /api/form/create` - Create a new form
- `PATCH /api/form/update/:id` - Update an existing form
- `GET /api/form/:username` - Get all forms for a user
- `DELETE /api/form/:username/:id` - Delete a specific form

### Form Responses
- `POST /api/response/create` - Submit form responses
- `GET /api/response/:formId` - Get all responses for a form
- `GET /api/response/:formId/export-csv` - Export form responses to CSV

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the ISC License. See `LICENSE` for more information.

## 📞 Contact

wallytanvir780@gmail.com
