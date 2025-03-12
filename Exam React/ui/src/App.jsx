import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Addstudent from './pages/Addstudent'
import Getstudent from './pages/Getstudent '




function App() {
  

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to="/addstudent" />} />
          
          <Route path='/addstudent' element={<Addstudent />} />
          <Route path='/getstudents/:course' element={<Getstudent />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
