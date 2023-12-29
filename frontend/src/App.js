
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Products from "./components/Products/Products";
import SingleProduct from "./components/SingleProduct/SingleProduct";

function App() {
  return (
    <>
      <BrowserRouter>
     
        <Routes>
        <Route path={"/"} element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/single-product/:slug" element={<SingleProduct />}/>
        </Routes>
     
      </BrowserRouter>
    </>
  );
}

export default App;
