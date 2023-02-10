/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState, useEffect} from "react";
import Card from "../components/Card";
import {Link} from "react-router-dom";
import {EmojiFrown, SortNumericDown, SortNumericUp} from "react-bootstrap-icons";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

export default () => {
    const {user, visibleGoods} = useContext(Ctx);
    const [sortGoods, setSortGoods] = useState(visibleGoods);
    const paginate = usePagination(sortGoods, 12);
    const [btnType, setBtnType] = useState("");
    const updSort =(e) => {
        let el = e.currentTarget;
        let flag = false;
        if (el.classList.contains("sort")) {
            el.classList.remove("sort");
            setBtnType("");
            flag = true;
        } else {
            el.classList.add("sort");
            setBtnType(el.title);
        }
        if (flag) {
            setSortGoods(visibleGoods);
        } else {
            let data =[...visibleGoods];
            switch (el.title) {
                case "down":
                    data.sort((a,b) => a.price - b.price);
                    break;
                case "up":
                    data.sort((a,b) => b.price - a.price);
                    break;
                case "new":
                    data = data.filter(d => d.tags.includes("new"));
                    break;
                case "sale":
                    data = data.filter(el => el.discount > 0);
                    break;
            }
            setSortGoods(data);
        }
    }
    useEffect(() => {
        setSortGoods(visibleGoods);
    }, [visibleGoods])
    return <>
        {user
            ? <>
                {visibleGoods.length > 0 
                ? <>
                    <div className="main__header">
                        <h1>Каталог собачьих лакомств</h1>
                        <p>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    </div>
                    <div className="card__filters">
                        <button className={`btn ${btnType === "up" ? "sort" : ""}`} title="up" onClick={updSort}><SortNumericUp/> цены</button>
                        <button className={`btn ${btnType === "down" ? "sort" : ""}`} title="down" onClick={updSort}><SortNumericDown/> цены</button>
                        <button className={`btn ${btnType === "new" ? "sort" : ""}`} title="new" onClick={updSort}>Новинки</button>
                        <button className={`btn ${btnType === "sale" ? "sort" : ""}`} title="sale" onClick={updSort}>Скидка</button>
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