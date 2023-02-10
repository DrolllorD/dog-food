/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState, useEffect} from "react";
import {Image, Button, ButtonGroup} from "react-bootstrap";
import {Trash3} from "react-bootstrap-icons";
import "./row.css";
import Ctx from "../../Ctx";

export default ({name,pictures,cnt,price,id,discount}) => {
    const {setBasket} = useContext(Ctx);
    const [n, setN] = useState(cnt);
    const [flag, setFlag] = useState(false);
    const increment = () => {
        setFlag(true);
        setN(n + 1);
    }
    const decrement = () => {
        setFlag(true);
        setN(n - 1);
    }
    useEffect(() => {
        if (flag) {
            setBasket(prev => {
                if (n) {
                    return prev.map(el => {
                        if (el.id === id) {
                            el.cnt = n;
                        }
                        return el;
                    })
                } else {
                    return prev.filter(el => el.id !== id);
                }
            })
        }
    }, [n])
    const remove = () => {
        setBasket(prev => prev.filter(el => el.id !== id));
    }
    return <div className="cartRow">
        <div className="cartRow__img"><Image src={pictures} alt={name} /></div>
        <div className="cartRow__info">
            <div className="cartRow__name">{name}</div>
            <div className="tdButtonGroup">
                <ButtonGroup>
                    <Button variant="warning" onClick={decrement}>-</Button>
                    <Button variant="light" disabled>{n}</Button>
                    <Button variant="warning" onClick={increment}>+</Button>
                </ButtonGroup>
            </div>
            <div className="cartRow__price">
                {discount !==0 
                    ? <>
                        <p className="cartPow__firPrice">{(price *n).toFixed()}₽</p>
                        <p className="cartPow__secPrice" style={{color: "red"}}>{((price * (100 - discount) / 100) * n).toFixed()}₽</p>
                    </>
                    : <p className="cartPow__secPrice">{(price * n).toFixed()}₽</p>
                }
            </div>
            <button className="cartRow__button" onClick={remove}>
                <Trash3 style={{fontSize: "1.5em"}}/>
            </button>
        </div>
    </div>
}