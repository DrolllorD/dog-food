/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {Link} from "react-router-dom";
import "./dropmenu.css";

export default ({user, logOut, setDrop}) => {
    return <div className="menu__drop">
        <h2>{user}</h2>
        <Link to="/dog-food/profile" onClick={() => setDrop(false)}>Личный кабинет</Link>
        <a href="#" onClick={logOut}>Выйти</a>
    </div>
}