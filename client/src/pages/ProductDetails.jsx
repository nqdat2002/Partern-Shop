import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { useNavigate, Link } from "react-router-dom";
import Cookie from "js-cookie";
const ProductDetails = () => {
    const params = useParams();
    const productid = params.productid;
    // console.log(productid);
    const { cart, addToCart, updateCart } = useContext(GlobalContext);

    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    const [isadmin, setadmin] = useState(false);
    const token = Cookie.get("jwt_token");

    useEffect(() => {
        axios
            .post(
                "https://server-patern-shop11.onrender.com/api/user/verify_account",
                { token },
                { withCredentials: true }
            )
            .then((res) => {
                // console.log(res);
                if (!res.data.status) {
                } else {
                    //console.log(res.data);
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

    useEffect(() => {
        axios({
            url: `https://server-patern-shop11.onrender.com/api/items/get_item/${productid}`,
            method: "get",
        })
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productid]);

    const addToCartHandler = () => {
        const newItem = {
            id: product._id,
            name: product.name,
            price: +product.price,
            image: product.image,
            quantity: 1,
        };

        const findItem = cart.find((item) => item.id === product._id);

        if (findItem) {
            //console.log("exist");
            updateCart(product._id);
            // console.log(cart);
            return;
        }

        addToCart(newItem);

        //console.log(cart);
        //console.log(newItem);
    };

    const deleteProduct = () =>{
        axios({
            url: `https://server-patern-shop11.onrender.com/api/items/delete/${productid}`,
            method: "delete",
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
        <div className="w-full h-100 flex justify-center ">
            <div className="w-[80%] mt-[90px] grid gap-4 grid-cols-2">
                <div>
                    <img src={product.image} className="w-full" alt="" />
                </div>
                <div className="grid gap-4">
                    <div>
                        <h2 className="hover:text-red-400 font-bold">[ {product.name} ]</h2>
                        <h3 className="my-2">${product.price}</h3>
                        <p className="hover:text-[#DB4040]">{product.description}</p>
                    </div>

                    <div >
                        <button
                            onClick={addToCartHandler}
                            className="w-54 self-end block py-2 px-5 bg-[#DB4040] text-red-200 font-bold rounded hover:bg-transparent hover:text-[#DB4040]"
                        >
                            Add To Cart
                        </button>
                        {isadmin ? (
                            <>
                                <button
                                    onClick={deleteProduct}
                                    className="mt-20 w-54 self-end block py-2 px-5 bg-[#DB4040] text-red-200 font-bold rounded hover:bg-transparent hover:text-[#DB4040]"
                                >
                                    Delete Products
                                </button>

                                <Link to={`/updateproduct/${product._id}`}>
                                <button
                                    className="mt-20 w-54 self-end block py-2 px-5 bg-[#DB4040] text-red-200 font-bold rounded hover:bg-transparent hover:text-[#DB4040]"
                                >
                                    Edit Product
                                </button>
                                </Link>

                            </>
                        ) :
                            <></>}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
