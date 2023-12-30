import React, { useEffect, useState } from 'react'
import Products from '../Products/Products';
import CartItems from '../Cartitems/Cartitems';
import { NavLink } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Home = () => {

  const [component, setComponent] = useState("products");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function handleChangeComponent(e) {
    setComponent(e.target.name);
    console.log(e.target.name);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken)
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('access_token');
    window.location.href = "/"
  }

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Mico</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button className="mr-5 hover:text-gray-900" name="products" onClick={(e) => { handleChangeComponent(e) }}>Products</button>
            <button className="mr-5 hover:text-gray-900" name="cartitems" onClick={(e) => { handleChangeComponent(e) }}>Cart Items</button>
            {isLoggedIn == true ? <button to="login" className="mr-5 hover:text-gray-900" onClick={(e) => { handleLogout() }}>Logout</button> : <NavLink to="login" className="mr-5 hover:text-gray-900" >Login</NavLink>}
          </nav>
        </div>
      </header>
      {component == "products" && <Products />}
      {component == "cartitems" && <CartItems />}
      <Footer />
    </>
  )
}

export default Home