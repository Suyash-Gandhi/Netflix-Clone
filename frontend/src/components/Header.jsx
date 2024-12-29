import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"
export default function Header(props) {
    const navigate = useNavigate()
    return <Container className="flex a-center j-between">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <button onClick={() => navigate(props.login ? "/login" : "/signup")}> {props.login ? "Login" : "Signin"}

        </button>
    </Container>

}
const Container = styled.div`

padding:20px;
.logo{
    img{
        height:100px;
    }
}
button{
    padding:10px ;
    background-color: #e50914;
    border:none;
    cursor:pointer;
    color:white;
    border-radius:4px;
    font-weight:bolder;
    
}
`