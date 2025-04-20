import React from 'react'
import Usefetch from '../Hooks/Usefetch'
import { BASE_URL } from '../utils/Config'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from 'react-router-dom'

const Status = () => {
    const 
    {data: statusData, 
    loading, 
    error } = Usefetch(`${BASE_URL}/user/allUsers`);

    const usersWithStatus = statusData?.filter(data => data.userStatus && data.userStatus.length > 0) || [];

    console.log(usersWithStatus);

  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    {!loading && !error && usersWithStatus && (
    <div className="flex overflow-x-auto gap-5 mt-5 ml-30">    
    <IoIosArrowDropleftCircle className='cursor-pointer hover:bg-white text-white w-[30px] h-[25px] mt-[25px] rounded transition'/>
    {usersWithStatus.map((items) => (
      <div key={items._id}>
      <Link to={`/${items._id}`}>
    <div className="flex flex-col items-center" >
    <img src={items.profilePic} alt={items.name} className="w-15 h-15 rounded-full border-2 border-amber-800"/>
    <p className="text-white font-semibold text-xs mt-2 text-center w-16 truncate">{items.name}</p>
      </div>
      </Link>
      </div>
    ))}
    <IoIosArrowDroprightCircle className='cursor-pointer hover:bg-white text-white w-[30px] h-[25px] mt-[25px] rounded transition'/>
    </div>
    )}
    </>
  )
}

export default Status