import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Auth } from './Pages/Auth/index';
import { ExpenseTracker } from './Pages/Expense-tracker/index';

function App() {

  return (

  <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Auth />} />
      <Route path='/ExpenseTracker' element={<ExpenseTracker />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App;