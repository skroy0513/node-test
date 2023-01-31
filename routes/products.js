const express = require('express');
const router = express.Router();
const {getProducts, getParamProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:id', getParamProduct);
router.post('/', createProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

module.exports = router;