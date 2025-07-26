const express = require('express')
const router = express.Router()
const loanController = require('../controllers/loanController')

router.post('/lend', loanController.lendMoney)

router.post('/pay', loanController.makePayment)
router.get('/ledger/:loanId', loanController.getLedger)
router.get('/account/:customerId', loanController.getAccountOverview)

module.exports = router
