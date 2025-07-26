backend/models/db.js/

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data/db.sqlite')

const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    loanId INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId TEXT,
    principal REAL,
    interest REAL,
    total REAL,
    emi REAL,
    period INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS payments (
    paymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    loanId INTEGER,
    type TEXT,
    amount REAL,
    paidAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(loanId) REFERENCES loans(loanId)
  )`)
}

init()
module.exports = db
