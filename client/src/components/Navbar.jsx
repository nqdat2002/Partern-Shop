import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Navbar = (Username) => {
    const [nav, setnav] = useState(false);
    const [isadmin, setadmin] = useState(false);

    const { LoginStatus, IsLoggedIn, cart } = useContext(GlobalContext);
    const navigate = useNavigate();

    const navHandeler = () => {
        setnav(!nav);
    };

    const logoutHandler = () => {
        Cookie.remove("jwt_token");
        IsLoggedIn(false);
        navigate("home");
    };
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
                    IsLoggedIn(false);
                } else {
                    //console.log(res.data);
                    IsLoggedIn(true);
                    if (res.data.role === 'admin') {
                        setadmin(true);
                    }
                    else setadmin(false);
                }
            })
            .catch((err) => {
                console.log(`Request err: ${err}`);
            });
        // eslint-disable-next-line
    }, [navigate]);


    return (
        <div className="w-full h-30 bg-[#DB4040] flex justify-between items-center">
            <h1 className="text-white font-bold md:text-4xl sm:3xl text-xl p-3">
                <Link to="/">
                    PATERN Ecommerce
                </Link>

            </h1>

            <ul className="hidden md:flex p-4">

                <Link to="/">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">Home</li>
                </Link>

                <Link to="cart">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">Cart
                        <span className="px-1 py-0.4 bg-orange-400 rounded-full ">{cart.length}</span>
                    </li>
                </Link>
                {LoginStatus ? (
                    <>
                        <Link to="addnewproduct">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Add New Product
                            </li>
                        </Link>
                        {isadmin ? (<>
                            <Link to="admindashboard">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    User Management
                                </li>
                            </Link>
                        </>) : <>

                        </>}
                        <Link to="profile">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Hi, {Username.Username}
                            </li>
                        </Link>

                        <Link to="/">
                            <li
                                onClick={logoutHandler}
                                className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
                            >
                                Logout
                            </li>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Login
                            </li>
                        </Link>
                        <Link to="register">
                            <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                Register
                            </li>
                        </Link>
                    </>
                )}
                <Link to="aboutus">
                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">About us</li>
                </Link>


            </ul>

            <div className="md:hidden">
                {
                    nav ? (
                        <AiOutlineClose onClick={(navHandeler)} className="text-white text-6xl px-2" />
                    ) : (
                        <AiOutlineMenu onClick={(navHandeler)} className="text-white text-6xl px-2" />
                    )
                }

            </div>

            <div className={nav ? "md:hidden fixed top-0 left-0 h-[100%] w-60 bg-[#000300] ease-in-out duration-300" : "hidden "}>
                <h1 className="text-white text-left font-bold md:text-4xl sm:3xl text-xl p-3">
                    PATERN E-COMMERCE
                </h1>

                <ul className=" flex flex-col text-left p-4">
                    <Link to="/">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">Home</li>
                    </Link>

                    <Link to="cart">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">Cart
                            <span className="px-1 py-0.4 bg-orange-400 rounded-full ">{cart.length}</span>
                        </li>
                    </Link>

                    {LoginStatus ? (
                        <>
                            <Link to="addnewproduct">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Add New Product
                                </li>
                            </Link>
                            {isadmin ? (<>
                                <Link to="admindashboard">
                                    <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                        User Management
                                    </li>
                                </Link>
                            </>) : <>

                            </>}
                            <Link to="profile">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    {/* Profile */}
                                    Hi, {Username.Username}
                                </li>
                            </Link>
                            <Link to="/">
                                <li
                                    onClick={logoutHandler}
                                    className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer"
                                >
                                    Logout
                                </li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Login
                                </li>
                            </Link>
                            <Link to="register">
                                <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">
                                    Register
                                </li>
                            </Link>
                        </>
                    )}

                    <Link to="aboutus">
                        <li className="text-white font-bold p-2 hover:bg-[#2C2A2A] cursor-pointer">About us</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;