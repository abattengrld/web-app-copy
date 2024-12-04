const itemsModel = require('../models/itemsModel');

// GET all items
exports.getItems = (req, res) => {
    itemsModel.getAllItems((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};


// GET a single item by ID (API)
exports.getItemById = (req, res) => {
    const itemId = req.params.id;

    // Fetch the item from the model
    itemsModel.getItemById(itemId, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            // API route - Send the item as JSON
            res.json(row);
        } else {
            // Item not found
            res.status(404).json({ error: 'Item not found' });
        }
    });
};


// POST: Add a new item
exports.addItem = (req, res) => {
    const { name, affiliation, other_names, species, homeland, comments } = req.body;
    itemsModel.insertItem(name, affiliation, other_names, species, homeland, comments, (err, id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id });
    });
};

// PUT: Update an item by ID
exports.updateItem = (req, res) => {
    const { name, affiliation, other_names, species, homeland, comments } = req.body;
    const itemId = req.params.id;
    itemsModel.updateItem(itemId, name, affiliation, other_names, species, homeland, comments, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updatedRows: changes });
    });
};

// PATCH: Partially update an item by ID
exports.partialUpdateItem = (req, res) => {
    const itemId = req.params.id;
    const updates = req.body;
    itemsModel.partialUpdateItem(itemId, updates, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updatedRows: changes });
    });
};

// DELETE: Remove an item by ID
exports.deleteItem = (req, res) => {
    const itemId = req.params.id;
    itemsModel.deleteItem(itemId, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deletedRows: changes });
    });
};
