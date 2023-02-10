/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {XLg} from "react-bootstrap-icons";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./redact.css";
import Ctx from "../../Ctx";

export default ({editProd, setEditProd, product, id, setProduct}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(100);
    const [wight, setWight] = useState("");
    const [stock, setStock] = useState(10);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [pictures, setPictures] = useState("");

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setWight(product.wight);
            setStock(product.stock);
            setDiscount(product.discount);
            setDescription(product.description);
            setPictures(product.pictures);
        }
    }, [])

    const {api, setVisibleGoods} = useContext(Ctx);
    const navigate = useNavigate();

    const handler = (e) => {
        e.preventDefault();
        let body = {
            name: name || "Название отсутствует",
            price: price || 0,
            wight: wight || "Вес не задан",
            stock: stock || 0,
            description: description || "Тут скоро появится описание товара",
            discount: discount,
            pictures: pictures
        }
        if(editProd){
            api.changeProduct(id, body)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setProduct(data);
                    clear();
                    setEditProd(false);
                    api.getProducts()
                    .then(res => res.json())
                    .then(data => {
                        setVisibleGoods(data.products);
                    })
                }
            })
        }else{
            api.addProduct(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setVisibleGoods(prev => [...prev, data]);
                    clear();
                    navigate(`/dog-food/catalog/${data._id}`);
                }
            })
        }
    }
    const clear =() => {
        setName("");
        setPrice(100);
        setWight("");
        setDiscount(0);
        setStock(10);
        setDescription("");
        setPictures("");
    }
    return <>
        {editProd && <button className="btn closeEditProd" onClick={() => setEditProd(false)}><XLg/></button>}
        {editProd ? <h1>Редактировать товар</h1> : <h1>Добавить товар</h1>}
        <Form onSubmit={handler}>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Название товара</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            required
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)}
                            step="10"
                            min={0}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Вес</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={wight} 
                            placeholder="100 г"
                            onChange={e => setWight(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Скидка</Form.Label>
                        <Form.Select
                            value={discount} 
                            onChange={e => setDiscount(e.target.value)}
                        >
                            <option value={0}>Без скидки</option>
                            <option value={5}>5%</option>
                            <option value={10}>10%</option>
                            <option value={15}>15%</option>
                            <option value={20}>20%</option>
                            <option value={25}>25%</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Количество на складе</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={stock} 
                            onChange={e => setStock(e.target.value)}
                            min={0}
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                    <div className="form-preview mb-2" style={{backgroundImage: pictures 
                    ? `url(${pictures})` 
                    : "url(https://pusat.edu.np/wp-content/uploads/2022/09/default-image.jpg)"}}/>
                    <Form.Group className="mb-3">
                        <Form.Label>Изображение</Form.Label>
                        <Form.Control 
                            type="url" 
                            value={pictures}
                            onChange={e => setPictures(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control 
                            as="textarea"
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    {editProd ? <Button variant={"warning"} type="submit">Редактировать товар</Button> : <Button variant={"warning"} type="submit">Добавить товар</Button>}
                </Col>
            </Row>
        </Form>
    </>
}