import Header from '../components/Header'
import LoanForm from '../components/LoanForm'
import LoanList from '../components/LoanList'
import {useState} from 'react'

const Home = () => {
  const [reload, setReload] = useState(false)

  return (
    <div>
      <Header />
      <LoanForm onSuccess={() => setReload(!reload)} />
      <LoanList key={reload} />
    </div>
  )
}

export default Home
