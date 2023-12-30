import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/Products';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notification/Notification';

const Products = () => {
  // Define useState hook to set the products which will be used later to render the products available.
  const [products, setProducts] = useState([]);

  // State to select the products available.
  const [selectedProducts, setSelectedProducts] = useState([]);

  // State to provide notifications to the users.
  const [successEvent, setSuccessEvent] = useState({
    status: 0,
    message: ""
  })


  // useEffect hook to fetch all the products available before the page loads.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [products]); // Each time there is a change in the vailable products the code inside the useEffec will re render.

  const addToCart = async () => {
    try {
      // Extract id, title, and category for each selected product
      const selectedProductsData = selectedProducts.map((productId) => {

        // Select the product based on the id.
        const selectedProduct = products.find((product) => product.id === productId);

        // Return the relevant id, title, category and the image. 
        return {
          id: selectedProduct.id,
          title: selectedProduct.title,
          category: selectedProduct.category,
          image: selectedProduct.image
        };
      });

      // Get the access token from local storage.
      const accessToken = localStorage.getItem('access_token');
      
      // Make a request to the backend to add selected products to the cart
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/multiple-product-cart`, { cartItems: selectedProductsData }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add other headers if needed
        },
      });

      // Set the notification message depending upon the response status.
      if (response.status == 200) {
        setSuccessEvent({
          status: 200,
          message: "The item has been  successfully added to the cart"
        })
      }
      else {
        setSuccessEvent({
          status: 400,
          message: "Something went wrong please try again later"
        })
      }

    } catch (error) {
      setSuccessEvent({
        status: 400,
        message: "Something went wrong please try again later"
      })
    }
  };

  // Function to handle the selected products.
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

      <section class="text-gray-600 body-font bg-red-200">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Our mission
              <br class="hidden lg:inline-block" />Mico stores
            </h1>
            <p class="mb-8 leading-relaxed">We are in the mission to change the E-commerce market. Have a full transparancy on what you purchase. Full refund ploicy on each products which does not satisfies your requirements.Come join us in this amazing mission.</p>
            <div class="flex justify-center">
              <button class="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">About us</button>
              <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Subscribe</button>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img class="object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-vector/ecommerce-internet-shopping-promotion-campaign_335657-2977.jpg" />
          </div>
        </div>
      </section>


      <div className='w-full flex justify-center text-4xl font-bold mt-8'>List of products available.</div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <div key={product.id} className="group relative">
                 <p className="text-sm font-medium  bg-green-100 text-green-500 h-12 flex items-center p-2 rounded-xl mb-4">{product.category}</p>
                <NavLink className="group relative" to={`/single-product/${product.id}`}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-5/6 object-cover object-center lg:h-full lg:w-full"
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
                      <p className="mt-1 text-sm text-gray-500">{product.cartegory}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
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
          <button onClick={addToCart} className="bg-black text-white rounded-md p-4 mt-16">
            Add selected to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
