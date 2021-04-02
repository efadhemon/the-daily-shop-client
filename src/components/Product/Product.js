
import React from 'react';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { _id, product_name, product_wight, product_price, product_imgUrl } = props.product;
    return (
        <div className="card product-card">
            <div className="card-img-box">
                <img src={product_imgUrl} className="card-img-top" alt="..." />
            </div>
            <div className="card-body">
                <h5 className="card-title mb-4">{product_name} - {product_wight}</h5>
                <div className="d-flex">
                    <h4 className="card-text text-start">$ {product_price}</h4>
                    <Link to={'/product/'+_id} className="btn my-btn">Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;