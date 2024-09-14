import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import myImage from '../assets/images/header.png'
import { Link } from 'react-router-dom'


const Home = () => {
    const [dark, setdark] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [profile, setProfile] = useState(false)
    const [logInPopup, setlogInPopup] = useState(false)
    const [addTodoButton, setaddTodoButton] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // const navigate = useNavigate()
    axios.defaults.baseURL = ['https://full-stack-todo-6gbw.onrender.com', 'http://localhost:3000']

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            // Optionally verify token with backend here
            setProfile(true)
        }
    }, [])


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
            setaddTodoButton(true)
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
            setaddTodoButton(true)
            setPassword ('')
            // navigate('/dashboard') 
        } catch (error) {
            console.log(`error while loggin user ${error}`);
        }
    }

    const logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setProfile(false)
        setaddTodoButton(false)
    }

    const darkMode = () => {
        setdark(!dark)
        document.body.classList.toggle("dark")
    }
  return (
    <div className='dark:bg-gradient-to-r dark:from-[#415687] dark:to-[#020f2e] bg-gradient-to-r from-[#a5aab5] to-[#b7c6eb] min-h-screen dark:text-white font-customnew'>
        <div className='flex justify-between sm:px-32 sm:pt-7 px-7 pt-10 text-sm sm:text-xl'>
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
        {/* // */}
        </div>
{/* homescreen */}
<div className='flex justify-center items-center sm:mt-20 mt-16 flex-col'>


        {!(popUp || logInPopup ) && (<div className='flex justify-center items-center flex-col'>
            <h1 className='font-custom sm:text-5xl text-xl'>100x devs Full Stack Todo Assignment </h1>
            <div className='flex justify-center items-center mt-10 '>
            <img src={myImage} alt="" className='sm:w-4/12 sm:h-3/5 w-10/12 rounded-2xl'  />
            </div>

        </div>)}{
            popUp && (
                <div className='absolute bg-gray-900 dark:bg-blue-100 rounded-md p-5 dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 sm:text-2xl'>
                    <form onSubmit={createUser}>
                        <label htmlFor="text" className='inline-block sm:w-[100px] mr-5'>username</label>
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2' placeholder='username' value={username} onChange={e => setUsername(e.target.value.trim())} /> <br />
                        <label htmlFor="text" className='inline-block sm:w-[100px] mr-5'>password</label>
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2 ' placeholder='password' value={password} onChange={e => setPassword(e.target.value.trim())} /> <br />
                        <button type='submit' className='bg-[#3b82f6] p-1 rounded-lg mt-3 items-center	block mx-auto  sm:text-lg'>signUp</button>
                    </form>
                </div>
            )
        }
        {
            logInPopup && (
                <div className=' absolute bg-gray-900 dark:bg-blue-100 rounded-md p-5 dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 sm:text-2xl'>
                    <form onSubmit={userLogIn}>
                    <label htmlFor="text" className='inline-block sm:w-[100px] mr-5'>username</label>
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2' placeholder='username' value={username} onChange={e => setUsername(e.target.value.trim())} /> <br />
                        <label htmlFor="text" className='inline-block sm:w-[100px] mr-5'>password</label>
                        <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2 ' placeholder='password' value={password} onChange={e => setPassword(e.target.value.trim())} /> <br />
                        <button type='submit' className='bg-[#3b82f6] p-1 rounded-lg mt-3 items-center	block mx-auto  sm:text-lg'>log In</button>
                    </form>
                </div>
            )
        }{
            !profile && (<button className='bg-[#3b82f6] p-2 rounded-lg mt-5 sm:text-2xl'>
                <a href="https://harkirat.classx.co.in/new-courses/14-complete-web-development-devops-blockchain-cohort" target='_blanck '>buy now</a>
                </button>)

        }
        {
            profile && ( <Link to="/todo"><button className='bg-[#3b82f6] p-2 rounded-lg mt-5 sm:text-2xl'>add todo </button> </Link> )

        }

</div>
        
{/* image */}
{/* {
    !(popUp || logIn) && (
        <div className='flex justify-center items-center mt-10 '>
            <img src={myImage} alt="" className='sm:w-4/12 sm:h-3/5 w-10/12 rounded-2xl'  />
        </div>
    )
} */}


{/* footer  */}

        {
            !(popUp || logInPopup ) && (
                <div className='flex justify-center sm:gap-36 gap-6 mt-10 items-center text-2xl '>
                    <a href="https://x.com/_animeshkakoty" target="_blank" rel="noopener noreferrer">twitter</a>
                    <a href="https://github.com/kakotyanimesh/full-stack-todo-" target="_blank" rel="noopener noreferrer">github</a>
                    <a href="https://www.linkedin.com/in/animesh-kakoty-3465791a6/" target="_blank" rel="noopener noreferrer">linkdin</a>
                </div> 
            )
        }
        
    </div>
  )
}

export default Home