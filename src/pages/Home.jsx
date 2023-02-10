/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import Card from "../components/Card";
import Promotion from "../components/Promotion/promotion";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";
import Ctx from "../Ctx";

export default () => {
    const {arrObjAds, resize, products} = useContext(Ctx);
    return <>
        <div className="main__header">
            <h1>Крафтовые лакомства для собак</h1>
            <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
            <Link className="button" to="/dog-food/catalog">Каталог &nbsp;<i className="fa-solid fa-chevron-right"></i></Link>
        </div>
        <Promotion />
        {!resize && window.innerWidth > 1000
            ? <div className="asd-container">
                <Ads {...arrObjAds[0]} />
                <Ads {...arrObjAds[1]} />
            </div>
            : <div className="asd-container">
                <Ads {...arrObjAds[0]} />
            </div>
        }
        <div className="cards">
            {products.map((el, i) => <Card key={"card_" + i} data={el} />)}
        </div>
        {!resize && window.innerWidth > 1000
            ? <div className="asd-container">
                <Ads {...arrObjAds[2]} />
                <Ads {...arrObjAds[3]} />
            </div>
            : <div className="asd-container">
                <Ads {...arrObjAds[2]} />
            </div>
        }
        <Promotion />
    </>
}