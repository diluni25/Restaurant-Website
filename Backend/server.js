// server.js

// 1. Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// 2. Import Routes and Middleware
const restaurantRoutes = require('./routes/restaurantRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// 3. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Global Middlewares
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Allow server to read JSON data

// 5. Serve Static Frontend Files
// Connect the backend to the Frontend folder to serve HTML, CSS, and JS
const frontendPath = path.join(__dirname, '../Frontend');
app.use(express.static(frontendPath));

// 6. API Routes
// All routes inside restaurantRoutes will be prefixed with '/api'
app.use('/api', restaurantRoutes);

// 7. Error Handling Middleware
// IMPORTANT: Error middleware must always be the last app.use()
app.use(errorHandler);

// 8. Start the Server
app.listen(PORT, () => {
    console.log(`Server is successfully running on http://localhost:${PORT}`);
});