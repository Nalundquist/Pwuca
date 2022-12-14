import React from 'react';
import Header from './Header';
import BodyControl from './BodyControl';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return(
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<BodyControl />} />
      <Route path='/register' element={<UserControl />} />
    </Routes>
  </Router>
  )
}

export default App;