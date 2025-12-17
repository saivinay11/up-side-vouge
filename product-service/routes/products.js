const express = require('express');
const { listProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, requireAdmin, createProduct);
router.put('/:id', authenticate, requireAdmin, updateProduct);
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

module.exports = router;