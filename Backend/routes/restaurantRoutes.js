// routes/restaurantRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// @route   GET /api/menu
// @desc    Fetch all menu items from the database
router.get('/menu', (req, res, next) => {
    db.all("SELECT * FROM menu", [], (err, rows) => {
        if (err) {
            // If there is an error, pass it to the error handling middleware
            return next(err);
        }
        // Send the fetched menu items as JSON to the frontend
        res.json(rows);
    });
});

// @route   POST /api/menu
// @desc    Add a new menu item to the database (For future admin panel)
router.post('/menu', (req, res, next) => {
    // Extract data from the incoming request
    const { name, price, description, category, image } = req.body;
    
    const insertQuery = `INSERT INTO menu (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(insertQuery, [name, price, description, category, image], function(err) {
        if (err) {
            // Pass error to the middleware
            return next(err);
        }
        res.status(201).json({ id: this.lastID, message: "Menu item added successfully!" });
    });
});

// Export the router so it can be used in server.js
module.exports = router;