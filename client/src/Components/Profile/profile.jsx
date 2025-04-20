import React from 'react'
import { Link } from 'react-router-dom'
const Profile = ({ onNavigate }) => {

  return (
    <>
    <Link to='/register' className='text-white' onClick={()=>onNavigate('register')}>Create Account</Link>
    </>
  )
}

export default Profile