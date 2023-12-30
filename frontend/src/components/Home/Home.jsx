import React, { useEffect, useState } from 'react'
import Products from '../Products/Products';
import CartItems from '../Cartitems/Cartitems';
import Users from '../Users/Users';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Home = () => {
  // Define a hook to manage the component of the homepage.
  const [component, setComponent] = useState("products");

  // Define a hook to check whether the user is logged in or not.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to hanle the component swap.
  function handleChangeComponent(e) {
    setComponent(e.target.name);
  }

  //  Use the useEffect hook to check if the user is logged in or not.
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [])

  // Function to remove the access token from the local storage.
  function handleLogout() {
    localStorage.removeItem('access_token');
    window.location.href = "/"
  }

  return (
    <>

      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Mico</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button className="mr-5 text-xl font-bold text-yellow-600" name="products" onClick={(e) => { handleChangeComponent(e) }}>Products</button>
            <button className="mr-5 text-xl font-bold text-yellow-600" name="cartitems" onClick={(e) => { handleChangeComponent(e) }}>Cart Items</button>
            <button className="mr-5 text-xl font-bold text-yellow-600" name="users" onClick={(e) => { handleChangeComponent(e) }}>Users</button>
            {isLoggedIn == true ? <button to="login" className="mr-5 text-xl font-bold text-yellow-600" onClick={(e) => { handleLogout() }}>Logout</button> : <><NavLink to="login" className="mr-5 text-xl font-bold text-yellow-600" >Login</NavLink>

              <NavLink to="signup" className="mr-5 text-xl font-bold text-yellow-600" >Sign up</NavLink></>
            }
          </nav>
        </div>
      </header>
      {component == "products" && <Products />}
      {component == "cartitems" && <CartItems />}
      {component == "users" && <Users />}
      <Footer />
    </>
  )
}

export default Home