/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./header.css";

export default () => {
    let user = localStorage.getItem("user");
    const logIn = (e) => {
        e.preventDefault();
        let name = prompt("Как вас зовут?");
        if (name) {
            localStorage.setItem("user", name);
        }
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
    }
    return <header>
        <a className="logo" href="">DogFood</a>
        <input type="search" placeholder="Поиск..." className="search" />
        <nav className="menu">
            {user && <a href="">{user}</a>}
            {!user && <a href="" onClick={logIn}>Войти</a>}
            {user && <a href="" onClick={logOut}>Выйти</a>}
        </nav>
    </header>
}