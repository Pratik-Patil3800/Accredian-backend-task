# ReferPage Assignment - Backend  


## 🚀 Overview  
The **ReferPage Assignment Backend** is a RESTful API built with Node.js, Express, and Prisma ORM. It handles referral submissions, stores user data, and manages course-related information using MySQL.  

---

## 📌 Features  
- **User Referral Management** – Stores referrer and referee details securely.   
- **Validation & Error Handling** – Ensures data integrity and security.  
- **API Endpoints** – Provides structured RESTful endpoints.  
- **Database Integration** – Uses Prisma ORM with MySQL for persistence.  

---

## 🛠️ Technologies Used  
- **Backend Framework**: Node.js with Express.js  
- **Database**: MySQL  
- **ORM**: Prisma  
- **Validation**: Zod 
- **API Handling**: Express Router & Middleware  
- **Environment Management**: dotenv  

---

**Set up the environment variables (`.env` file):**  
   ```env
   DATABASE_URL=
   EMAIL_PASSWORD=
   EMAIL_FROM=
   FRONTEND_URL=
   ```  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pratik-Patil3800/Accredian-backend-task.git
   ```
2. Install dependencies:
   ```bash
   npm install
   npm prisma generate
   npx prisma migrate
   ```

## Usage

  
1. Start the frontend development server:
   ```bash
   npm start
   ```

---

## 📌 API Endpoints  
### **1. Submit Referral**  
**Endpoint:** `POST /api/referrals`  
```json
{
  "referrerName": "John Doe",
  "referrerEmail": "john@example.com",
  "referrerPhone": "+1234567890",
  "refereeName": "Jane Doe",
  "refereeEmail": "jane@example.com",
  "courseId": 1
}
```  

**Response:**  
```json
{
  "message": "Referral submitted successfully",
  "referralId": 123
}
``` 
