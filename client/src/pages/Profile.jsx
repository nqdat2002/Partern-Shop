import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";

const Profile = () => {
    const [inputs, setInputs] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
    });

    const token = Cookie.get("jwt_token");
    useEffect(() => {
        axios
            .post(
                "https://server-patern-shop11.onrender.com/api/user/verify_account",
                { token },
                { withCredentials: true }
            )
            .then((res) => {
                if (!res.data.status) {
                    Cookie.remove("jwt_token");
                } else {
                    setInputs({
                        username: res.data.username + '',
                        firstname: res.data.firstname + '',
                        lastname: res.data.lastname + '',
                        email: res.data.email + '',
                    });
                    // console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(`Request err: ${err}`);
            });
        // eslint-disable-next-line
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/user/updateinfor/${inputs.username}`, { ...inputs })
            .then((res) => {
                console.log(res.data);
                if (res.data.error_type === 1) {
                    toast.error(res.data.message, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else if (res.data.error_type === 0) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                    );
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <div className="w-full flex justify-center items-center">

            
            <form onSubmit={submitHandler} className="absolute top-32 bg-white p-4 shadow-md border rounded my-5 py-3">
                <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
                    Your Profile
                </h2>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" for='username'> Username </label>
                    <input value={inputs.username} onChange={onChangeHandler} disabled type="text" placeholder="username" id='username' name='username' 
                    className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded" />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" for='firstname'> Firstname </label>
                    <input value={inputs.firstname} onChange={onChangeHandler} type="text" placeholder='firstname' id='firstname' name='firstname' 
                    className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded" />
                </div>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" for='lastname'> Lastname </label>
                    <input value={inputs.lastname} onChange={onChangeHandler} type="text" placeholder="lastname" id='lastname' name='lastname' 
                    className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded" />
                </div>

                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" for='email'> Email </label>
                    <input value={inputs.email} onChange={onChangeHandler} type="text" placeholder="email" id='email' name='email' 
                    className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded" />
                </div>

                <div className="mt-10 flex justify-between items-center my-3 mb-5">
                    {/* flex flex-col justify-between items-center my-3 mb-5 */}
                    <button className="text-white font-bold bg-blue-500 py-2 px-5 border rounder hover:bg-blue-700">
                        Save
                    </button>

                    <Link to='/' className="text-blue-500">
                        <button className="text-white font-bold bg-blue-500 py-2 px-5 border rounder hover:bg-blue-700">
                            Cancel
                        </button>
                    </Link>

                </div>
                <Link to='/' className="text-blue-500">Change Your Password?</Link>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Profile;
