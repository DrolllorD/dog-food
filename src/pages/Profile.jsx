/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useNavigate } from "react-router-dom";

export default ({setUser, user}) => {
    const navigate = useNavigate();
    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    }
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {user}!</p>
        <a onClick={logOut} style={{color: "orange"}}>Выйти из аккаунта</a>
    </>
}