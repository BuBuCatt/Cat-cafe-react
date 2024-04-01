import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavBar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Adopt from './pages/Adopt';
import ShoppingCart from './pages/ShoppingCart';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/cart" element={<ShoppingCart />} />
          
        </Routes>

      <Footer/>
    </Router>
    
  );
}

export default App;
