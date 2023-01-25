/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

export default () => {
    const {user, visibleGoods} = useContext(Ctx);
    const paginate = usePagination(visibleGoods, 12);
    return <>
        {user
            ? <>
                {visibleGoods.length > 0 
                ? <>
                    <div className="main__header">
                        <h1>Каталог собачьих лакомств</h1>
                        <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    </div>
                    <div className="cards">
                        {visibleGoods && paginate.setPageData().map((el, i) => <Link to={`/dog-food/catalog/${el._id}`} key={el._id}><Card key={"card_" + i} data={el} /></Link>)}
                    </div>
                    <Pagination hook={paginate} />
                </>
                : <div className="empty-block">
                    <EmojiFrown/>
                    <p>Простите, по вашему запросу товаров не найдено</p>
                    <Link to="/dog-food/" className="btn">На главную страницу</Link>
                </div>}
            </>
            : <div className="empty-block">
                <EmojiFrown/>
                <p>Вам необходимо авторизоваться для доступа к товарам</p>
                <Link to="/dog-food/" className="btn">На главную страницу</Link>
            </div>}
    </>
}