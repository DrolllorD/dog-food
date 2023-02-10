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
        <h1 style={{marginBottom: "1em"}} >Список любимых товаров</h1>
        {favourites.length > 0 
        ? <> 
            <div className="cards">
                {favourites && paginate.setPageData().map((el, i) => <Link to={`/dog-food/catalog/${el._id}`} key={el._id}><Card key={"card_" + i} data={el} /></Link>)}
            </div>
            <Pagination hook={paginate} />
        </>
        : <div className="empty-block">
            <EmojiFrown/>
            <h3>Вы ещё не добавили ни одного любимого товара</h3>
            <p>Добавьте товар в раздел, кликнув по иконке сердечка</p>
            <Link to="/dog-food/catalog" className="btn">В каталог</Link>
        </div>}
    </>
}