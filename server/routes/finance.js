const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance');

router.get('/accounts', financeController.getAccounts);
router.get('/spending-category', financeController.getSpendingByCategory);
router.get('/cashflow', financeController.getCashFlow);

module.exports = router;
