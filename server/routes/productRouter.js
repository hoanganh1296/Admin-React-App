const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router
  .route("/products")
  .get(productCtrl.getProduct)
  .post(auth, authAdmin, productCtrl.createProduct);

router
  .route("/products/:id")
  .get(productCtrl.getSingleProduct)
  .delete(auth, authAdmin, productCtrl.deleteProduct)
  .put(auth, authAdmin, productCtrl.updateProduct);

module.exports = router;
