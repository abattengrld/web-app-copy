const express = require('express');
const app = express();
const path = require('path');
const itemsRoutes = require('./routes/itemsRoutes');

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON requests
app.use(express.json());

// Use routes
app.use('/api/items', itemsRoutes);  // API routes for CRUD operations
app.use('/items', itemsRoutes);  // Web routes for displaying items


// Listen on port
const port = 3007;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


