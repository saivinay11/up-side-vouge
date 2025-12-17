const express = require('express');
const { createOrder, listOrdersByUser } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder);
router.get('/', listOrdersByUser);

module.exports = router;