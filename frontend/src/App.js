
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <BrowserRouter>
     
        <Routes>
        <Route path={"/"} element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/products" element={<Products />}/>
        </Routes>
     
      </BrowserRouter>
    </>
  );
}

export default App;
