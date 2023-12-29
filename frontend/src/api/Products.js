import axios from "axios"

async function getProducts() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/products`);
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

export { getProducts }