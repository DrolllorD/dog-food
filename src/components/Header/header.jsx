/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Search from "../Search/search";
import "./header.css";
import {ReactComponent as LogoSvg} from "./img/logo.svg";
import {ReactComponent as FavoritesSvg} from "./img/ic-favorites.svg";
import {ReactComponent as CartSvg} from "./img/ic-cart.svg";
import {ReactComponent as ProfileSvg} from "./img/ic-profile.svg";

export default ({user, setUser,products, setModalActive}) => {
    // const [user, setUser] = useState(localStorage.getItem("user"));

    // let user = localStorage.getItem("user");
    const logIn = (e) => {
        e.preventDefault();
        // let name = prompt("Как вас зовут?");
        // if (name) {
        //     localStorage.setItem("user", name);
        //     setUser(name);
        // }
        setModalActive(prev => !prev);
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setUser("");
    }
    return <header>
        <div className="header__content">
            <a className="logo" href="#"><LogoSvg/></a>
            <Search data={products}/>
            <nav className="menu">
                {/* <FavoritesSvg/>
                <CartSvg/>
                <ProfileSvg/> */}
                {user && <a href="#">{user}</a>}
                {!user && <a href="#" onClick={logIn}>Войти</a>}
                {user && <a href="#" onClick={logOut}>Выйти</a>}
            </nav>
        </div>
    </header>
}