// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import CreatePost from './pages/create-post/create-post'


function App() {
  return (
    <>

      <BrowserRouter>
<Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/createPost' element={<CreatePost/>}></Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App