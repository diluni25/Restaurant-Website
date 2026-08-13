// config/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 1. Define the path for the SQLite database file
// Using '../' because db.js is inside the 'config' folder, so we save the DB in the root Backend folder
const dbPath = path.resolve(__dirname, '../restaurant.db');

// 2. Create and connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the SQLite database successfully.');
    }
});

// 3. Initialize the database table and insert dummy data if it's empty
db.serialize(() => {
    // Create 'menu' table if it doesn't exist yet
    db.run(`CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        category TEXT,
        image TEXT
    )`);

    // Check how many items are in the menu
    db.get("SELECT COUNT(*) AS count FROM menu", (err, row) => {
        if (row.count === 0) {
            // Insert dummy data that matches your frontend if table is empty
            const insertQuery = `INSERT INTO menu (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)`;
            
            db.run(insertQuery, ['Mixed Grill Platter', 3400, 'Char-grilled beef and chicken skewers, served alongside roasted potatoes.', 'mains', 'images/main1.jpg']);
            db.run(insertQuery, ['Double Cheeseburger & Fries', 2400, 'Juicy double beef patties with melted cheese and golden french fries.', 'mains', 'images/burger.jpg']);
            db.run(insertQuery, ['Sesame Glazed Chicken Wings', 1450, 'Crispy fried chicken wings tossed in a sweet and savory sesame glaze.', 'starters', 'images/starters1.jpg']);
            db.run(insertQuery, ['Raspberry Cake', 1750, 'Fresh raspberries, vanilla cream, sponge cake.', 'desserts', 'images/cake.jpg']);
            db.run(insertQuery, ['Sunset Punch Cocktail', 1400, 'Fresh citrus notes infused with aromatic spices over ice.', 'drinks', 'images/drinks.jpg']);
            
            console.log('Default menu items successfully inserted into the database.');
        }
    });
});

// 4. Export the db instance so it can be used in the routes file
module.exports = db;