import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
// console.log(fakeData);

const Shop = () => {

    const first10 = fakeData.slice(0, 10);

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setProducts(first10);
    }, []);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        } )      
        setCart(previousCart);
    }, []);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <section className="main-content-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        {
                            products.map(product => <Product 
                                key={product.key}
                                product={product} 
                                handleAddProduct={handleAddProduct}
                                ></Product>)
                        }
                    </div>
                    <div className="col-lg-3">
                        <Cart cart={cart}>
                            <Link to="/review">
                                <button className="btn btn-danger">Order Review</button>
                            </Link>
                        </Cart>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;