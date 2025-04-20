import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Feed from '../Feed/Feed'
import Suggestion from '../Suggestions/Suggestion'
import './Layout.css'
import Register from '../Register/Register'
import Profile from '../Profile/profile'


const Layout = () => {

  const [activePage, setActivePage] = useState('feed');

  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    <>
    <div className='flex min-h-screen'>
    <div className='w-[20%] border-r-1' style={{border: '0.5px dotted #555555' }} ><Sidebar onNavigate={handleNavigation}/></div>
    <div className={`flex-grow transition-all ${activePage === 'profile' || activePage === 'register' ? 'w-full' : 'w-[50%]'}`} style={{ border: '0.5px dotted #555555' }} >
    {activePage === 'feed' && <Feed />}
    {activePage === 'profile' && <Profile />}
    {activePage === 'register' && <Register />}
    </div>
    {activePage !== 'profile' && activePage !== 'register' && (
        <div className="w-[30%]">
          <Suggestion />
        </div>
      )}
    </div>
    </>
  )
}

export default Layout