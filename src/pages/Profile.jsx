/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-anonymous-default-export */
import React, {useContext, useState} from "react";
import {PencilSquare, XSquare, CheckSquare} from "react-bootstrap-icons";
import {Row, Col, Form, Image} from "react-bootstrap";
import Ctx from "../Ctx";

export default () => {
    const {user, api, setUser} = useContext(Ctx);
    const [nameFlag, setNameFlag] = useState(false);
    const [name, setName] = useState(user.name);
    const [textFlag, setTextFlag] = useState(false);
    const [text, setText] = useState(user.about);
    const [imgFlag, setImgFlag] = useState(false);
    const [img, setImg] = useState(user.avatar);

    const updUser = () => {
        api.updUser({
            name: name,
            about: text
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                setNameFlag(false);
                setTextFlag(false);
            })
    }
    const updUserImg = (avatar) => {
        api.updUser({
            avatar: avatar
        }, true)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                setImgFlag(false);
            })
    }

    return <Row>
        <Col xs={12} md={6}>
            <h1>Личный кабинет</h1>
            <p className="profile-row">
                {!nameFlag 
                    ? <>
                        <span className="display-6">{name}</span>
                        <PencilSquare onClick={() => setNameFlag(true)}/>
                    </>
                    : <>
                        <Form.Control type="text" value={name} required onChange={e => setName(e.target.value)}/>
                        <CheckSquare onClick={updUser}/>
                        <XSquare  onClick={() => {
                            setName(user.name);
                            setNameFlag(false);
                        }}/>
                    </>
                }
            </p>
            <p className="profile-row">
                {!textFlag 
                    ? <>
                        <span>{text}</span>
                        <PencilSquare onClick={() => setTextFlag(true)}/>
                    </>
                    : <>
                        <Form.Control type="text" value={text} required onChange={e => setText(e.target.value)}/>
                        <CheckSquare onClick={updUser}/>
                        <XSquare  onClick={() => {
                            setText(user.about);
                            setTextFlag(false);
                        }}/>
                    </>
                }
            </p>
            <p className="profile-row"><a href={`mailto:${user.email}`}>{user.email}</a></p>
            <p className="profile-row">{user.group}</p>
        </Col>
        <Col xs={12} md={6}>
            <Image src={img} alt={name} className="w-100"/>
            <p className="profile-row">
                {!imgFlag 
                    ? <>
                        <PencilSquare onClick={() => setImgFlag(true)}/>
                    </>
                    : <>
                        <Form.Control type="text" value={img} required onChange={e => setImg(e.target.value)}/>
                        <CheckSquare onClick={() => updUserImg(img)}/>
                        <XSquare  onClick={() => {
                            setImg(user.avatar);
                            setImgFlag(false);
                        }}/>
                    </>
                }
            </p>
        </Col>
    </Row>
}