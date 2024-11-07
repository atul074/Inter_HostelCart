import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout'; 
import UnifiedSection from './Components/UnifiedSection';
import Payment from './Components/Payment'
import Home from './pages/Home'; 
import MyShop from './pages/MyShop'; 
import Orders from './pages/Orders';
import Deal from './pages/Deal';
import AddItem from './Components/AddItem';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Mycart from './pages/Mycart';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/myShop" element={<MyShop />} />
          <Route path="/deal" element={<Deal />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mens" element={<UnifiedSection gender="male" />} />
          <Route path="/womens" element={<UnifiedSection gender="female" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mycart" element={<Mycart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;