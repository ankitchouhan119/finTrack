# FinTrack 

FinTrack is a finance tracking web application that allows users to manage their income and expenses efficiently. It provides features such as adding money, tracking expenses, and importing/exporting transaction data in CSV format. The app also includes user authentication, data persistence with Firebase, and a clean, responsive UI with Ant Design.

## 🔗 Live Deployments & Repositories

### 🌐 Live Deployments

You can access the live application here:

🔗 **[FinTrack Live Vercel](https://fin-track-lovat.vercel.app/)**

🔗 **[FinTrack Live AWS](http://13.233.55.243:30000/)**

**Test Credentials**

You can use the following credentials to log in and explore the application:

- **Email**: `test@gmail.com`
- **Password**: `123456`


### 📦 Source Code Repositories

🔗 **[Frontend Repository](https://github.com/ankitchouhan119/finTrack)**

🔗 **[Backend Repository](https://github.com/ankitchouhan119/finTrack-backend)**

🔗 **[Kubernetes (K8s) Repository](https://github.com/ankitchouhan119/finTrack-k8s)**




## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

**Key Features:**

1. **Add Money & Expenses:** Easily track your income and expenses.

2. **CSV Import/Export:** Export transactions as CSV files and import them back into the system.

3. **User Authentication:** Secure login with Firebase Authentication.

4. **Responsive UI:** Built with Ant Design for a modern and responsive user interface.

5. **Data Storage:** Transactions are stored securely in Firebase Firestore.

6. **State Management:** Seamless state management across the app with React's context API.
   
7. **Update Profile:** User can update profile after SignUp.



## Prerequisites

List all the required dependencies and tools that need to be installed on the system. For example:

- Reactjs
- Node.js 
- npm or yarn 
- Firebase
- Express.js

## Getting Started

Instructions for setting up the project on a local machine.

### Installation

Step-by-step instructions on how to install the project locally.

1. Clone the repository:
   ```bash
   https://github.com/ankitchouhan119/finTrack.git
   cd finTrack
2. Install the required dependencies:
   ```bash
   npm install

### Configuration

Step-by-step instructions on how to congifure the project locally.

1. Make an .env file and config with your own variables and key:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_API_KEY= your-api-key
   REACT_APP_AUTH_DOMAIN= your-auth-domain
   REACT_APP_PROJECT_ID= your-project-id
   REACT_APP_STORAGE_BUCKET= your-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID= your-sender-id
   REACT_APP_APP_ID= your-app-id
   REACT_APP_MEASUREMENT_ID= your-MEASUREMENT_ID

2. Start the website:
   ```bash
   npm start
   
The app will be available at http://localhost:3000.

## Technologies

**Major Technologies Used**

1. **ReactJS:** Frontend framework for building a dynamic user interface.
2. **Ant Design:** A UI components library for building modern, responsive layouts.
3. **Firebase:** Backend-as-a-Service used for authentication and Firestore database management.
4. **Node.js & Express.js:** Server-side runtime and framework for building RESTful APIs and backend logic
5. **Papa Parse:** Library for CSV parsing to handle transaction imports and exports.
6. **Docker:** Containerization platform used to package and run applications consistently across environments.
5. **Kubernetes:** Container orchestration platform for deploying and managing frontend services.
5. **AWS (EC2):** Cloud infrastructure used to host Kubernetes (k3s) and application services.
5. **Vercel:** Platform for hosting and deploying the React frontend (CI/CD enabled).
5. **Render:** Platform for deploying and hosting the backend Node.js service.


## Contributing 

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
    ```bash
    git checkout -b feature-name 
3. Make your changes and commit them
   ``` bash
   git commit -m 'Add feature'
4. Push the changes to your branch
   ```bash
   git push origin feature-name
5. Open a pull request.

## Licence 

This project is licensed under the **MIT License.**

## Contact
You can contact me with 

Linkedin Id :  [Ankit Chouhan](https://www.linkedin.com/in/ankit-chouhan-b41a87206/)

Email :  [ankit.chouhan.0207@gmail.com](mailto:ankit.chouhan.0207@gmail.com)