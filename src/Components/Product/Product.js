import React from 'react';
import './Product.css'

const Product = (props) => {
    // console.log(props.product);
    const {img, name, price, seller, stock} = props.product;
    // const {name} = props.product;

    
    return (
        <div className="products-wrap">
            <div className="left">
                <img src={img} alt="" />
            </div>
            <div className="right">
                <h4>{name}</h4>
                <p>By: {seller}</p>
                <h6>${price}</h6>
                <p>Only {stock} left in stock - order soon.</p>
                <button onClick={() => props.handleAddProduct(props.product)} className="btn btn-danger">Add to cart</button>
            </div>
        </div>
    );
};

export default Product;