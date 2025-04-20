import './App.css'
import { Route, Routes } from 'react-router-dom'
import StatusData from './Components/StatusData/StatusData'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'


function App() {
  
  return (
    <>
     <Routes>
            <Route path="/" element={<Layout />} />
            <Route path='/:id' element={<StatusData />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default App
