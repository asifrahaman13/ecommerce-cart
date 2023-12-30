
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/single-product/:slug" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
