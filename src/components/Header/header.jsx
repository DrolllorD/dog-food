/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useContext}from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import Search from "../Search/search";
import "./header.css";
import {ReactComponent as LogoSvg} from "./img/logo.svg";
import {ReactComponent as CartSvg} from "./img/ic-cart.svg";
import {ReactComponent as ProfileSvg} from "./img/ic-profile.svg";
import {ReactComponent as LogoMinSvg} from "./img/logo_min.svg";
import Dropmenu from "../Dropmenu/dropmenu";
import Ctx from "../../Ctx";
import {PlusCircle, Heart} from "react-bootstrap-icons";

export default () => {
    const {user, setUser, setModalActive, resize, favourites} = useContext(Ctx);
    const [drop, setDrop] = useState(false);
    const navigate = useNavigate();

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
        navigate("/dog-food/");
    }
    return <header>
        {!resize && window.innerWidth > 1000
            ? <Link className="logo" to="/dog-food/"><LogoSvg/></Link>
            : <Link className="logo" to="/dog-food/"><LogoMinSvg/></Link>
        }
        <Search/>
        <nav className="menu">
            {user && <Link to={"/dog-food/add"}><PlusCircle style={{fontSize: "1.3em"}}/></Link>}
            {user && <Link to={"/dog-food/favourites"} className="badge-link">
                <Heart style={{fontSize: "1.4em"}}/>
                <Badge className="badge">{favourites.length}</Badge>
            </Link>}
            {user && <CartSvg/>}
            {user && <ProfileSvg onClick={() => setDrop(!drop)}/>}
            {!user && <ProfileSvg onClick={logIn} />}
            {drop && <Dropmenu user={user} logOut={logOut} setDrop={setDrop} />}
            {user && <h2>{user.name}</h2>}
        </nav>
    </header>
}