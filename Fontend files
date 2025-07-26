// backend/contollers/loanContollers.js

const loanModel = require('../models/loanModel')
const calculations = require('../utils/calculations')

exports.lendMoney = async (req, res) => {
  const {customerId, principal, period, rate} = req.body
  const interest = calculations.calculateInterest(principal, period, rate)
  const total = principal + interest
  const emi = calculations.calculateEMI(total, period)

  const loanId = await loanModel.createLoan(
    customerId,
    principal,
    interest,
    total,
    emi,
    period,
  )
  res.json({loanId, total, emi})
}

exports.makePayment = async (req, res) => {
  const {loanId, type, amount} = req.body
  const result = await loanModel.recordPayment(loanId, type, amount)
  res.json(result)
}

exports.getLedger = async (req, res) => {
  const {loanId} = req.params
  const ledger = await loanModel.getLoanLedger(loanId)
  res.json(ledger)
}

exports.getAccountOverview = async (req, res) => {
  const {customerId} = req.params
  const overview = await loanModel.getCustomerLoans(customerId)
  res.json(overview)
}
