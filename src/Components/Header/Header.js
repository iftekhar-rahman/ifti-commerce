import React from 'react';
import './Header.css';
import logo from '../../img/logo.png';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <header className="header-area">
            <div className="container">
                <div className="row">
                    <div className="col logo text-center p-2">
                        <img src={logo} alt="" />
                    </div>
                </div>
            </div>
            <div className="mainmenu">
                <ul>
                    <li>
                        <Link to="/">Shop</Link>
                    </li>
                    <li>
                        <Link to="/review">Review</Link>
                    </li>
                    <li>
                        <Link to="/inventory">Manage Inventory</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <button onClick={() => setLoggedInUser({})}>Sign out</button>
                </ul>
            </div>
        </header>
    );
};

export default Header;