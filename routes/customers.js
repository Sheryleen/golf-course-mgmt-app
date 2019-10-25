const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");

/* GET home page. */
router.get("/customers", customersController.getAllCustomers);
router.get("/customers/:id", customersController.getOneCustomer);
router.post("/customers", customersController.addOneCustomer);
router.patch("/customers/:id", customersController.updateOneCustomer);
router.delete("/customers/:id", customersController.removeOneCustomer);

module.exports = router;
