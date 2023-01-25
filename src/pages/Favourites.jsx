/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

export default () => {
    const {favourites} = useContext(Ctx);
    const paginate = usePagination(favourites, 12);
    return <>
        {favourites.length > 0 
        ? <>
            <div className="main__header">
                <h1>Список любимых товаров</h1>
                <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
            </div>
            <div className="cards">
                {favourites && paginate.setPageData().map((el, i) => <Link to={`/dog-food/catalog/${el._id}`} key={el._id}><Card key={"card_" + i} data={el} /></Link>)}
            </div>
            <Pagination hook={paginate} />
        </>
        : <div className="empty-block">
            <EmojiFrown/>
            <p>Вы ещё не добавили ни одного любимого товара</p>
            <Link to="/dog-food/catalog" className="btn">В каталог</Link>
        </div>}
    </>
}