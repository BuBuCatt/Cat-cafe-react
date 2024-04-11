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
import CartObj from './classes/Cart';
import { ProductObj } from './classes/Cart';
import AdminDashboard from './pages/AdminDashboard';
import { Admin, User } from './classes/Users';
import AES from 'crypto-js/aes'; // Import AES module for encryption
import { enc } from 'crypto-js'; // Import the 'enc' module from the 'crypto-js' library








function App() {
  // customers
  const [users, setUsers]=useState(null);// json file user/ customers
  const [loginUser,setLoginUser] = useState(null); // login user 
  // cafe Menu
  const [menu , setMenu]= useState(null); // cafe menu 
  // cats
  const [cats , setCats] = useState(null); // adopt cats

  //cart
  const [cart,setCart] = useState(new CartObj(1));

  //wishList

  const [wishlist, setWishlist] = useState([]);




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


      if (sessionStorage.getItem("user") == null) {

      } else {

        let tmpUser = sessionStorage.getItem("user");
        tmpUser = JSON.parse(AES.decrypt(tmpUser, 'webdev').toString(enc.Utf8));

        console.log(tmpUser);

        tmpUser = (tmpUser.type == null) ? new User(tmpUser.id, tmpUser.username, tmpUser.email, tmpUser.type) :
          new Admin(tmpUser.id, tmpUser.username, tmpUser.email, tmpUser.type);

        setLoginUser(tmpUser);
      }

      
    
},[]);

const addProductObj = (productObj)=>{
  setCart((prevCart)=>{
      prevCart.addProduct(productObj);
     
      return prevCart;
  });
 
}

const addSponsor = (productObj)=>{
  setCart((prevCart)=>{
      prevCart.addSponsorProduct(productObj);
     
      return prevCart;
  });
 
}

const removeItem = (mid) => {
  setCart(prevCart => {
      const newCart = new CartObj(prevCart.uid);

      prevCart.cart.forEach((product, key) => {
        console.log("This is key" + key);
          if (key != mid ) {
              newCart.addProduct(new ProductObj(key, product.pname, product.price, product.amount));
          }
      });

      return newCart;
  });
}



const resetCart = () => {
  setCart(prevCart => {
      prevCart.removeProduct();
      return new CartObj(prevCart.uid);
  });
}



const Auth = (userObj)=>{



  let getUser = null;


  for (let user of users){
    
    console.log('user:', user);
    console.log('userObj:', userObj);
    if(user.email == userObj.email && user.pass == userObj.pass){
      getUser=user;
     
      console.log('User logged in:', user);
      break;
    }

  }

  console.log("app" + userObj.email)
  console.log("app" + userObj.pass)

  let tmpUser = null;

  if(getUser){
    if(getUser.type == 'admin'){//admin
      tmpUser = new Admin(getUser.id, getUser.username,getUser.email, getUser.type );
      console.log("new admin tmpUser created"+tmpUser.username + " " + tmpUser.type);

      localStorage.setItem('admin', JSON.stringify(tmpUser)); // store data in local storge after userlogin 
      console.log("ADMIN logged in and stored in local storage:", tmpUser);
     
    }else{
      // 
      
      tmpUser = new User(getUser.id, getUser.username,getUser.email, getUser.type);
      console.log("new customer tmpUser created"+tmpUser.username + " " + tmpUser.type);

      localStorage.setItem('user', JSON.stringify(tmpUser)); 
      console.log("User logged in and stored in local storage:", tmpUser);

    }

    if (tmpUser) {
     
      setLoginUser(tmpUser);
      
      console.log("login success");


    }
    // if user is not found, alert user not found
    else {
      console.log("login failed");
      alert("Login failed: User not found ");
      setLoginUser(null);
    }

    storeUserSession(tmpUser);
  
    
  }


}



function storeUserSession(user) {
  const encryptedUser = AES.encrypt(JSON.stringify(user), 'webdev').toString();
  sessionStorage.setItem("user", encryptedUser);
}




// check user type 
const checkUserType = (user) => {
  if (user) {
    const userType = user.type;
    console.log("userType -> " + userType);
    return userType;
  } else {
    // Log or handle the case when user is null
    console.log("No user object provided.");
    return null;
  }
}




// cat wishlist
const addToWishlist = (cat) => {
  console.log("Adding to wishlist:", cat);
  setWishlist(currentWishlist => {
    const updatedWishlist = [...currentWishlist, cat];
    console.log("Updated wishlist:", updatedWishlist);
    return updatedWishlist;
  });
};

const removeFromWishlist = (catId) => {
  setWishlist(currentWishlist => currentWishlist.filter(cat => cat.cid !== catId));
};


// logout
const userLogout=()=>{
  // let tmpCart = new CartObj(1);

  // setCart(tmpCart);
  setLoginUser(null);
  
}

function updateQuantity(mid, change) {
  setCart((prevCarts) => {
      return {
          ...prevCarts,
          cart: prevCarts.cart.map(item => 
              item.mid === mid ? { ...item, amount: Math.max(1, item.amount + change) } : item
          )
      };
  });
}




  return (
    <BrowserRouter>
      <NavBar loginUser={loginUser} userLogout={userLogout} checkUserType={checkUserType}   />

        <Routes>
          <Route path="/" element={<Links loginUser={loginUser} />}>
              <Route index element={<Home loginUser={loginUser} auth={Auth} cats={cats}/>} />
              <Route path="home" element={<Home  loginUser={loginUser} auth={Auth} cats={cats}/>} />
              <Route path="adopt" element={<Adopt cats={cats} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist}/>} />
              <Route path="cafe" element={<Cafe menu={menu} addProObj={addProductObj} shoppingCart={cart}  />} />
              <Route path="sponsor" element={<Sponsor addProObj={addProductObj} shoppingCart={cart}  addSponsor={addSponsor}/>} />
              <Route path="wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
              <Route path="cart" element={<ShoppingCart  shoppingCart={cart} removeItem={removeItem} resetCart={resetCart}  updateQuantity={updateQuantity}/>} />
              <Route path="login" element={<LoginPage auth={Auth} loginUser={loginUser}  />}  />
              <Route path="admin" element={<AdminDashboard auth={Auth} loginUser={loginUser}  />}  />
              <Route path="logout"  element={<Logout userLogout= {userLogout} element={<LoginPage auth={Auth} loginUser={loginUser} />}  />} />
            </Route>
          
        </Routes>

      {/* <Footer/> */}
    </BrowserRouter>
    
  );
}

export default App;

