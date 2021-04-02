
import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Home.css';
const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://the-daily-shop-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className="container  products-container">

            {
                products.length === 0 &&
                <div className="loading-spinner">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            }

            {
                products.map(product => <Product product={product} key={product._id}></Product>)
            }
        </div>
    );
};

export default Home;