import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
// import happyImage from '../../img/giphy.gif';



const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    // remove product from UI and Database
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts)
    }, [])

    // let thankyou;
    // if(orderPlaced){
    //     thankyou = <img src={happyImage} alt="" />   
    // }

    return (
        <section className="review-area pt-5 pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        {
                            cart.map(pd => <ReviewItem 
                                removeProduct={removeProduct}
                                key={pd.key}
                                product={pd}
                                ></ReviewItem>)
                        }
                        
                    </div>
                    <div className="col-lg-3">
                        <Cart cart={cart}>
                            <button onClick={handleProceedCheckout} className="btn btn-danger">Proceed Checkout</button>
                        </Cart>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;