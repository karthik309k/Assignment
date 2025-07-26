const db = require('./db')

exports.createLoan = (customerId, principal, interest, total, emi, period) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO loans (customerId, principal, interest, total, emi, period)
          VALUES (?, ?, ?, ?, ?, ?)`,
      [customerId, principal, interest, total, emi, period],
      function (err) {
        if (err) reject(err)
        else resolve(this.lastID)
      },
    )
  })

exports.recordPayment = (loanId, type, amount) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO payments (loanId, type, amount) VALUES (?, ?, ?)`,
      [loanId, type, amount],
      function (err) {
        if (err) reject(err)
        else resolve({status: 'success', paymentId: this.lastID})
      },
    )
  })

exports.getLoanLedger = loanId =>
  new Promise((resolve, reject) => {
    db.all(`SELECT * FROM payments WHERE loanId = ?`, [loanId], (err, rows) => {
      if (err) reject(err)
      else {
        db.get(
          `SELECT total, emi FROM loans WHERE loanId = ?`,
          [loanId],
          (e, loan) => {
            const paid = rows.reduce((sum, p) => sum + p.amount, 0)
            const balance = loan.total - paid
            const emiLeft = Math.ceil(balance / loan.emi)
            resolve({transactions: rows, balance, emi: loan.emi, emiLeft})
          },
        )
      }
    })
  })

exports.getCustomerLoans = customerId =>
  new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM loans WHERE customerId = ?`,
      [customerId],
      async (err, loans) => {
        if (err) reject(err)
        else {
          const results = await Promise.all(
            loans.map(
              loan =>
                new Promise((res, rej) => {
                  db.all(
                    `SELECT amount FROM payments WHERE loanId = ?`,
                    [loan.loanId],
                    (e, pays) => {
                      const paid = pays.reduce((sum, p) => sum + p.amount, 0)
                      const emiLeft = Math.ceil((loan.total - paid) / loan.emi)
                      res({...loan, paid, emiLeft})
                    },
                  )
                }),
            ),
          )
          resolve(results)
        }
      },
    )
  })
