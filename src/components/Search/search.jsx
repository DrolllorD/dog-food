/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useContext} from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import {ReactComponent as SearchImg} from "./img/magnifying-glass-solid.svg";
import {ReactComponent as CloseImg} from "./img/circle-xmark-regular.svg";
import Ctx from "../../Ctx";

export default () => {
    const {goods, setVisibleGoods, ending} = useContext(Ctx);
    const navigate = useNavigate();
    const [text, updateText] = useState("");
    const [searchData, setSearchData] = useState(goods);
    const clearSearch = () => {
        updateText("");
        setSearchData(goods);
        setVisibleGoods(goods);
    }
    const search = (e) => {
        navigate("/dog-food/catalog");
        updateText(e.target.value);
        let arr = goods.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchData(arr);
        setVisibleGoods(arr);
    }
    let con = searchData.length.toString();
    return <div className="search-block">
        <input placeholder="Поиск" value={text} onChange={search} maxLength="30" />
        <button>{text ? <CloseImg onClick={clearSearch} /> : <SearchImg/>}</button>
        {text && <div className="search-result">
            По запросу <b>{text}</b>&nbsp;
            {searchData.length > 0 ? `найден${ending(con)[0]} ${searchData.length} продукт${ending(con)[1]}` : "не найдено ни одного продукта"}
        </div>}
    </div>
}