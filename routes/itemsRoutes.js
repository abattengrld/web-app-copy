const express = require('express');
const router = express.Router();
const path = require('path');
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getItems);
router.post('/', itemsController.addItem);
router.put('/:id', itemsController.updateItem);
router.patch('/:id', itemsController.partialUpdateItem);
router.delete('/:id', itemsController.deleteItem);

router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/items.html'));
});

module.exports = router;
