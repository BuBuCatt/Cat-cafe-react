import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Links from "./components/Links";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Adopt from "./pages/Adopt";
import ShoppingCart from "./pages/ShoppingCart";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import FileService from "./services/FileService";
import Cafe from "./pages/Cafe";
import Sponsor from "./pages/Sponsor";
import Wishlist from "./pages/Wishlist";
import CartObj from "./classes/Cart";
import { ProductObj } from "./classes/Cart";
import Admin from "./pages/Admin";

function App() {
  // customers
  const [users, setUsers] = useState(null); // json file user/ customers
  const [loginUser, setLoginUser] = useState(null); // login user
  // cafe Menu
  const [menu, setMenu] = useState(null); // cafe menu
  // cats
  const [cats, setCats] = useState(null); // adopt cats

  //cart
  const [cart, setCart] = useState(new CartObj(1));

  //wishList

  const [wishlist, setWishlist] = useState([]);
  // App.js
  const [isAdmin, setIsAdmin] = useState(false);
  const cartObj = new CartObj();

  // File error handling
  const [error, setError] = useState(null); // file error handling

  useEffect(() => {
    // read the users file then get the data

    // Read the customer json file
    FileService.read("customers").then(
      (response) => {
        setUsers(response.data); // Set users state with loaded data in users -> users
        console.log("Json file customers Obj : " + response.data);
      },
      (rej) => {
        console.log(rej); // Log errors if file reading fails
        setError(
          rej.message || "An error occurred while reading the customers file."
        );
      }
    );
    //read cafe menu json file
    FileService.read("menu").then(
      (response) => {
        setMenu(response.data); // Set Menu state with loaded data  -> cafe menu
        console.log("Json file Cafe Menu Obj : " + response.data);
      },
      (rej) => {
        console.log(rej); // Log errors if file reading fails
        setError(
          rej.message || "An error occurred while reading the menu file."
        );
      }
    );

    //read cafe menu json file
    FileService.read("cats").then(
      (response) => {
        setCats(response.data); // Set Cats state with loaded data  -> Adopt Cats
        console.log("Json file Adopt Cats Obj : " + response.data);
      },
      (rej) => {
        console.log(rej); // Log errors if file reading fails
        setError(
          rej.message || "An error occurred while reading the cats file."
        );
      }
    );
  }, []);

  const addProductObj = (productObj) => {
    setCart((prevCart) => {
      prevCart.addProduct(productObj);
      return prevCart;
    });
  };

  const removeItem = (mid) => {
    setCart((prevCart) => {
      const newCart = new CartObj(prevCart.uid);

      prevCart.cart.forEach((product, key) => {
        console.log("This is key" + key);
        if (key != mid) {
          newCart.addProduct(
            new ProductObj(key, product.pname, product.price, product.amount)
          );
        }
      });

      return newCart;
    });
  };

  const resetCart = () => {
    setCart((prevCart) => {
      prevCart.removeProduct();
      return new CartObj(prevCart.uid);
    });
  };

  const Auth = (userObj) => {
    for (let user of users) {
      console.log("user:", user);
      console.log("userObj:", userObj);

      if (user.email == userObj.email && user.pass == userObj.pass) {
        setLoginUser(user);
        if (user.isAdmin) {
          setIsAdmin(true);
        }
        console.log("User logged in:", user);
      }
    }

    console.log("app" + userObj.email);
    console.log("app" + userObj.pass);
  };

  // cat wishlist
  const addToWishlist = (cat) => {
    console.log("Adding to wishlist:", cat);
    setWishlist((currentWishlist) => {
      const updatedWishlist = [...currentWishlist, cat];
      console.log("Updated wishlist:", updatedWishlist);
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (catId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((cat) => cat.cid !== catId)
    );
  };

  // logout
  const userLogout = () => {
    setLoginUser(null);
  };

  return (
    <BrowserRouter>
      <NavBar
        isAdmin={isAdmin}
        menu={menu}
        loginUser={loginUser}
        userLogout={userLogout}
      />

      <Routes>
        <Route path="/" element={<Links loginUser={loginUser} />}>
          <Route
            index
            element={<Home loginUser={loginUser} auth={Auth} cats={cats} />}
          />
          <Route
            path="home"
            element={<Home loginUser={loginUser} auth={Auth} cats={cats} />}
          />
          <Route
            path="adopt"
            element={
              <Adopt
                cats={cats}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />
          <Route
            path="cafe"
            element={
              <Cafe menu={menu} addProObj={addProductObj} shoppingCart={cart} />
            }
          />
          <Route
            path="sponsor"
            element={<Sponsor addProObj={addProductObj} shoppingCart={cart} />}
          />
          <Route
            path="wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />
          {isAdmin ? (
            <Route
              path="admin/:userId"
              element={
                <Admin
                  users={users}
                  cart={cart}
                  modifyProduct={cartObj.modifyProduct}
                  removeProduct={cartObj.removeProduct}
                />
              }
            />
          ) : null}
          <Route
            path="cart"
            element={
              <ShoppingCart
                shoppingCart={cart}
                removeItem={removeItem}
                resetCart={resetCart}
              />
            }
          />
          <Route
            path="login"
            element={<LoginPage auth={Auth} loginUser={loginUser} />}
          />
          <Route
            path="logout"
            element={
              <Logout
                userLogout={userLogout}
                element={<LoginPage auth={Auth} loginUser={loginUser} />}
              />
            }
          />
        </Route>
      </Routes>

      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
