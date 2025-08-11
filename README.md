# CrownDental - Dental Clinic Management System

CrownDental is a Node.js-based backend application designed to manage the operations of a dental clinic. It provides APIs for handling patients, appointments, billing, doctors, and medical records, ensuring secure and efficient clinic management.

---

## Features

- **Patient Management:**  
  - Add new patients with encrypted sensitive data (e.g., phone numbers).
  - Store patient details including name, address, gender, date of birth, and medical status.

- **Doctor Management:**  
  - (Structure in place for adding, updating, and retrieving doctor information.)

- **Appointment Management:**  
  - (Structure in place for managing appointments.)

- **Billing Management:**  
  - (Structure in place for billing operations.)

- **Medical Records:**  
  - (Structure in place for storing and retrieving medical records.)

- **Global Error Handling:**  
  - Centralized error handler for consistent API error responses.

- **MongoDB Integration:**  
  - Uses Mongoose for schema-based data modeling and database operations.

- **Environment Configuration:**  
  - Uses dotenv for secure environment variable management.

- **Encryption/Decryption:**  
  - Sensitive data is encrypted using AES before storage.

---

## Tech Stack

- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (MongoDB ODM)
- **dotenv** (Environment variable management)
- **crypto-js** (Encryption)
- **bcrypt** (Password hashing, for future use)

---

## Project Structure

```
├── app.js
├── package.json
├── src/
│   ├── app.controller.js
│   ├── config/
│   │   └── .env
│   ├── DB/
│   │   ├── connectionDB.js
│   │   └── models/
│   │       ├── Appointments/
│   │       ├── Billing/
│   │       ├── Doctors/
│   │       │   └── doctor.model.js
│   │       ├── Medical Records/
│   │       └── Patients/
│   │           └── patient.model.js
│   ├── middleware/
│   │   └── globalErrorHandler.js
│   ├── modules/
│   │   ├── Appointments/
│   │   │   ├── appointment.controller.js
│   │   │   └── appointment.service.js
│   │   ├── Billing/
│   │   │   ├── billing.controller.js
│   │   │   └── billing.service.js
│   │   ├── Doctors/
│   │   │   ├── doctor.controller.js
│   │   │   └── doctor.service.js
│   │   ├── Medical Records/
│   │   │   ├── medicalRecords.controller.js
│   │   │   └── medicalRecords.service.js
│   │   └── Patients/
│   │       ├── patient.controller.js
│   │       └── patient.service.js
│   └── utils/
│       ├── decrypt.js
│       ├── encrypt.js
│       └── index.js
```

---

## Setup & Initialization

### 1. Clone the Repository

```sh
git clone <repository-url>
cd CrownDental
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in `src/config/` with the following variables:

```
PORT=5000
DB_URL=mongodb://localhost:27017/crowndental
JWT_SECRET=your_secret_key
```

### 4. Start the Application

For development (with auto-reload):

```sh
npm run dev
```

For production:

```sh
npm start
```

The server will run on `http://localhost:5000` by default.

---

## API Endpoints

- **POST /patient/add**  
  Add a new patient (see [src/modules/Patients/patient.controller.js](src/modules/Patients/patient.controller.js)).

> More endpoints for doctors, appointments, billing, and medical records will be available as features are implemented.

---

## Contribution

Feel free to fork the repository and submit pull requests for new features or bug fixes.

---

## License

ISC

---

##