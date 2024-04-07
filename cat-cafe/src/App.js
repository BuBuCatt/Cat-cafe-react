import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Links from './components/Links';
import { useState, useEffect } from 'react';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import ShoppingCart from './pages/ShoppingCart';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Logout from './components/Logout';
import FileService from "./services/FileService";
import Cafe from './pages/Cafe';
import Sponsor from "./pages/Sponsor";
import Wishlist from './pages/Wishlist';



function App() {
  // customers
  const [users, setUsers]=useState(null);// json file user/ customers
  const [loginUser,setLoginUser] = useState(null); // login user 
  // cafe Menu
  const [menu , setMenu]= useState(null); // cafe menu 
  // cats
  const [cats , setCats] = useState(null); // adopt cats

  //cart
  const [cart,setCart] = useState(null);

  // File error handling 
  const [error, setError] = useState(null); // file error handling


  useEffect(()=>{
// read the users file then get the data 

        // Read the customer json file
        FileService.read("customers").then(
            (response)=>{
                setUsers(response.data);// Set users state with loaded data in users -> users
                console.log("Json file customers Obj : " + response.data);
            },
            (rej)=>{
                console.log(rej);// Log errors if file reading fails
                setError(rej.message || "An error occurred while reading the customers file.");
            }
        )
         //read cafe menu json file
        FileService.read("menu").then(
          (response)=>{
            setMenu(response.data);// Set Menu state with loaded data  -> cafe menu
              console.log("Json file Cafe Menu Obj : " + response.data);
          },
          (rej)=>{
              console.log(rej);// Log errors if file reading fails
              setError(rej.message || "An error occurred while reading the menu file.");
          }
      )

      //read cafe menu json file
        FileService.read("cats").then(
          (response)=>{
            setCats(response.data);// Set Cats state with loaded data  -> Adopt Cats
              console.log("Json file Adopt Cats Obj : " + response.data);
          },
          (rej)=>{
              console.log(rej);// Log errors if file reading fails
              setError(rej.message || "An error occurred while reading the cats file.");
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
      <NavBar loginUser={loginUser} userLogout={userLogout} />

        <Routes>
          <Route path="/" element={<Links loginUser={loginUser} />}>
              <Route index element={<Home loginUser={loginUser} auth={Auth} cats={cats}/>} />
              <Route path="home" element={<Home  loginUser={loginUser} auth={Auth} cats={cats}/>} />
              <Route path="adopt" element={<Adopt cats={cats}/>} />
              <Route path="cafe" element={<Cafe menu={menu}/>} />
              <Route path="sponsor" element={<Sponsor />} />
              <Route path="wishlist" element={<Wishlist/>} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="login" element={<LoginPage auth={Auth} loginUser={loginUser}  />}  />
              <Route path="logout"  element={<Logout userLogout= {userLogout} element={<LoginPage auth={Auth} loginUser={loginUser} />}  />} />
            </Route>
          
        </Routes>

      {/* <Footer/> */}
    </BrowserRouter>
    
  );
}

export default App;
