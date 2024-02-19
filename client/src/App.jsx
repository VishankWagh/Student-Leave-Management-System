import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Login from './pages/login'
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/mentor/Dashboard';
import LeaveHistory from './pages/mentor/LeaveHistory';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import StudentDets from './pages/mentor/StudentDets';
import Pending from './pages/mentor/Pending';
import Approved from './pages/mentor/Approved';
import Rejected from './pages/mentor/Rejected';

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/mentor/'>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='studentdets' element={<StudentDets />} />
            <Route path='pending' element={<Pending />} />
            <Route path='approved' element={<Approved />} />
            <Route path='rejected' element={<Rejected />} />
            <Route path='leavehistory' element={<LeaveHistory />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
