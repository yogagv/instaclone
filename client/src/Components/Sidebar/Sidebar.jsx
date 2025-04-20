import React from 'react'
import logotext from '../../assets/insta-text.webp'
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { PiFilmReelFill } from "react-icons/pi";
import { LiaFacebookMessenger } from "react-icons/lia";
import { IoMdHeart } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { IoMenuSharp } from "react-icons/io5";
import './Sidebar.css'

const Sidebar = ({ onNavigate}) => {
  return (
    <>
    <div className='flex flex-col fixed gap-3'>
        <img src={logotext} alt="" className='w-40 p-3'/>

        <div className='text-white flex gap-2 text-lg sideMenu' onClick={() => onNavigate('feed')}> <AiFillHome className='mt-1'/> Home</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <FaSearch className='mt-1'/> Search</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <MdExplore className='mt-1'/> Explore</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <PiFilmReelFill className='mt-1'/> Reels</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <LiaFacebookMessenger className='mt-1'/> Messages</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <IoMdHeart className='mt-1'/> Notifications</div>
        <div className='text-white flex gap-2 text-lg sideMenu'> <IoAddCircle className='mt-1'/> Create</div>
        <div className='text-white flex gap-2 text-lg sideMenu' onClick={() => onNavigate('profile')}> <FaUserCircle className='mt-1'/> Profile</div>
        </div>

        <div className='fixed flex flex-col bottom-8 gap-3'>
        <div className='text-white flex gap-2 text-lg rounded-md hover:bg-[#181b1b] cursor-pointer transition-all duration-200 sidebarmenu'><FaRegCircle className='mt-1'/> Meta AI</div>
        <div className='text-white flex gap-2 text-lg rounded-md hover:bg-[#181b1b] cursor-pointer transition-all duration-200 sidebarmenu'><BsThreads className='mt-1'/> Threads</div>
        <div className='text-white flex gap-2 text-lg rounded-md hover:bg-[#181b1b] cursor-pointer transition-all duration-200 sidebarmenu'><IoMenuSharp className='mt-1'/> More</div>

    </div>
    </>
  )
}

export default Sidebar