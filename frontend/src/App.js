
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Products from "./components/Products/Products";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import CartItems from "./components/Cartitems/Cartitems";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          3
          <Route path={"/"} element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/single-product/:slug" element={<SingleProduct />} />
          <Route path="/Cartitems" element={<CartItems />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
