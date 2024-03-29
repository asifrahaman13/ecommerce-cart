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

// Function for the signin process. 
async function SignUp(fullName,email, address, profession, password) {
    try {
        // Call the API endpoint for the 
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/signup`, {
            fullName: fullName,
            email: email,
            address: address,
            profession:profession,
            password: password
        })
        // Return the response object.
        return response
    }
    catch (err) {
        console.log(err)
    }
}


export { SignIn,SignUp }