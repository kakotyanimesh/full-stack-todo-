import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'



const Home = () => {
    const [dark, setdark] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [profile, setProfile] = useState(false)
    const [logInPopup, setlogInPopup] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const navigate = useNavigate()
    axios.defaults.baseURL = 'http://localhost:3000';

    const logIn = () => {
        setlogInPopup(true)
        
    }
    const signUp = () => {
        setPopUp(true)  
    }

    const createUser = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post('/signUp', {
                username,
                password
            })

            localStorage.setItem("token", response.data.token)
            setUsername('')
            setPassword ('')
            setProfile(true)
            setPopUp(false)
            // navigate('/dashboard') 
        } catch (error) {
            console.log(`error while creating user ${error}`);
            
        }
        
    }

    const userLogIn = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/logIn', {
                username,
                password
            })   
            
            localStorage.setItem("token", response.data.token)
            setlogInPopup(false)
            setUsername('')
            setProfile(true)
            setPassword ('')
            // navigate('/dashboard') 
        } catch (error) {
            console.log(`error while loggin user ${error}`);
        }
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setProfile(false)
    }

    const darkMode = () => {
        setdark(!dark)
        document.body.classList.toggle("dark")
    }
  return (
    <div className='dark:bg-[#0a0b10] bg-[#ffffff] min-h-screen dark:text-white font-customnew'>
        <div className='flex justify-between sm:px-32 sm:pt-10 px-7 pt-10 text-sm sm:text-xl'>
            <div>
                <h1 className='font-light text-3xl'>Todo App</h1>
            </div>
            <div className='flex sm:gap-10 gap-4'>
                <button onClick={darkMode}>
                {
                    dark && <FontAwesomeIcon icon={faMoon} style={{color: "#1e67e6",}} />
                }{
                    !dark && <FontAwesomeIcon icon={faSun} style={{color: "#1d87d7",}} />
                }
                </button>
                {
                    !profile && (
                    <div className='flex sm:gap-4 gap-2'>
                        <button className='bg-[#3b82f6] p-2 rounded-lg ' onClick={logIn}>LogIn</button>
                        <button className='bg-[#3b82f6] p-2 rounded-lg ' onClick={signUp}>Join</button>
                    </div>
                    )
                } {
                    profile && (
                        <div className='flex sm:gap-4 gap-2'>
                        <button className='bg-[#3b82f6] p-2 rounded-lg ' onClick={logOut}>LogOut</button>
                        
                    </div>
                    )
                }
                <div>
                </div>
            </div>
        </div>

        <div>
        {
            popUp && (
                <div className='sm:right-[4%] right-[10%] mt-10 absolute bg-gray-900 dark:bg-blue-100 rounded-md p-5 dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 sm:text-2xl'>
                    <form onSubmit={createUser}>
                        <label htmlFor="text" className='inline-block sm:w-[100px]'>username</label> <br />
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} /> <br />
                        <label htmlFor="text" className='inline-block sm:w-[100px]'>password</label> <br />
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2 ' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} /> <br />
                        <button type='submit' className='bg-[#3b82f6] p-1 rounded-lg mt-3  sm:text-base'>signUp</button>
                    </form>
                </div>
            )
        }
        {
            logInPopup && (
                <div className='sm:right-[4%] right-[10%] mt-10 absolute bg-gray-900 dark:bg-blue-100 rounded-md p-5 dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 sm:text-2xl'>
                    <form onSubmit={userLogIn}>
                        <label htmlFor="text" className='inline-block sm:w-[100px]'>username</label> <br />
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} /> <br />
                        <label htmlFor="text" className='inline-block sm:w-[100px]'>password</label> <br />
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2 ' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} /> <br />
                        <button type='submit' className='bg-[#3b82f6] p-1 rounded-lg mt-3  sm:text-base'>LogIn</button>
                    </form>
                </div>
            )
        }
        </div>
{/* homescreen */}
<div className='flex justify-center items-center mt-40 flex-col'>
            <h1 className='font-custom sm:text-5xl text-xl'>100x devs Full Stack Todo Assignment </h1> 
            <button className='bg-[#3b82f6] p-2 rounded-lg mt-10 sm:text-2xl'>buy now </button>
        </div>
        

        {/* footer  */}

        <div className='flex justify-center sm:gap-36 gap-6 sm:mt-60 mt-32 items-center text-2xl '>
            <a href="http://" target="_blank" rel="noopener noreferrer">github</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">twitter</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">linkdin</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div> 
        
    </div>
  )
}

export default Home