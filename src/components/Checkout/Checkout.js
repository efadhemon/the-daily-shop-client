
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import './checkout.css'

const Checkout = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        fetch(`https://the-daily-shop-server.herokuapp.com/product/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productId])

    const {product_name, product_price, product_wight} = product;

    const handleOrders = () => {
        const ordersDate = new Date();
        const customerInfo ={}
        customerInfo.customer_name = loggedInUser.name;
        customerInfo.customer_email = loggedInUser.email;
        customerInfo.customer_photo = loggedInUser.photo;
        const newOrder = {...customerInfo, product_name, product_price, product_wight, ordersDate};
        fetch('https://the-daily-shop-server.herokuapp.com/addOrders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newOrder)
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                alert('Thanks your product has been successfully ordered');
                history.replace('/orders')
            }
        })
    }

    return (
        <div className="container  checkout">
            <h2 className="table-title">Checkout</h2>
            <div className="table">
                <div className="table-head row">
                    <p className="col-5">Description</p>
                    <p className="col-4 text-center">Quantity</p>
                    <p className="col-3 text-right">Price</p>
                </div>
                <div className="table-data row">
                    <h5 className="col-5">{product_name}</h5>
                    <h5 className="col-4 text-center">1</h5>
                    <h5 className="col-3 text-right">${product_price}</h5>
                </div>
                <div className="table-end row">
                    <h5 className="col-6">Total</h5>
                    <h5 className="col-6 text-right">${product_price}</h5>
                </div>
            </div>
            <div className="checkout-btn">
                <button onClick={handleOrders} className="btn my-btn">Checkout</button>
            </div>
        </div>
    );
};

export default Checkout;