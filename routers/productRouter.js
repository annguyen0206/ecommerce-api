const router = require('express').Router()
const productctrl = require('../controllers/productCtrl')

router.route('/products')
      .get(productctrl.getProducts)
      .post(productctrl.createProducts)

router.route('/products/:id')
      .delete(productctrl.deleteProducts)
      .put(productctrl.updateProducts)

module.exports = router