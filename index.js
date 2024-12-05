const express = require('express');
const app = express();
const db = require('./database');

const port = 3006;

app.use(express.static('public'));
app.use(express.json());

// Route to fetch data from the database
app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows); // Send the rows as JSON to the frontend
        }
    });
});

// GET all items
app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows); // Send the rows as JSON to the frontend
        }
    });
});

// Route to fetch a specific item by its ID
app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.get(sql, [itemId], (err, row) => {
        if (err) {
            console.error('Error fetching item:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!row) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json(row); // Send the single item as JSON
        }
    });
});

// POST: Add a new item
app.post('/items', (req, res) => {
    const { name, affiliation, other_names, species, homeland, description } = req.body;
    const sql = `INSERT INTO items (name, affiliation, other_names, species, homeland, description) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, affiliation, other_names, species, homeland, description], function(err) {
        if (err) {
            console.error('Error inserting item:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: this.lastID }); // Return the ID of the inserted item
        }
    });
});

// PUT: Update an item by ID
app.put('/items/:id', (req, res) => {
    const { name, affiliation, other_names, species, homeland, description } = req.body;
    const sql = `UPDATE items SET name = ?, affiliation = ?, other_names = ?, species = ?, homeland = ?, description = ? WHERE id = ?`;
    db.run(sql, [name, affiliation, other_names, species, homeland, description, req.params.id], function(err) {
        if (err) {
            console.error('Error updating item:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ updatedRows: this.changes }); // Return the number of rows updated
        }
    });
});

// PATCH: Partially update an item by ID
app.patch('/items/:id', (req, res) => {
    const fields = Object.keys(req.body).map((key) => `${key} = ?`).join(', ');
    const values = [...Object.values(req.body), req.params.id];
    const sql = `UPDATE items SET ${fields} WHERE id = ?`;
    db.run(sql, values, function(err) {
        if (err) {
            console.error('Error partially updating item:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ updatedRows: this.changes }); // Return the number of rows updated
        }
    });
});

// DELETE: Remove an item by ID
app.delete('/items/:id', (req, res) => {
    const sql = `DELETE FROM items WHERE id = ?`;
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            console.error('Error deleting item:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ deletedRows: this.changes }); // Return the number of rows deleted
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});