import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import Links from './components/Links';
import { useState, useEffect, useContext } from 'react';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import ShoppingCart from './pages/ShoppingCart';
import CatsForm from './pages/CatsForm';
import ProductForm from './pages/ProductForm';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Logout from './components/Logout';
import Registration from './pages/Registration';
import FileService from "./services/FileService";
import DataService from "./services/DataService";
import AuthService from "./services/AuthService";
import Cafe from './pages/Cafe';
import Sponsor from "./pages/Sponsor";
import Wishlist from './pages/Wishlist';
import CartObj from './classes/Cart';
import { ProductObj } from './classes/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminMenu from './pages/AdminMenu'
import AdminCats from './pages/AdminCats'
import { Admin, User } from './classes/Users';
import AES from 'crypto-js/aes'; // Import AES module for encryption
import { enc } from 'crypto-js'; // Import the 'enc' module from the 'crypto-js' library
import CartService from './services/CartService';
import { AuthContext } from './context/AuthContext';

function App() {
  // customers
  // const [users, setUsers]=useState(null);// json file user/ customers
  // const [loginUser,setLoginUser] = useState(null); // login user 
  const { loginUser, setLoginUser } = useContext(AuthContext);
  // cafe Menu
  const [menu , setMenu]= useState(null); // cafe menu 
 
  // cats
  const [cats , setCats] = useState(null); // adopt cats

  //cart
  const [cart,setCart] = useState(null);

  //wishList
  const [wishlist, setWishlist] = useState([]);

  // File error handling 
  const [error, setError] = useState(null); // file error handling

  useEffect(()=>{
  // sends request to backend to get data from database

        // Get Menu Data from backend
        DataService.getData("getProducts").then(
            (response)=>{
              setMenu(response.data);// Set menu state with loaded data in menu -> menu
                console.log("Products data from mysql : " + response.data);
            },
            (rej)=>{
                console.log(rej);// Log errors if file reading fails
                setError(rej.message || "An error occurred while getting the menu from data base.");
            }
        )

      //Get Cats Data from backend
        DataService.getData("getCats").then(
          (response)=>{
            setCats(response.data);// Set cats state with loaded data in cats -> cats
            console.log("Cats data from mysql : " + response.data);
          },
          (rej)=>{
              console.log(rej);// Log errors if file reading fails
              setError(rej.message || "An error occurred while getting the cats from database.");
          }
      )

      if (sessionStorage.getItem("user") !== null) {

        let tmpUser = sessionStorage.getItem("user");
        tmpUser = JSON.parse(AES.decrypt(tmpUser, 'webdev').toString(enc.Utf8));

        console.log('Stored user: '+tmpUser);

        tmpUser = (tmpUser.type == null) ? new User(tmpUser.id, tmpUser.username, tmpUser.email, tmpUser.type, tmpUser.sessionID) :
          new Admin(tmpUser.id, tmpUser.username, tmpUser.email, tmpUser.type, tmpUser.sessionID);

        setLoginUser(tmpUser);
        CartService.getCart(tmpUser.id, tmpUser.sessionID).then(
          (response)=>{
            setCart( new CartObj(tmpUser.id) )
            console.log('Cart form database: '+response.data)
            console.log('Cart '+cart)
            response.data.forEach(prod => {
              if(prod.mid){
                let productObj = new ProductObj(prod.id, prod.mid, null, prod.pname, prod.price, prod.amount); // Create a new product object
                addProductObj(productObj);
              } else {
                let productObj = new ProductObj(prod.id, null, prod.sid, prod.pname, prod.price, prod.amount); // Create a new product object
                addSponsor(productObj);
              }
            })
          },
          (rej)=>{
            console.log(rej)
          }
        )
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

const Auth = (user)=>{
  let tmpUser = null;

  if(user){
    setLoginUser(user);
    if(user.type === 'admin'){//admin
      tmpUser = new Admin(user.id, user.username,user.email, user.type, user.sid );
      console.log("new admin tmpUser created"+tmpUser.username + " " + tmpUser.type);

      localStorage.setItem('admin', JSON.stringify(tmpUser)); // store data in local storge after userlogin 
      console.log("ADMIN logged in and stored in local storage:", tmpUser);
     
    }else{
      // 
      
      tmpUser = new User(user.id, user.username,user.email, user.type, user.sid);
      console.log("new customer tmpUser created"+tmpUser.username + " " + tmpUser.type);

      localStorage.setItem('user', JSON.stringify(tmpUser)); 
      console.log("User logged in and stored in local storage:", tmpUser);

    }

    if (tmpUser) {
     
      setLoginUser(tmpUser);
      CartService.getCart(tmpUser.id, tmpUser.sessionID).then(
        (response)=>{
          setCart( new CartObj(tmpUser.id) )
          console.log('Cart form database: '+response.data)
          console.log('Cart '+cart)
          response.data.forEach(prod => {
            if(prod.mid){
              let productObj = new ProductObj(prod.id, prod.mid, null, prod.pname, prod.price, prod.amount); // Create a new product object
              addProductObj(productObj);
            } else {
              let productObj = new ProductObj(prod.id, null, prod.sid, prod.pname, prod.price, prod.amount); // Create a new product object
              addSponsor(productObj);
            }
          })
        },
        (rej)=>{
          console.log(rej)
        }
      )
      
      console.log("login success");

    }
    // if user is not found, alert user not found
    else {
      console.log("login failed");
      setLoginUser(null);
    }

    storeUserSession(tmpUser);
  }
}


function storeUserSession(user) {
  const encryptedUser = AES.encrypt(JSON.stringify(user), 'webdev').toString();
  sessionStorage.setItem("user", encryptedUser);
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



  return (
    <BrowserRouter>
      <NavBar />

        <Routes>
          <Route path="/" element={<Links />}>
              <Route index element={<Home auth={Auth} cats={cats}/>} />
              <Route path="home" element={<Home auth={Auth} cats={cats}/>} />
              <Route path="adopt" element={<Adopt cats={cats} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist}/>} />
              <Route path="cafe" element={<Cafe menu={menu} addProObj={addProductObj} shoppingCart={cart} />} />
              <Route path="sponsor" element={<Sponsor addProObj={addProductObj} shoppingCart={cart}  addSponsor={addSponsor}/>} />
              <Route path="wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
              <Route path="cart" element={<ShoppingCart  shoppingCart={cart}/>} />
              <Route path="login" element={<LoginPage auth={Auth}  />}  />
              <Route path="reg" element={<Registration />}  />
              <Route path="admin" element={<AdminDashboard/>}  />
              <Route path="adminMenu" element={<AdminMenu menu={menu}/>}  />
              <Route path="adminCats" element={<AdminCats cats={cats}/>}  />
              <Route path="admin/form/cat" element={<CatsForm cats={cats}/>}  />
              <Route path="admin/form/product" element={<ProductForm menu={menu} />}  />
              <Route path="logout" element={<Logout element={<LoginPage auth={Auth} />}  />} />
            </Route>
          
        </Routes>

      {/* <Footer/> */}
    </BrowserRouter>
    
  );
}

export default App;

