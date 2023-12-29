import { Schema, model } from "mongoose";


// Define a separate schema for key-value pairs
const productData = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    }
});

// Create Mongoose schema for users
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const productSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    cartItems: {
        type: [productData],
        default: [],
    },
    placeOrder: {
        type: [productData],
        default: [],
    }
});

// Set the name of the collection as cart_users.
const User = model("cart_users", userSchema);
const Product = model('users_products', productSchema)
const SingleProduct = model('single_products', productData)

// Export the user schema.
export { User, Product, SingleProduct };
