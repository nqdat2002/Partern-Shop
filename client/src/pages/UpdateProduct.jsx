import React, { useEffect } from "react";
import axios from "axios";
import { useParams, Link} from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const params = useParams();
    const productid = params.productid;
    // console.log(productid);
    const navigate = useNavigate();

    const [inputs, setinputs] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setinputs((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        axios({
            url: `https://server-patern-shop11.onrender.com/api/items/get_item/${productid}`,
            method: "get",
        })
            .then((res) => {
                setinputs({
                    name: res.data.name,
                    price: res.data.price,
                    image: res.data.image,
                    description: res.data.description
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productid]);

    const editProduct = () =>{
        axios({
            url: `https://server-patern-shop11.onrender.com/api/items/edit/${productid}`,
            method: "put",
        })
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    return (
        <div className="w-full absolute mt-[80px] flex justify-center items-center">
            <form
                className="bg-white p-4 shadow-md border rounded my-5 py-3"
                onSubmit={editProduct}
            >
                <h2 className="text-center w-full p-3 text-gray-500 text-xl font-bold">
                    Edit Product
                </h2>
                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="username">
                        Product Name
                    </label>
                    <input
                        type="text"
                        placeholder="name"
                        id="name"
                        name="name"
                        value={inputs.name}
                        onChange={onChangeHandler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md border border-gray-500 rounded"
                    />
                </div>

                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="password">
                        Product Price
                    </label>
                    <input
                        type="number"
                        placeholder="Price"
                        id="price"
                        value={inputs.price}
                        onChange={onChangeHandler}
                        name="price"
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                    />
                </div>

                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="password">
                        Product Image (Link)
                    </label>
                    <textarea
                        name="image"
                        value={inputs.image}
                        onChange={onChangeHandler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                    ></textarea>
                </div>

                <div className="mb-2">
                    <label className="text-gray-500 mb-2 font-bold" htmlFor="password">
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        value={inputs.description}
                        onChange={onChangeHandler}
                        className="w-full py-2 px-3 text-gray-500 shadow focus:outline-none focus:shadow-md  border border-gray-500 rounded"
                    ></textarea>
                </div>

                <div className="flex justify-between items-center my-3 mb-5">
                    <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
                        Save
                    </button>
                    <Link to={`/productdetails/${productid}`}>
                    <button className="text-white font-bold bg-blue-500 py-2 px-3 border rounder hover:bg-blue-700">
                        Cancel
                    </button>
                    </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateProduct;
