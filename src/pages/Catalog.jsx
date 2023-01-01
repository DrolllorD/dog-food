/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Card from "../components/Card";

export default ({data}) => {
    return <>
        <div className="main__header">
            <h1>Крафтовые лакомства для собак</h1>
            <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
            <button>Каталог <i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="cards">
            {data.map((el, i) => <Card key={"card_" + i} text={el.name} like={(i + 1) % 2 === 0} />)}
        </div>
    </>
}