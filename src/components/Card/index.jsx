/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState} from "react";
import Ctx from "../../Ctx";
import "./index.css";

export default ({data}) => {
    const {user, setFavourites, api, setGoods, setBasket, setVisibleGoods} = useContext(Ctx);
    const [like, setLike] = useState(data.likes && data.likes.includes(user._id));

    const update = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setLike(!like);
        api.setLike(data._id, like)
            .then(res => res.json())
            .then(data => {
                setFavourites(prev => {
                    let arr = prev.filter(el => el._id === data._id);
                    return arr.length > 0 ? prev.filter(el => el._id !== data._id) : [...prev, data];
                })
                setGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }))
                setVisibleGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }))
            })
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === data._id);
            if (test.length) {
                return prev.map(el => {
                    if (el.id === data._id) {
                        el.cnt++;
                    }
                    return el;
                });
            } else {
                return [...prev, {id: data._id, cnt: 1}];
            }
        })
    }

    return <div className="card">
        {data.discount !== 0 && <div className="card__discount">-{data.discount}%</div> }
        <span className="card__heart" onClick={update}>
            {
                data.likes 
                    ? like
                        ? <i className="fa-solid fa-heart"></i>
                        : <i className="fa-regular fa-heart"></i>
                    : null
                
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
        {data.likes && <button className="card__cart" onClick={buy}>В корзину</button>}
    </div>
}