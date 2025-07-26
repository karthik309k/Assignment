import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const lendMoney = data => API.post('/lend', data)
export const getAllLoans = () => API.get('/loans')
export const getLoanById = id => API.get(`/loans/${id}`)
export const updateLoan = (id, data) => API.put(`/loans/${id}`, data)
