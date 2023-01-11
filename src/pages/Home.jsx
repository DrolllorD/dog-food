/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Card from "../components/Card";
import Promotion from "../components/Promotion/promotion";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data,arrObjAds,resize}) => {
    return <>
        <div className="main__header">
            <h1>Крафтовые лакомства для собак</h1>
            <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
            <Link className="button" to="/catalog">Каталог &nbsp;<i class="fa-solid fa-chevron-right"></i></Link>
        </div>
        <Promotion />
        {!resize && window.innerWidth > 1000
            ? <div className="asd-container">
                <Ads h2={arrObjAds[0].h2} p={arrObjAds[0].p} img={arrObjAds[0].img} colD={arrObjAds[0].colorDark} colL={arrObjAds[0].colorLight} />
                <Ads h2={arrObjAds[1].h2} p={arrObjAds[1].p} img={arrObjAds[1].img} colD={arrObjAds[1].colorDark} colL={arrObjAds[1].colorLight} />
            </div>
            : <div className="asd-container">
                <Ads h2={arrObjAds[0].h2} p={arrObjAds[0].p} img={arrObjAds[0].img} colD={arrObjAds[0].colorDark} colL={arrObjAds[0].colorLight} />
            </div>
        }
        <div className="cards">
            {data.map((el, i) => <Card key={"card_" + i} data={el} like={(i + 1) % 2 === 0} />)}
        </div>
        {!resize && window.innerWidth > 1000
            ? <div className="asd-container">
                <Ads h2={arrObjAds[2].h2} p={arrObjAds[2].p} img={arrObjAds[2].img} colD={arrObjAds[2].colorDark} colL={arrObjAds[2].colorLight} />
                <Ads h2={arrObjAds[3].h2} p={arrObjAds[3].p} img={arrObjAds[3].img} colD={arrObjAds[3].colorDark} colL={arrObjAds[3].colorLight} />
            </div>
            : <div className="asd-container">
                <Ads h2={arrObjAds[2].h2} p={arrObjAds[2].p} img={arrObjAds[2].img} colD={arrObjAds[2].colorDark} colL={arrObjAds[2].colorLight} />
            </div>
        }
        <Promotion />
    </>
}