import React, { useState, useEffect } from 'react';
import { getCartItems } from '../../api/Products';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notification/Notification';

const CartItems = () => {
    const [successEvent, setSuccessEvent] = useState({
        status: 0,
        message: ""
    })
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const productsData = await getCartItems();
                
                setProducts(productsData.cartItems);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    const placeOrder = async () => {
        try {
            // Extract id, title, and category for each selected product
            console.log(selectedProducts)
            const selectedProductsData = selectedProducts.map((productId) => {
                const selectedProduct = products.find((product) => product.id === productId);
                return {
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    category: selectedProduct.category,
                    image: selectedProduct.image
                };
            });
            console.log({ cartItems: selectedProductsData })
            const accessToken = localStorage.getItem('access_token');
            // Make a request to the backend to add selected products to the cart
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/multiple-product-order`, { products: selectedProductsData }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // Add other headers if needed
                },
            });
            if (response.status == 200) {
                setSuccessEvent({
                    status: 200,
                    message: "The item has been successfully Purchased."
                })
            }
            
        } catch (error) {
            console.error('Error adding products to the cart:', error);
        }
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    return (
        <>

            <Notification setSuccessEvent={setSuccessEvent} successEvent={successEvent} />

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your cart items.</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products != [] && products?.map((product) => (
                            <div key={product.id} className="group relative">
                                <NavLink className="group relative" to={`/single-product/${product.id}`}>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.image}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={product.href}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                    </div>
                                </NavLink>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={placeOrder} className="bg-black text-white rounded-md p-4">
                        Place order
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartItems;
