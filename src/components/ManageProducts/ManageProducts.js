import React, { useEffect, useState } from 'react';
import ManageSingleProduct from '../ManageSingleProduct/ManageSingleProduct';
import './ManageProducts.css'

const ManageProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://the-daily-shop-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className="manage-product-container">
            <h2 className="manage-product-title">Manage Product</h2>
            <div className="manage-product-item">
                <div className="manage-product-inner">
                    <div className="row manage-product-header">
                        <h4 className="col-4">Product Name</h4>
                        <h4 className="col-3">Wight</h4>
                        <h4 className="col-3">Price</h4>
                        <h4 className="col-2">Action</h4>
                    </div>
                    {
                        products.map(product => <ManageSingleProduct product={product} key={product._id}></ManageSingleProduct>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;