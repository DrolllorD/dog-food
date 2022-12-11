/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./footer.css";

export default () => {
    const year = new Date().getFullYear();
    return <footer>
        <span className="footer__copy">©{year}</span>
        <span className="footer__text">Сайт разработан с использованием <br/> библиотеки React</span>
    </footer>
}