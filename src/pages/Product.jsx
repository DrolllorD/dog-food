/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import {useParams, Link} from "react-router-dom";
import Review from "../components/Review/review";

export default ({}) => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    let token = localStorage.getItem("token8");
    useEffect(() => {
        if(token){
            fetch(`https://api.react-learning.ru/products/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                setProduct(data);
            })
        }
    }, [])
    return <>
        <h1>{product.name || "Страница товара"}</h1>
        <p>{id}</p>
        <Link to="/catalog">Назад</Link>
        <h2>Отзывы</h2>
        <div className="reviews">
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} key={i} />)}
        </div>
    </>
}