
import React from 'react';

const OrdersDetails = ({orderedProduct}) => {
    const {product_name, product_wight, product_price, ordersDate} = orderedProduct;
    return (
        <div className="row p-3">
            <p className="col-4">{product_name}</p>
            <p className="col-3">{product_wight}</p>
            <p className="col-2">${product_price}</p>
            <p className="col-3 text-right">{(new Date(ordersDate).toDateString('dd/MM./yyyy'))}</p>
        </div>
    );
};

export default OrdersDetails;