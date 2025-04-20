import React, { useState } from 'react'
import logo from '../../assets/insta-logo.webp'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/Config'
import './register.css'


const Register = () => {

    const [user, setUser] = useState({

        name:undefined,
        email:undefined,
        password:undefined,
        mobno:undefined,
        profilePic:undefined
    })

    const [error, setError] = useState({})

    const navigate = useNavigate()

    const handleChange = (e) => {

        setUser((prev) => ({...prev, [e.target.id] : e.target.value}));

        setError((prev) => ({...prev, [e.target.id] : ""}));
    }


    const validateForm = () => {

        let errors = {};

        if(!user.name) {

            errors.name = 'Name is Required!'
        }

        if(!user.email) {

            errors.email = 'Email is Required!'
        }

        if(!user.password) {

            errors.password = 'Password is Required!'
        }

        if(!user.mobno) {

            errors.mobno = 'Mobno is Required!'
        }

        if(!user.profilePic) {

            errors.profilePic = 'Profile Picture is Required!'
        }

        setError(errors);

        return Object.keys(errors).length === 0;

}

    const handleSubmit = async (e) => {

            e.preventDefault();

            if(validateForm()) {

            
            try {

                    const res = await fetch(`${BASE_URL}/auth/registerUser`, {
                    
                        method: 'POST',
                        headers: {'content-Type':'application/json'},
                        body: JSON.stringify(user)
                        })

                        const result = await res.json();

                        if(!res.ok) {

                            alert(result.message);
                            return
                        }

                        alert(result.message);

                        setTimeout(()=>{
                            navigate('/login')
                        },2000)
                }

        catch(error) {

                console.log(error);
            }

        }

    }
  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to='/' className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo"/>
         <span className='instagram-style'>Instagram</span>   
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-3 md:space-y-3" onSubmit={handleSubmit}>
                    <div>
                      <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Name
                      </label>
                      <input 
                       type="text" 
                       id="name" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       placeholder="Enter your name"
                       onChange={handleChange} 
                       required=""/>
                       </div>
                       <div>
                       {error.name && <span className='error'>{error.name}</span>}
                    </div>
                    <div>
                      <label 
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Your email
                       </label>
                       <input type="email"  
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="name@company.com"
                        onChange={handleChange} 
                        required=""/>
                        </div>
                        <div>
                        {error.email && <span className='error'>{error.email}</span>}
                    </div>
                    <div>
                      <label  
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Password
                       </label>
                       <input 
                       type="password"  
                       id="password" 
                       placeholder="••••••••"
                       onChange={handleChange} 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       required=""/>
                       </div>
                       <div>
                       {error.password && <span className='error'>{error.password}</span>}
                    </div>
                    <div>
                      <label 
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Mobile No
                       </label>
                       <input 
                        type="text"  
                        id="mobno" 
                        placeholder="Enter your mobno" 
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required=""/>
                        </div>
                        <div>
                        {error.mobno && <span className='error'>{error.mobno}</span>}
                    </div>
                    <div>
                      <label  
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Profile Picture url
                       </label>
                       <input 
                        type="url"  
                        id="profilePic" 
                        onChange={handleChange}
                        placeholder="Upload your profile picture url" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required=""/>
                        </div>
                        <div>
                        {error.profilePic && <span className='error'>{error.profilePic}</span>}
                    </div>
                    <button 
                     className="w-full text-white bg-primary-600 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                     Create an account
                     </button>
                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Register