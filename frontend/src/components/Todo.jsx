import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Navigate, useNavigate } from 'react-router-dom'
// import apiHandler from './apiHandler.js'
import axios from 'axios'




const Todo = () => {
    const [dark, setdark] = useState(false)
    const [todoname, settodoName] = useState("")
    const [todoList, settodoList] = useState([])
    const [checkedTodos, setCheckedTodos] = useState({});
    const [updatedInput, setupdatedInput] = useState(null)
    const [inputpop, setInputpop] = useState(false)
    
    axios.defaults.baseURL = 'https://full-stack-todo-6gbw.onrender.com/';
    const navigate = useNavigate()
    // write about it 

    useEffect(() => {
        try {
            const fetchedTodo = async () => {
                const token = localStorage.getItem("token")
                const response = await axios.get('/home', {
                    // difference in sending data in get & post 
                    headers : {
                        Authorization : token
                    }
                })
                settodoList(response.data.todos)
            }
            fetchedTodo()
        } catch (error) {
            console.log(`error in fetching data ${error}`);
            
        }
    }, [])
    
    const removeToken = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        navigate('/')
    }

    const addTodo = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('/addTodo', 
                { todoname }, 
                {
                    headers : {
                        Authorization : token
                    }
                }
            )
            console.log(response);

            const newTodo = response.data.user.todos.slice(-1)[0] 
            settodoList([...todoList, newTodo])
            // console.log(setTodos);
            
            settodoName('')
            
        } catch (error) {
            console.log(`error while creating todo ${error}`);
            
        }
    }

    const darkMode = () => {
        setdark(!dark)
        document.body.classList.toggle("dark")
    }


    const doneTodo = (index) => {
        setCheckedTodos((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the check state for the specific todo
        }));
    };


    const deleteTodo = async (e, index) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if(token){
                const id = todoList[index].id
                const response = await axios.delete(`/delete/${id}`, {
                    headers : {
                        Authorization : token
                    }
                })

                if(response.status === 200){
                    const newTodolist = todoList.filter((_, i) => i !== index)
                    settodoList(newTodolist)
                }

            }

            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const todoUpdate = async (e, index) => {
        e.preventDefault()
        setupdatedInput(index)
        // setInputpop(true)
    }

    const handleUpdate = async (e, index) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const upadtedTodo = todoList[index]

            const response = await axios.put(`/edit/${upadtedTodo.id}`,
                {todoname : upadtedTodo.title},
                {
                    headers : {
                        Authorization : token
                    }
                }
            )

            if(response.status === 200) {
                setupdatedInput("")       
            }
        } catch (error) {
            console.log(`error in upadting ${error}`);
            
        }
    }


  return (
    <div className='dark:bg-gradient-to-r dark:from-[#415687] dark:to-[#020f2e] bg-gradient-to-r from-[#a5aab5] to-[#b7c6eb] min-h-screen dark:text-white font-customnew'>
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
                
                        <div className='flex sm:gap-4 gap-2'>
                        <button className='bg-[#3b82f6] p-2 rounded-lg' onClick={removeToken}>LogOut</button>
                        
                    </div>
                <div>
                </div>
            </div>
        </div>

        {/* todoadd */}
        <div className='flex justify-center items-center mt-28 sm:mt-20'>
            <form onSubmit={addTodo} method="post" className='absolute bg-gray-900 dark:bg-blue-100 rounded-md p-5 dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 sm:text-2xl'>
                <label htmlFor="text" className='inline-block mr-5'>Write your Todo </label> <br />
                <input type="text" className='my-1 text-black rounded-l sm:w-[200px] pl-2' value={todoname} onChange={e => settodoName(e.target.value)}  />
                <button type='submit' className='bg-[#3b82f6] p-1 rounded-lg mt-3 mx-auto ml-6  sm:text-lg'>add Todo </button>
            </form>
        </div>


        {/* render todo  */}
        <div className='mt-40 flex justify-center items-center sm:text-3xl'>
        <ul>
                    {todoList.map((todo, index) => (
                        <li
                            key={index}
                            className='p-2 border-2 m-2 bg-gray-900 dark:bg-blue-100 rounded-md dark:backdrop-filter backdrop-filter dark:backdrop-blur-3xl backdrop-blur-3xl dark:bg-opacity-10 bg-opacity-10 border border-gray-100 flex items-center justify-between'
                        >   
                            <div>
                            <input
                                type='checkbox'
                                cclassName='w-4 h-4 mr-16'
                                checked={checkedTodos[index] || false} // Handle the checked state
                                onChange={() => doneTodo(index)}
                            />{' '}
                            <span className={`${checkedTodos[index] ? 'line-through' : ''}`}>
                                {
                                    (updatedInput === index) ? (
                                        <input type="text" 
                                        value={todo.title}
                                        className='my-1 text-black rounded-l sm:w-[200px] pl-2'
                                        onChange={e => {
                                            const newTodolist = [...todoList]
                                            newTodolist[index].title = e.target.value
                                            settodoList(newTodolist)
                                        }}
                                        />
                                    ) : (
                                        <>{todo.title}</>
                                    )
                                }
                            </span>
                            </div>
                           
                            <div>
                            {
                                updatedInput === index ? (
                                    <button className='bg-[#3b82f6] p-1 rounded-lg ml-2 sm:text-lg' onClick={e => handleUpdate(e, index)}>save  </button>

                                ) : (
                                    <>
                                    <button className='bg-[#3b82f6] p-1 rounded-lg ml-2 sm:text-lg' onClick={e => todoUpdate(e, index)}>update  </button>
                                    <button className='bg-[#3b82f6] p-1 rounded-lg ml-2 sm:text-lg' onClick={e => deleteTodo(e, index)}>delete </button>

                                    </>
                                    
                                )
                            }
                            </div> 
                            
                        </li>
                    ))}
                </ul>
            </div>

    </div>
  )
}

export default Todo