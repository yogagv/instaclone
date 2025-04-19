import React from 'react'
import Usefetch from '../Hooks/Usefetch'
import { BASE_URL } from '../utils/Config'
import { Link, useParams } from 'react-router-dom'

const StatusData = () => {

    const {id} = useParams()
    
    const {data: statusData,
           loading,
           error}  = Usefetch(`${BASE_URL}/user/singleUser/${id}`);

           console.log("statusData:", statusData)

  return (
    <>
    <div>
        <Link to='/' className='text-white  text-gray-800 p-8'>Home</Link>
    </div>
    {loading && <p>Loading...</p>}
    {error && error.message}
    
    {/* {!loading && !error && (
        statusData.userStatus.map((status) => (
          <div key={status.id} className="text-white">
           <div className="user-info flex">
                <img src={status.profilePic} alt={status.name} className="w-15 h-15 rounded-full border-2 border-amber-800 mt-5"/>
                  <p className='text-white ml-3 mt-5'>{status.name}</p>
                  <p className='text-gray-400 text-sm mt-11 pname'>{status.name}</p>
                </div>
            <h1 className="text-2xl font-bold mb-2 text-center text-white">{status.caption}</h1>
            <div className='flex justify-center mt-5'>
              <img src={status.statusPic} alt={status.caption} className='h-100 w-70'/>
            </div>
          </div>
        ))
        
      )} */}


{!loading && !error && (

<div className="user-info">
<div className='flex'>
<img src={statusData.profilePic} alt={statusData.name} className="w-15 h-15 rounded-full border-2 border-amber-800 mt-5 ml-130"/>
<div className='flex flex-col'>
  <p className='text-white ml-3 mt-5'>{statusData.name}</p>
  <p className='text-gray-400 text-sm ml-3'>{statusData.name}</p>
  </div>
  </div>

        {statusData.userStatus?.map((status => (
          <div key={status.id} className="text-white">
            <h1 className="text-2xl font-bold mb-2 mt-2 text-center text-white italic text-outline">{status.caption}</h1>
            <div className='flex justify-center mt-3'>
              <img src={status.statusPic} alt={status.caption} className='h-100 w-80'/>
            </div>
          </div>
        )))}
        </div>
      )}


    </>
  )
}

export default StatusData