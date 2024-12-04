const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// API routes
router.get('/', itemsController.getItems);           // GET /api/items
router.post('/', itemsController.addItem);           // POST /api/items
router.put('/:id', itemsController.updateItem);      // PUT /api/items/:id
router.patch('/:id', itemsController.partialUpdateItem); // PATCH /api/items/:id
router.delete('/:id', itemsController.deleteItem);   // DELETE /api/items/:id

// Web routes (optional, for displaying items on a web page)
router.get('/list', itemsController.getItems);       // GET /items/list
router.get('/:id', itemsController.getItemById);     // GET /items/:id (for individual item)

module.exports = router;
