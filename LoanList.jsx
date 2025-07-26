import {useEffect, useState} from 'react'
import {getAllLoans} from '../services/api'

const LoanList = () => {
  const [loans, setLoans] = useState([])

  const fetchLoans = async () => {
    const response = await getAllLoans()
    setLoans(response.data)
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  return (
    <div className='p-4'>
      <h2 className='text-lg font-semibold mb-2'>Loan Records</h2>
      <ul>
        {loans.map(loan => (
          <li key={loan.id}>
            {loan.customerId} | ₹{loan.principal} | {loan.period} yrs |{' '}
            {loan.rate}%
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LoanList
