import React, { useState } from "react";
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header"
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function login() {

    const navigate = useNavigate()
    const [formvalues, setformvalues] = useState({
        email: "",
        password: "",
    })
    const handlelogin = async () => {
        try {
            const { email, password } = formvalues
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (err) {
            console.log(err);

        }
    }
    onAuthStateChanged(firebaseAuth, (currentuser) => {
        if (currentuser) navigate("/")
    })
    return (
        <Container >
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container flex column">
                            <input type="email" placeholder="Email Address" name="email" value={formvalues.email} onChange={(e) =>
                                setformvalues({ ...formvalues, [e.target.name]: e.target.value })
                            } />

                            <input type="password" placeholder="Password" name="password" value={formvalues.password} onChange={(e) =>
                                setformvalues({ ...formvalues, [e.target.name]: e.target.value })
                            } />


                            <button onClick={handlelogin}>Login</button>


                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
const Container = styled.div`
position : relative;
.header{
   height:200px;
   }
   .content{
   position:absolute;
   top:0;
   left:0;
   background-color:rgba(0,0,0,0.5);
   height:100vh;
   width:100vw;
   display:grid;
   grid-template-rows:15vh 85vh   
   }
   .form-container{
   gap:1 rem;
   height:85vh;
   .form{
   padding:2rem;
   background-color:#000000b0;
   width:25vw;
   gap:2rem;
   color:white;
   .container{
   gap:2rem;
   input{
   padding:0.5rem 1rem;
   width:15rem;
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
   }
   }
   }
`;
