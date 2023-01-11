/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./index.css";

export default ({data, like}) => {
    return <div className="card">
        {data.discount !== 0 && <div className="card__discount">-{data.discount}%</div> }
        <span className="card__heart">
            {
                like
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
        </span>
        <img src={data.pictures} alt="Изображение товара" />
        {
            data.discount !== 0 
            ? <div className="card__price red"><div className="card__price-canceled">{data.price} &#8381;</div>{(data.price/100*(100 - data.discount)).toFixed()} &#8381;</div>
            : <div className="card__price">{data.price} &#8381;</div> 
        }
        <div className="card__wight">{data.wight}</div>
        <div className="card__name">{data.name}</div>
        <button>В корзину</button>
    </div>
}