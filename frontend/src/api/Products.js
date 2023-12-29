import axios from "axios"

async function getProducts() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/products`);
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

async function getCartItems() {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/all-cart-items`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // Add other headers if needed
                },
            }
        );
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

async function placeOrder(id, title, category, setSuccess) {
    console.log(id, title, category);
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-order`, { id: id, title: title, category: category }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });
        setSuccess({ staus: response.status, message: "You have successfully purchased this item." })
        return response.data
    }
    catch (e) {
        console.log("Error")
    }
}

async function addToCart(id, title, category, setSuccess) {
    const accessToken = localStorage.getItem('access_token');
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-cart`, { id: id, title: title, category: category }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });

        setSuccess({ staus: response.status, message: "You have successfully added the item to the cart." })
        return response.data
    }
    catch (e) {
        console.log("Error")
    }
}

export { getProducts, getProduct, placeOrder, addToCart, getCartItems }