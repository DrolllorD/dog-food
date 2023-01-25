/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {Link} from "react-router-dom";
import "./dropmenu.css";

export default ({logOut, setDrop}) => {
    return <div className="menu__drop">
        <Link to="/dog-food/profile" onClick={() => setDrop(false)}>Личный кабинет</Link>
        <a href="#" onClick={logOut}>Выйти</a>
    </div>
}