/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./footer.css";
import {ReactComponent as LogoSvg} from "./img/logo.svg";

export default () => {
    const year = new Date().getFullYear();
    return <footer>
        <div className="footer__copy">
            <LogoSvg/>
            <span>©&#171;Интернет-магазин DogFood.ru&#187;</span>
        </div>
        <div className="footer__links">
            <a href="#">Каталог</a>
            <a href="#">Акции</a>
            <a href="#">Новости</a>
            <a href="#">Отзывы</a>
        </div>
        <div className="footer__links">
            <a href="#">Оплата и доставка</a>
            <a href="#">Часто спрашивают</a>
            <a href="#">Обратная связь</a>
            <a href="#">Контакты</a>
        </div>
        <div className="footer__contact">
            <h3>Мы на связи</h3>
            <div>
                <h3>8 (999) 00-00-00</h3>
                <p>dogfood.ru@gmail.com</p>
            </div>
            <div className="footer__contact_links">
                <a href=""><i class="fa-brands fa-telegram"></i></a>
                <a href=""><i class="fa-brands fa-square-twitter"></i></a>
                <a href=""><i class="fa-brands fa-square-facebook"></i></a>
                <a href=""><i class="fa-brands fa-square-instagram"></i></a>
                <a href=""><i class="fa-brands fa-vk"></i></a>
            </div>
        </div>
    </footer>
}