/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {Trash3, ChevronLeft, Star, StarHalf, StarFill, Truck, ShieldCheck, Pencil} from "react-bootstrap-icons";
import Review from "../components/Review/review";
import Redact from "../components/Redact/redact";
import Ctx from "../Ctx";

export default () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(0);
    const [groupUsers, setGroupUsers] = useState([]);
    const [text, setText] = useState("");
    const [ratingRev, setRatingRev] = useState(0);
    const [formReviews, setFormReviews] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [editProd, setEditProd] = useState(false);
    const {api, user, setGoods, ending, setRedact} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data =>{
                setProduct(data);
                console.log(data);
            })
    }, [])
    useEffect(() => {
        api.getAllUsers()
            .then(res => res.json())
            .then(data =>{
                setGroupUsers(data);
            })
    }, [])
    const remove = () => {
        if(window.confirm('Удалить отзыв?')){
            api.delProduct(id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setGoods(prev => prev.filter(g => g._id !== data._id))
                    navigate(`/dog-food/catalog`);
                }
            })
        }
    }
    const setRating = (n) => {
        let float = n.toFixed(2);
        let int = Number(float[0]);
        let fract = Number(float.slice(2,4));
        let half = 0;
        if(fract >= 75){
            int++;
        }else if(fract >= 25 && fract < 75) {
            half++;
        }
        let stars = [];
        for (let i = 0; i < int; i++) {
            stars.push(<StarFill key={i}/>);
        }
        half && stars.push(<StarHalf/>);
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i}/>);
        }
        return stars;
    }
    const average = (arr) => {
        let sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i].rating;
        }
        return (sum/arr.length);
    }

    const handler = (e) => {
        e.preventDefault();
        let body = {
            rating: Number(ratingRev) || 3,
            text: text || "Ничего особенного"
        }
        console.log(body);
        api.addReview(id, body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setProduct(data);
                    clear();
                    setFormReviews(false);
                }
            })
    }
    const clear =() => {
        setText("");
        setRatingRev(0);
    }

    return <>
        {editProd 
        ? <Redact editProd={editProd} setEditProd={setEditProd} product={product} id={id} setProduct={setProduct} />
        : <>
            <Link to="/dog-food/catalog" className="productBack"><ChevronLeft style={{fontSize: "0.8em"}}/>Назад</Link>
            {product && product.author && product.author._id === user._id && <div className="redactProd">
                <button onClick={setEditProd} className="btn"><Pencil/>  Редактировать</button>
                <button onClick={remove} className="btn"><Trash3/>  Удалить</button>
            </div>}
            <h1 className="productName">{product.name || "Страница товара"}</h1>
            <p>ID товара: {id}</p>
            <div className="prodRate">
                {product.reviews && product.reviews.length > 0 && <>
                    {setRating(average(product.reviews))}<span style={{color: "#222"}}>{product.reviews.length} отзыв{ending(product.reviews)[1]}</span >
                </>}
            </div>
            <div className="mainProd">
                <div className="mainProd__img">
                    {product.discount !== 0 && <div className="mainProd__discount">-{product.discount}%</div> }
                    <img src={product.pictures} alt="Изображение товара" />
                </div>
                <div className="mainProd__content">
                    {
                        product.discount !== 0 
                        ? <div className="mainProd__price red"><div className="mainProd__price-canceled">{product.price} &#8381;</div>{(product.price/100*(100 - product.discount)).toFixed()} &#8381;</div>
                        : <div className="mainProd__price">{product.price} &#8381;</div> 
                    }
                    <div className="mainProd_buy">
                        <div className="mainProd_counter">
                            <button className="butLeft" disabled={count === 0} onClick={() => setCount(Math.max (count - 1, 0))}>-</button>
                            <input className="mainProd__input" maxLength="5" type="text" value={count} onChange={(e) => setCount(Number(e.target.value))} />
                            <button className="butRight" onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        <button className="btnBasket">В корзину</button>
                    </div>
                    <div className="mainProd__info">
                        <div className="mainProd__icon"><Truck style={{fontSize: "3em", opacity: "0.5"}}/></div>
                        <div className="mainProd__text">
                            <h3>Доставка по всему миру!</h3>
                            <p>Доставка курьером - <b>от 399 ₽</b></p>
                            <p>Доствка в пункт выдачи - <b>от 199 ₽</b></p>
                        </div>
                    </div>
                    <div className="mainProd__info">
                        <div className="mainProd__icon"><ShieldCheck style={{fontSize: "3em", opacity: "0.5"}}/></div>
                        <div className="mainProd__text">
                            <h3>Гарантия качества</h3>
                            <p>Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетварить ваши нужды.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="prodDescription">
                <h2>Описание</h2>
                <p>{product.description}</p>
            </div>
            <div className="prodCharacteristics">
                <h2>Характеристики</h2>
                <p className="opa">Вес</p>
                <p>{`1 шт ${parseFloat(product.wight)} грамм`}</p>
                <p className="opa">Цена</p>
                <p>{`${(product.price/100*(100 - product.discount)).toFixed()} ₽ за ${parseFloat(product.wight)} грамм`}</p>
            </div>
            <div className="prodReviews">
                <h2>Отзывы</h2>
                <button className="btn showReviews" onClick={() => setShowReviews(!showReviews)}>{showReviews === false ? "Показать отзывы" : "Скрыть отзывы"}</button>
                <button className="btn addReviews" onClick={() => setFormReviews(!formReviews)}>{formReviews === false ? "Оставить отзыв" : "Скрыть форму отзыва" }</button>
                {formReviews &&
                <div className="formReview">
                    <Form onSubmit={handler}>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Оцените товар :</Form.Label>
                            <Form.Check inline type="radio" id = "r1" name="group1" label="1" value={1} onChange={(e) => setRatingRev(e.target.value)} />
                            <Form.Check inline type="radio" id = "r2" name="group1" label="2" value={2} onChange={(e) => setRatingRev(e.target.value)} />
                            <Form.Check inline type="radio" id = "r3" name="group1" label="3" value={3} onChange={(e) => setRatingRev(e.target.value)} />
                            <Form.Check inline type="radio" id = "r4" name="group1" label="4" value={4} onChange={(e) => setRatingRev(e.target.value)}/>
                            <Form.Check inline type="radio" id = "r5" name="group1" label="5" value={5} onChange={(e) => setRatingRev(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Опишите товар</Form.Label>
                            <Form.Control as="textarea" rows={3} value={text} required onChange={e => setText(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Оставить отзыв
                        </Button>
                    </Form>
                </div>}
                <div className="reviews">
                    {showReviews && product.reviews && product.reviews.length > 0 && groupUsers.length > 0 && product.reviews.map((el, i) => <Review {...el} groupUsers={groupUsers} setProduct={setProduct} setRating = {setRating} key={i} />)}
                </div>
            </div>
        </>}
    </>
}