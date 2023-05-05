import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aboutus from "./pages/Aboutus";
import Cart from "./pages/Cart";
import React, { useState } from "react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext/GlobalContext";
import AddNewProduct from "./pages/AddNewProduct";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  const navigate = useNavigate();

  const { IsLoggedIn, LoginStatus } = useContext(GlobalContext);
  const [username, setUsername] = useState("");
  //console.log(LoginStatus); 

  const token = Cookie.get("jwt_token");
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/user/verify_account",
        { token },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        if (!res.data.status) {
          Cookie.remove("jwt_token");
          IsLoggedIn(false);
        } else {
          //console.log(res.data);
          IsLoggedIn(true);
          setUsername(res.data.username);
        }
      })
      .catch((err) => {
        console.log(`Request err: ${err}`);
      });
  // eslint-disable-next-line
  }, [navigate]);

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <div className="fixed w-full">
        <Navbar Username={username}/>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="aboutus" element={<Aboutus />} />
        {LoginStatus ? (
          <>
            <Route path="addnewproduct" element={<AddNewProduct />} />
            <Route path="profile" element={<Profile Username={username}/>} />
            <Route path= "admindashboard" element={<AdminDashboard/>} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        <Route path="productdetails/:productid" element={<ProductDetails />} />
        <Route path="updateproduct/:productid" element={<UpdateProduct />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
