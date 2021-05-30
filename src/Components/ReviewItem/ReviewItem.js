import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {

    const {img, name, price, seller, quantity, key} = props.product;
    
    return (
        <div className="products-wrap">
            <div className="left">
                <img src={img} alt="" />
            </div>
            <div className="right">
                <h4>{name}</h4>
                <p>By: {seller}</p>
                <h6>${price}</h6>
                <p>Quantity {quantity} .</p>

                <button onClick={() => props.removeProduct(key)} className="btn btn-danger">Remove product</button>
            </div>
        </div>
    );
};

export default ReviewItem;