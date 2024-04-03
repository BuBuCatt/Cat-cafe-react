import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Links from './components/Links';
import { useState, useEffect } from 'react';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Adopt from './pages/Adopt';
import ShoppingCart from './pages/ShoppingCart';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Logout from './components/Logout';
import FileService from "./services/FileService";

function App() {
  const [users, setUsers]=useState(null);
  const [loginUser,setLoginUser] = useState(null);


  useEffect(()=>{


 
        FileService.read("customers").then(
            (response)=>{
                setUsers(response.data);// Set users state with loaded data
                console.log("User Obj" + response.data);
            },
            (rej)=>{
                console.log(rej);// Log errors if file reading fails
            }
        )



    
    
},[]);



const Auth = (userObj)=>{

  console.log("app" + userObj.email)
   console.log("app" + userObj.pass)
   console.log("users" +users)
  for (let user of users){
    if(user.email == userObj.email && user.password == userObj.pass){
      setLoginUser(user);
    }
      console.log(user.email);
  }
   
  console.log("app" + userObj.email)
  console.log("app" + userObj.pass)
}

// logout
const userLogout=()=>{
        
  setLoginUser(null);

}



  return (
    <BrowserRouter>
      <NavBar />

        <Routes>
          <Route path="/" element={<Links loginUser={loginUser} />}>
              <Route index element={<Home loginUser={loginUser} />} />
              <Route path="home" element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="adopt" element={<Adopt />} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="login" element={<LoginPage auth={Auth} loginUser={loginUser}  />}  />
              <Route path="logout"  element={<Logout userLogout = {userLogout} element={<LoginPage auth={Auth} loginUser={loginUser} />}  />} />
            </Route>
          
        </Routes>

      <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
