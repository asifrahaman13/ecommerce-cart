import React, { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { getProducts } from '../../api/Products';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [successEvent, setSuccessEvent] = useState({
    status: 0,
    message: ""
  })
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);



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
  }, [products]);

  const addToCart = async () => {
    try {
      // Extract id, title, and category for each selected product
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/multiple-product-cart`, { cartItems: selectedProductsData }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add other headers if needed
        },
      });

      if (response.status == 200) {
        setSuccessEvent({
          status: 200,
          message: "The item has been  successfully added to the cart"
        })
      }
      console.log('Selected products added to the cart');
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

      {successEvent.status === 200 && (
        <div className="rounded-md bg-green-50 p-4 fixed top-0 w-full z-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Order completed</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>{successEvent.message}</p>
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
                    onClick={(e) => { setSuccessEvent({ status: 0, message: "" }) }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">List of products available</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
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
          <button onClick={addToCart} className="bg-black text-white rounded-md p-4">
            Add selected to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
