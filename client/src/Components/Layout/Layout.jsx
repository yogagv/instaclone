import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Feed from '../Feed/Feed'
import Suggestion from '../Suggestions/Suggestion'
import './Layout.css'


const Layout = () => {
  return (
    <>
    <div className='flex min-h-screen'>
    <div className='w-[20%] border-r-1' style={{border: '0.5px dotted #555555' }}><Sidebar /></div>
    <div className='w-[50%] border-r-1' style={{border: '0.5px dotted #555555' }}><Feed /></div>
    <div className='w-[30%]'><Suggestion /></div>
    </div>
    </>
  )
}

export default Layout