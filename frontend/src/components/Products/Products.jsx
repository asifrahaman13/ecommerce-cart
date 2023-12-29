
import React, { useState, useEffect } from 'react';
import { getProducts } from '../../api/Products';

const Products = () => {
    // State to store the products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products and update state
        async function fetchProducts() {
            try {
                const productsData = await getProducts();
                setProducts(productsData);
                console.log(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        // Call the function
        fetchProducts();
    }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

    return (
        <>
           {products.map((product) => (
                <div key={product.id}>
                    {/* Render each product */}
                    <p>{product.title}</p>
                </div>
            ))}
        </>
    );
};

export default Products;
