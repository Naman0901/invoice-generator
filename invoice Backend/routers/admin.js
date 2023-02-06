const express = require("express");
const router = express.Router();
const adminControl = require('../controllers/adminControllers');
router.use(express.json());

router.post("/product",adminControl.addproduct);
router.get("/product",adminControl.getproduct);
router.get("/product/:id",adminControl.getblog);
router.put("/product/:id",adminControl.updproduct);
router.delete("/product/:id",adminControl.delproduct);

module.exports = router;
