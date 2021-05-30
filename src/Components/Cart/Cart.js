import React from 'react';

import './Cart.css';

const Cart = (props) => {
    // console.log(props);
    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    } else if( total > 15){
        shipping = 4.99;
    } else if(total > 0){
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);

    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = (num) => {
        const procession = num.toFixed(2);
        return Number(procession);
    }

    return (
        <div className="cart-content">
            <h3 className="text-danger">Order Summery</h3>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax: {tax}</p>
            <p>Total Price: {grandTotal}</p>
            {/* <button className="btn btn-danger mt-3">Order Review</button> */}
            
            {
                props.children
            }
        </div>
    );
};

export default Cart;