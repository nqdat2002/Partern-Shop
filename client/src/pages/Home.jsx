import React from "react";
import img1 from "../assets/B1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { useEffect } from "react";

const Home = () => {
    const [products, setProducts] = useState([]);
    const { cart, addToCart, updateCart } = useContext(GlobalContext);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        axios({
            url: "https://server-patern-shop11.onrender.com/api/items/all_items",
            method: "get",
        })
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handlerChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        products.filter((product) => {
            return product.name.match(searchInput);
        });
    }
    // console.log(products);

    const addToCartHandler = (event) => {
        event.preventDefault();
        let id = event.target.id;

        const name = document.getElementById("hiddenname" + id).value;
        const price = document.getElementById("hiddenprice" + id).value;
        const image = document.getElementById("hiddenimage" + id).value;

        const newItem = {
            id,
            name,
            price: +price,
            image,
            quantity: 1,
        };

        const findItem = cart.find((item) => item.id === id);

        if (findItem) {
            // console.log("exist");
            updateCart(id);
            // console.log(cart);
            return;
        }

        addToCart(newItem);
        //  console.log(cart);
    };
    return (
        <div className="w-full">
            <div className="">
                <img src={img1} className="h-full w-full" alt="" />
            </div>
            <form action="" class="relative mx-auto w-1/3 mt-12 text" onChange={handlerChange} placeholder="nhập từ khóa tìm kiếm">
                <input value={searchInput} type="search"
                    class="text-black peer cursor-pointer relative h-14 w-full rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-black-300 focus:pl-16 focus:pr-4" />
                <svg xmlns="http://www.w3.org/2000/svg" class="text-red absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-black-500 px-3.5 peer-focus:border-black-500 peer-focus:stroke-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </form>
            <div className="w-full flex justify-center mt-5 mb-4">
                <div className="grid gap-4 grid-cols-3 w-[80%]">
                    {products.filter((product) => {
                        return searchInput.toLowerCase() === ''
                            ? product
                            : product.name.toLowerCase().includes(searchInput);
                    }).map((product) => {
                        return (
                            <div className="shadow" key={product._id}>
                                <img src={product.image} className="h-[400px] w-full " alt="" />

                                <div className="w-[95%] flex justify-between   my-3">
                                    <div className="mx-2">
                                        <h3>{product.name}</h3>
                                        <h4>${product.price}</h4>
                                        <input
                                            type="hidden"
                                            value={product.name}
                                            id={`hiddenname${product._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={product.price}
                                            id={`hiddenprice${product._id}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={product.image}
                                            id={`hiddenimage${product._id}`}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            id={product._id}
                                            onClick={addToCartHandler}
                                            className=" block py-2 px-5 bg-orange-400 text-white rounded hover:bg-transparent hover:text-orange-400"
                                        >
                                            Add To Cart
                                        </button>
                                        <Link to={`productdetails/${product._id}`}>
                                            <button className="py-2 px-5 my-2  hover:text-blue-400 rounded bg-transparent text-orange-400">
                                                details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
