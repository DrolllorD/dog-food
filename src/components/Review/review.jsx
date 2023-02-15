/* eslint-disable import/no-anonymous-default-export */
import React, {useContext} from "react";
import {Trash} from "react-bootstrap-icons";
import Ctx from "../../Ctx";
import "./review.css";

export default ({author, product, _id, rating, created_at, setRating, text, groupUsers, setProduct}) => {
    const auth = groupUsers.filter((el) => el._id === author)[0].name;
    const {api, user} = useContext(Ctx);
    const remove = () => {
        if(window.confirm('Удалить отзыв?')){
            api.delReview(product, _id)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setProduct(data);
                }
            })
        }
    }
    return <div className="review">
        <div className="review__img">
            <img src="https://media.tenor.com/yp_aFUgHMx8AAAAC/nakanoart-nakanodrawing.gif" alt="User" />
        </div>
        <div className="review__content">
            {author === user._id && <button className="btn delRev" onClick={remove}><Trash/></button>}
            <h3>{auth || "Гость"}</h3>
            <div>{new Date(created_at).toLocaleString()}</div>
            <div>{setRating(rating)}</div>
            <div>{text}</div>
        </div>
    </div>
}