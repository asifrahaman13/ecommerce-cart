import axios from "axios"

// Function for the signin process. 
async function SignIn(email, password) {

    try {
        // Call the API endpoint for the 
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/login`, {
            email: email,
            password: password
        })
        // Return the response object.
        return response
    }
    catch (err) {
        console.log(err)
    }
}


export { SignIn }