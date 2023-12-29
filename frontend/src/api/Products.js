import axios from "axios"

async function getProducts() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/products`);
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

async function getProduct(id) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-details`, { id: id });
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

async function placeOrder(id, title, category) {
    console.log(id,title,category);
    const accessToken=localStorage.getItem('access_token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-order`, { id: id, title: title, category: category }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });
        return response.data
    }
    catch (e) {
        console.log("Error")
    }
}

async function addToCart(id, title, category) {
    const accessToken=localStorage.getItem('access_token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-cart`, { id: id, title: title, category: category },{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });
        console.log(response)
        return response.data
    }
    catch (e) {
        console.log("Error")
    }
}

export { getProducts, getProduct, placeOrder, addToCart }