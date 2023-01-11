/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./promotion.css";

export default () => {
    return <div className="promotion">
        <div className="promotion__text">
            <h2>Подарок за первый заказ!</h2>
            <p>Лёгкое говяжье - запеченые брусочки!</p>
        </div>
        <div className="promotion__pic"><img src="https://ae04.alicdn.com/kf/S45c690d44a4c4ad8a0350bb719d7e572z.jpg_350x350.jpg" alt="Лёгкое говяжье" /></div>
    </div>
}