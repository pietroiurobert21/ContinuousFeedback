import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Student from './pages/Student/Student'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Teacher from './pages/Teacher/Teacher'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Teacher" element={<Teacher />} />
      </Routes>
    </Router>
  )
}

export default App
