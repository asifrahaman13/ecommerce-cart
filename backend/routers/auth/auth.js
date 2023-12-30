// Import the required libraries
import express from "express";
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import { User } from "../../schemas/schemas.js";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
config();

// Get the secret key from the environment variable.
const SECRET_KEY = process.env.SECRET_KEY;

// Crete a router for the authentication of the users.
const user_signup_router = express.Router();

user_signup_router.post("/signup", async (req, res) => {
    const { fullName, email, address, profession, password } = req.body;
    
    // Find the document of the usrs corresponding to the email address.
    const user = await User.findOne({ email });
    
    // If the user already exists then send a error message.
    if (user) {
        return res.status(203).send({ message: "Username already exitss" });
    }
    try {
        // Store user data in the database (including the OTP)
        const hashedPassword = await hash(password, 10);
        
        try {
            // Create a new schema to save the data. 
            const newUser = new User({
                fullName,
                address,
                email,
                profession,
                password: hashedPassword,
            });
            await newUser.save();
            
        } catch (err) {
            console.log(err);
        }

        return res.json({
            success: true,
            message: "You have signed up",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Signup failed. Please try again." });
    }
});

// Login API
user_signup_router.post("/login", async (req, res) => {
    
    try {
        // Extract the email and the password from the body.
        var { email, password } = req.body;
        try {
            // Check if the user exists and is verified
            const user = await User.findOne({ email });

            // Use destructruring method to extract the relevant data from the users data.
            var { email, fullName, address, profession } = user;

            // If the user exits then only move forward.

            if (user) {
                // Compare the passwords.
                const passwordMatch = await compare(password, user.password);
                // If password matches then only generate the access token
                if (passwordMatch) {
                    // Generate an access token
                    const accessToken = jwt.sign(
                        {
                            email,
                            fullName,
                            address,
                            profession,
                        },
                        SECRET_KEY,
                        {
                            expiresIn: "1w", // Token expires in 1 hour, adjust this as needed
                        }
                    );

                    // Send the success message and the access token.
                    return res.json({
                        success: true,
                        message: `Welcome, ${user.fullName}!`,
                        accessToken: accessToken, // Include the access token in the response
                    });
                } else {
                    res
                        .status(401)
                        .json({ success: false, message: "Incorrect email or password." });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or unverified account.",
                });
            }
        } catch (err) {
            return res
            .status(401)
            .json({ success: false, message: "Incorrect email or password." });
        }
    } catch (error) {
        console.error("Error in /login:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
});

user_signup_router.get("/users", async (req, res) => {
    try {
        // Get all the users from the database.
        const allUsers = await User.find();
        
        // Return all the users in the JSON format.
        return res.json(allUsers)
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Some error occured." });
    }
});

export { user_signup_router };
