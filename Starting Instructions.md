# Ride Steward - Full Stack Fleet Maintenance Journal

Welcome to **Ride Steward**, a full-stack vehicle asset management journal built to catalog mechanical service records, filter maintenance timelines, and leverage community-shared maintenance histories.

---

## 🛠️ Step 1: Database Setup Configuration (Crucial)

Before initializing the backend server, you must establish the local MySQL database and tables in the following order using MySQL Workbench:

Both of these files will be found in the **`database`** folder

1. **Run the Global Setup File:**
    - Locate and execute the **`create-database.sql`** file in your local environment setup to establish the necessary DB and tables.
    - This will create the database, add and populate the user and roles tables.
2. **Run the Application Setup File:**
    - Open and run the file located at **`/database/schema.sql`** (or your local environment equivalent) to instantly compile the structural application schemas, foreign key mappings, and baseline grading seed records.
    - This will create the **`vehicle`** and **`service_record`** tables and prepopulate them with some test entries.

---

## ⚙️ Step 2: Launching the Backend REST API Server

The server runs natively using Java 17 and Spring Boot on port `8080`.

1. Open your terminal application and change directories into the backend root:
   ```bash
   cd backend
   ```
2. Launch the server process: If using IntelliJ, you can run the SpringBootApplication file.
- If that doesn't work, you can try it in your terminal. You may need to install Maven if you get a mvn command not found error.

   ```bash
   mvn spring-boot:run
   ```
3. Confirm deployment by verifying the final log stamp in your console shell terminal:
   `Tomcat started on port(s): 8080 (http) with context path ''`

---

## 💻 Step 3: Launching the React Frontend Interface

The user interface layer is composed using React JavaScript, styled with Bootstrap, and served via Vite.

1. Open a fresh terminal pane window and walk into the frontend application directory:
   ```bash
   cd frontend
   ```
2. Build local asset node modules:
   ```bash
   npm install
   ```
3. Initialize the local hot-reloading development server:
   ```bash
   npm run dev
   ```
4. Open your browser environment and target the local Vite tracking IP address listed in your output console (frequently **`http://127.0.0.1:5173`** or **`http://127.0.0.1:3000`**). It may show under localhost instead of 127.0.0.1.
