/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState, useEffect} from "react";
import {EmojiFrown} from "react-bootstrap-icons";
import {Truck} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Ctx from "../Ctx";
import Row from "../components/Row/row";

export default () => {
    const [gds, setGds] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [fullPrice, setFullPrice] = useState(0);
    const {basket, goods, ending} = useContext(Ctx);
    let countProd = basket.reduce((acc, el) => acc + el.cnt, 0);
    useEffect(() => {
        let arr = [];
        if(goods.length){
            basket.forEach(el => {
                arr.push(goods.filter(g => g._id === el.id)[0])
            })
        }
        setGds(arr);
    }, [basket, goods])
    useEffect(() => {
        gds.length && setDiscountPrice(basket.reduce((acc, el, i) => {
            acc += ((gds[i].price * (100 - gds[i].discount) / 100) * el.cnt);
            return acc;
        }, 0).toFixed());
        gds.length && setFullPrice(basket.reduce((acc, el, i) => {
            acc += (gds[i].price * el.cnt);
            return acc;
        }, 0).toFixed());
    }, [gds])
    return <>
        <h1><b>{countProd} товар{ending(countProd.toString())[1]}</b> в корзине</h1>
        {basket.length > 0 && gds.length > 0 
            ? <div className="cart">
                <div className="cartGoods">
                    {basket.map((el, i) => <Row key={`row_${el.id}`} {...gds[i]} {...el} />)}
                </div>
                <div className="cartOrder">
                    <div className="order">
                        <h4 className="order__header">Ваша корзина</h4>
                        <div className="order__price">
                            <div className="order__price-row">
                                <p style={{opacity: 0.5}}>Товары ({countProd})</p>
                                <p>{fullPrice} ₽</p>
                            </div>
                            <div className="order__price-row">
                                <p style={{opacity: 0.5}}>Скидка</p>
                                <p style={{color: "red"}}>-{fullPrice - discountPrice} ₽</p>
                            </div>
                            <hr />
                            <div className="order__price-row">
                                <p>Общая стоимость</p>
                                <p>{discountPrice} ₽</p>
                            </div>
                        </div>
                        <button className="btnOrderPrice">Оформить заказ</button>
                    </div>
                    <div className="mainProd__info">
                        <div className="mainProd__icon"><Truck style={{fontSize: "2em", opacity: "0.5"}}/></div>
                        <div className="mainProd__text">
                            <h3>Доставка по всему миру!</h3>
                            <p>Доставка курьером - <b>от 399 ₽</b></p>
                            <p>Доствка в пункт выдачи - <b>от 199 ₽</b></p>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="empty-block">
                <EmojiFrown/>
                <h3>В корзине нет товаров</h3>
                <p>Добавьте товар, нажав кнопку "В козину"</p>
                <Link to="/dog-food/catalog" className="btn">В каталог</Link>
            </div>
        }
    </>
}