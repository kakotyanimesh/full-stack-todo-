import React from 'react'
import Home from './components/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Todo from './components/Todo'
const App = () => {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route
            exact path='/'
            element= {<Home/>}
          />
          <Route
            exact path ='/todo'
            element = {<Todo/>}
          />
        </Routes>
      </BrowserRouter >
    </>
    
  )
}

export default App