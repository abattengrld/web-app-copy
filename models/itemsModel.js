const db = require('../database');

// Get all items from the database
exports.getAllItems = (callback) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};


// Get a single item by ID from the database
exports.getItemById = (id, callback) => {
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};

// Insert a new item into the database
exports.insertItem = (name, affiliation, other_names, species, homeland, comments, callback) => {
    const sql = `INSERT INTO items (name, affiliation, other_names, species, homeland, comments) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, affiliation, other_names, species, homeland, comments], function (err) {
        callback(err, this.lastID);
    });
};

// Update an existing item by ID
exports.updateItem = (id, name, affiliation, other_names, species, homeland, comments, callback) => {
    const sql = `UPDATE items 
                 SET name = ?, affiliation = ?, other_names = ?, species = ?, homeland = ?, comments = ? 
                 WHERE id = ?`;
    db.run(sql, [name, affiliation, other_names, species, homeland, comments, id], function (err) {
        callback(err, this.changes);
    });
};

// Partially update an item by ID
exports.partialUpdateItem = (id, updates, callback) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const sql = `UPDATE items SET ${fields} WHERE id = ?`;
    db.run(sql, values, function (err) {
        callback(err, this.changes);
    });
};

// Delete an item by ID
exports.deleteItem = (id, callback) => {
    const sql = `DELETE FROM items WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};

const db = require('../database');

// Get all items from the database
exports.getAllItems = (callback) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};


// Get a single item by ID from the database
exports.getItemById = (id, callback) => {
    const sql = 'SELECT * FROM items WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        callback(err, row);
    });
};

// Insert a new item into the database
exports.insertItem = (name, affiliation, other_names, species, homeland, comments, callback) => {
    const sql = `INSERT INTO items (name, affiliation, other_names, species, homeland, comments) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, affiliation, other_names, species, homeland, comments], function (err) {
        callback(err, this.lastID);
    });
};

// Update an existing item by ID
exports.updateItem = (id, name, affiliation, other_names, species, homeland, comments, callback) => {
    const sql = `UPDATE items 
                 SET name = ?, affiliation = ?, other_names = ?, species = ?, homeland = ?, comments = ? 
                 WHERE id = ?`;
    db.run(sql, [name, affiliation, other_names, species, homeland, comments, id], function (err) {
        callback(err, this.changes);
    });
};

// Partially update an item by ID
exports.partialUpdateItem = (id, updates, callback) => {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    const sql = `UPDATE items SET ${fields} WHERE id = ?`;
    db.run(sql, values, function (err) {
        callback(err, this.changes);
    });
};

// Delete an item by ID
exports.deleteItem = (id, callback) => {
    const sql = `DELETE FROM items WHERE id = ?`;
    db.run(sql, [id], function (err) {
        callback(err, this.changes);
    });
};
