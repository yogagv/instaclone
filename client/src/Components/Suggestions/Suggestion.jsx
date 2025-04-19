import React from 'react'
import Usefetch from '../Hooks/Usefetch'
import { BASE_URL } from '../utils/Config'

const Suggestion = () => {

  const {
    data:userData,
    loading,
    error
  }  = Usefetch(`${BASE_URL}/user/singleUser/6801f62e43acb6ba801df750`)


  const {
    data:suggestData,
    loading: suggestLoading,
    error: suggestError
  }  = Usefetch(`${BASE_URL}/suggestion/allSuggestions`)


  const footerLinks1 = ["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms"];
  const footerLinks2 = ["Locations", "Language", "Meta", "Verified"];

  return (
    <>

{loading && <p>Loading</p>}
      {error && <p>Error</p>}

      {!loading && !error && userData && (  
        <div className='flex items-center mb-2 mt-8 ml-4' key={userData.id}>
    <img src={userData.profilePic} alt={userData.name} className="w-10 h-10 rounded-full" />
    
    <div className='ml-5'>
      <p className='text-white font-semibold'>{userData.name}</p>
      <p className='text-gray-400 text-sm'>yoga_gv</p>
    </div>
    <h6 className='text-blue-400 ml-auto cursor-pointer mr-20 mt-1'>Switch</h6>
  </div>
)}


    <div className='flex gap-48'>
    <p className='text-gray-500 text-bold mt-8 ml-3'>Suggested for you</p>
    <h6 className='text-white mt-8'>See All</h6>
    </div>

      {suggestLoading && <p>Loading</p>}
      {suggestError && <p>Error</p>}

      {!suggestLoading && !suggestError && suggestData && suggestData.map((item) => (
  <div className='flex items-center mb-4 mt-5 ml-4' key={item._id}>
    <img src={item.profilePic} alt={item.name} className="w-10 h-10 rounded-full" />
    
    <div className='ml-5'>
      <p className='text-white font-semibold'>{item.name}</p>
      <p className='text-gray-400 text-sm'>Following mayuras_tech</p>
    </div>
    <h6 className='text-blue-400 ml-auto cursor-pointer mr-20 mt-5'>Follow</h6>
  </div>
))}

    <div className='flex gap-2 mt-20 ml-5'>
    {footerLinks1.map((link, index) => (
          <p key={index} className='text-gray-500 text-sm hover:underline cursor-pointer'>.{link}</p>
        ))}
    </div>

    <div className='flex gap-2 ml-5'>
    {footerLinks2.map((link, index) => (
          <p key={index} className='text-gray-500 text-sm hover:underline cursor-pointer'>{link}</p>
        ))}
    </div>

    <div className='mt-3 ml-5'>
    <p className='text-gray-500'>© 2025 Instagram from Meta</p>
    </div>

    </>
  )
}

export default Suggestion