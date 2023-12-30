import axios from "axios"

// Function to get all the products from the backend API.
async function getProducts() {
    try {
        // Call the backend API to get all the products available.
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/products`);

        // Send the the data.
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

async function getCartItems() {
    // Get the access token from the local storage.
    const accessToken = localStorage.getItem('access_token');
    try {
        // Get all the cart items of the user.
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/products/all-cart-items`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // Add other headers if needed
                },
            }
        );

        // Return the cart item data. 
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

// Function to get information about a single product using the id. 
async function getProduct(id) {

    try {
        // Call the backend API to fetch the single product information.
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-details`, { id: id });

        // Send the data.
        return response.data
    } catch (e) {
        console.log("Error")
    }
}

async function placeOrder(id, title, category, setSuccessEvent) {
    // Get the access token from the local storage.
    const accessToken = localStorage.getItem('access_token');

    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-order`, { id: id, title: title, category: category }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });

        if (response.status === 200) {
            // Set success or failure message.
            setSuccessEvent({ status: 200, message: "You have successfully purchased this item." })
        }
        else {
            // Set success or failure message.
            setSuccessEvent({ status: 400, message: "Something went wrong" })
        }
        // Send the data.
        return response.data
    }
    catch (e) {

        // Set success or failure message.
        setSuccessEvent({ status: 400, message: "Some error occured please try again later." })
    }
}

async function addToCart(id, title, category, setSuccessEvent) {

    // Get the access token from the local storage.
    const accessToken = localStorage.getItem('access_token');

    try {
        // Make a post request to add the product in the cart.
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/products/product-cart`, { id: id, title: title, category: category }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // Add other headers if needed
            },
        });

        if (response.status === 200) {
            // Set success or failure message.
            setSuccessEvent({ status: 200, message: "You have successfully purchased this item." })
        }
        else {
            // Set success or failure message.
            setSuccessEvent({ status: 400, message: "Something went wrong" })
        }

        // Send the data.
        return response.data
    }
    catch (e) {
        // Set success or failure message.
        setSuccessEvent({ status: 400, message: "Some error occured please try again later." })
    }
}

export { getProducts, getProduct, placeOrder, addToCart, getCartItems }