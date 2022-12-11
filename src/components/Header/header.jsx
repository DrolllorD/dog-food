/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Search from "../Search/search";
import "./header.css";

export default ({user, setUser,products}) => {
    // const [user, setUser] = useState(localStorage.getItem("user"));

    // let user = localStorage.getItem("user");
    const logIn = (e) => {
        e.preventDefault();
        let name = prompt("Как вас зовут?");
        if (name) {
            localStorage.setItem("user", name);
            setUser(name);
        }
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setUser("");
    }
    return <header>
        <a className="logo" href="#">DogFood</a>
        <Search data={products}/>
        <nav className="menu">
            {user && <a href="#">{user}</a>}
            {!user && <a href="#" onClick={logIn}>Войти</a>}
            {user && <a href="#" onClick={logOut}>Выйти</a>}
        </nav>
    </header>
}