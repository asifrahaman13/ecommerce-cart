import express from "express";
import connectToMongo from "./connection/connection.js";
import cors from "cors";
const app = express();
import { config } from "dotenv";
import { user_signup_router } from "./routers/auth/auth.js";
import { products_router } from "./routers/products/products.js";


// Call the connectToMongo function to establish the connection
(async () => {
    try {
        await connectToMongo();
        console.log("Connected to MongoDB");
        // You can start your application logic here
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

// Load environment variables from .env file
config();


const port = 8000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/auth/", user_signup_router)
app.use("/products/", products_router)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
