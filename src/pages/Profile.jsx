/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import Ctx from "../Ctx";

export default () => {
    const {user, setUser} = useContext(Ctx);
    const navigate = useNavigate();
    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user");
        navigate("/dog-food/");
    }
    return <>
        <h1>Личный кабинет</h1>
        <p>Привет, {user && user.name}!</p>
        <a onClick={logOut} style={{color: "orange"}}>Выйти из аккаунта</a>
    </>
}