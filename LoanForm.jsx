import {useState} from 'react'
import {lendMoney} from '../services/api'

const LoanForm = ({onSuccess}) => {
  const [form, setForm] = useState({
    customerId: '',
    principal: '',
    period: '',
    rate: '',
  })

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await lendMoney(form)
    onSuccess()
    setForm({customerId: '', principal: '', period: '', rate: ''})
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 space-y-4'>
      <input
        name='customerId'
        value={form.customerId}
        onChange={handleChange}
        placeholder='Customer ID'
        required
      />
      <input
        name='principal'
        value={form.principal}
        onChange={handleChange}
        placeholder='Principal Amount'
        required
      />
      <input
        name='period'
        value={form.period}
        onChange={handleChange}
        placeholder='Period (years)'
        required
      />
      <input
        name='rate'
        value={form.rate}
        onChange={handleChange}
        placeholder='Interest Rate (%)'
        required
      />
      <button type='submit'>Lend Money</button>
    </form>
  )
}

export default LoanForm
