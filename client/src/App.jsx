import './App.css'
import { Route, Routes } from 'react-router-dom'
import StatusData from './Components/StatusData/StatusData'
import Layout from './Components/Layout/Layout'

function App() {
  
  return (
    <>
     <Routes>
            <Route path="/" element={<Layout />} />
            <Route path='/:id' element={<StatusData />} />
        </Routes>
    </>
  )
}

export default App
