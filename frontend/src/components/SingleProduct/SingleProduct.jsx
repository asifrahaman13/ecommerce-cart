import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProduct } from '../../api/Products';
import { addToCart, placeOrder } from '../../api/Products';
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const SingleProduct = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({
        "id": 0,
        "title": "",
        "price": 0,
        "description": "",
        "category": "",
        "image": "",
        "rating": {
            "rate": 0,
            "count": 0
        }
    })

    const [sucess, setSuccess] = useState({
        staus: 0,
        message: ""
    })

    useEffect(() => {
        // Fetch products and update state
        async function fetchProduct() {
            try {
                const productsData = await getProduct(slug);
                setProduct(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        // Call the function
        fetchProduct();
    }, [])
    const dismissNotification = () => {
        // Set the success state to an initial value
        setSuccess({
            status: 0,
            message: ''
        });
    };
    
    return (
        <>
            {sucess.staus == 200 && <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Order completed</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>{sucess.message}</p>
                        </div>
                        <div className="mt-4">
                            <div className="-mx-2 -my-1.5 flex">
                                <button
                                    type="button"
                                    className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                >
                                    View status
                                </button>
                                <button
                                    type="button"
                                    className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    onClick={dismissNotification}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}


            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image} />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                            <div class="flex mb-4">
                                <span class="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span class="text-gray-600 ml-3">{product.category}</span>
                                </span>
                            </div>
                            <p class="leading-relaxed">{product.description}</p>
                            <div class="flex mt-12">
                                <span class="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                                <button class="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded" onClick={(e) => { addToCart(product.id, product.title, product.category, setSuccess) }}>Add to cart</button>
                                <button class="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded" onClick={(e) => { placeOrder(product.id, product.title, product.category, setSuccess) }}>Place order</button>
                                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct