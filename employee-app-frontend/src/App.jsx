import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'

import Login from './components/Login'
import Signup from './components/Signup'
import Addemployee from './components/Addemployee'
import Home from './components/Home'
import Main from './components/Main'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path='/employees' element={<Main child={<Home/>}/>}></Route>
          <Route path='/addemployee' element={<Main child={<Addemployee/>}/>}></Route>
        </Route>
        
      </Routes>
    </>
  )
}

export default App
