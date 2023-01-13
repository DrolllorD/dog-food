/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useContext}from "react";
import {Link} from "react-router-dom";
import Search from "../Search/search";
import "./header.css";
import {ReactComponent as LogoSvg} from "./img/logo.svg";
import {ReactComponent as FavoritesSvg} from "./img/ic-favorites.svg";
import {ReactComponent as CartSvg} from "./img/ic-cart.svg";
import {ReactComponent as ProfileSvg} from "./img/ic-profile.svg";
import {ReactComponent as LogoMinSvg} from "./img/logo_min.svg";
import Dropmenu from "../Dropmenu/dropmenu";
import Ctx from "../../Ctx";

export default ({goods, searchGoods, setModalActive, resize}) => {
    const {user,setUser} = useContext(Ctx);
    const [drop, setDrop] = useState(false);

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
        setDrop(!drop);
    }
    return <header>
        {!resize && window.innerWidth > 1000
            ? <Link className="logo" to="/"><LogoSvg/></Link>
            : <Link className="logo" to="/"><LogoMinSvg/></Link>
        }
        <Search data={goods} searchGoods={searchGoods}/>
        <nav className="menu">
            {user && <FavoritesSvg/>}
            {user && <CartSvg/>}
            {user && <ProfileSvg onClick={() => setDrop(!drop)}/>}
            {!user && <ProfileSvg onClick={logIn} />}
            {drop && <Dropmenu user={user} logOut={logOut} setDrop={setDrop} />}
        </nav>
    </header>
}