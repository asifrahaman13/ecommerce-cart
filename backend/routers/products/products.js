// Import the required libraries
import express from "express";
import axios from "axios";
import { checkUserRegistration } from "../auth/auth_middleware.js";
import { Product } from "../../schemas/schemas.js";
import { SingleProduct } from "../../schemas/schemas.js";

// Fake store API form .env file.
const FAKE_STORE_API = process.env.FAKE_STORE_API

const products_router = express.Router();

// API to get all the products.
products_router.get("/products", async (req, res) => {

    try {
        // Call the fake store API to get dummy products.
        const products = await axios.get(`${FAKE_STORE_API}/products?limit=15`)

        // If the status code in 200 then return the products.
        if (products.status === 200) {
            return res.json(products.data)
        }

        // Return error message if there is any error. 
        return res
            .status(500)
            .json({ success: false, message: "Some error occured." });
    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Some error occured." });
    }
})

// API to get all the products.
products_router.post("/product-details", async (req, res) => {
    const { id } = req.body
    console.log(id)
    try {
        // Call the fake store API to get dummy products.
        const products = await axios.get(`${FAKE_STORE_API}/products/${id}`)


        // If the status code in 200 then return the products.
        if (products.status === 200) {
            return res.json(products.data)
        }

        // Return error message if there is any error. 
        return res
            .status(500)
            .json({ success: false, message: "Some error occured." });
    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Some error occured." });
    }
})

products_router.post("/product-cart", checkUserRegistration, async (req, res) => {

    try {
        const { id, title, category } = req.body

        const { email } = req.user;
        const CartItems = new SingleProduct({
            id: id,
            title: title,
            category: category
        })

        const user_data = await Product.findOne({ email })

        if (user_data) {
            user_data.cartItems.push(CartItems)
            await user_data.save()
            return res.json({ "message": "The cart item was successfully" })
        }
        else {
            const new_user_data = new Product({
                email: email,
                cartItems: CartItems,
                placeOrder: []
            })
            await new_user_data.save()
            return res.json({ "message": "The cart item was successfully" })
        }

    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Some error occured" });
    }
})

products_router.post("/product-order", checkUserRegistration, async (req, res) => {

    try {
        const { id, title, category } = req.body

        const { email } = req.user;
        const orderItems = new SingleProduct({
            id: id,
            title: title,
            category: category
        })

        const user_data = await Product.findOne({ email })

        if (user_data) {
            user_data.placeOrder.push(orderItems)
            await user_data.save()
            return res.json({ "message": "The item is ordered successfully" })
        }
        else {
            const new_user_data = new Product({
                email: email,
                placeOrder: orderItems,
                cartItems: []
            })
            new_user_data.save()
            return res.json({ "message": "TThe item is ordered successfully" })
        }

    }
    catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Some error occured" });
    }
})

export { products_router }