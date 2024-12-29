import React, { useState } from "react";
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header"
import { firebaseAuth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [showpassword, setshowpassword] = useState(false)
    const navigate = useNavigate()
    const [formvalues, setformvalues] = useState({
        email: "",
        password: "",
    })
    const handlesignin = async () => {
        try {
            const { email, password } = formvalues
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        } catch (err) {
            console.log(err);

        }
    }
    onAuthStateChanged(firebaseAuth,(currentuser)=>{
        if(currentuser) navigate("/")
    })
    return (<Container showpassword={showpassword}>
        <BackgroundImage />
        <div className="content">
            <div className="header">
                <Header login />
            </div>
            <div className="body flex column a-center j-center">

                <div className="text flex column">
                    <h1>Unlimited Movies, TV shows and more </h1><br />
                    <h2>Watch anywhere anytime </h2><br />
                    <h3>Ready to watch? Enter your email to create or restart membership</h3><br />
                </div>
                <div className="form">
                    <input type="email" placeholder="Email Address" name="email" value={formvalues.email} onChange={(e) =>
                        setformvalues({ ...formvalues, [e.target.name]: e.target.value })
                    } />
                    {
                        showpassword && (
                            <input type="password" placeholder="Password" name="password" value={formvalues.password} onChange={(e) =>
                                setformvalues({ ...formvalues, [e.target.name]: e.target.value })
                            } />
                        )
                    }

                    {
                        !showpassword &&( <button onClick={() => setshowpassword(true)}>Get Started</button>)
                    }

                </div>
                <button onClick={handlesignin}>Signup</button>
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
   .body{
   gap:1rem;
   .text{
   gap:1rem;
   text-align:center;
   font-size:2rem;
   h1{
   padding:0 25rem
   }
   }
   .form{
   display:grid;
   grid-template-columns:${({ showpassword }) => showpassword ? "1fr 1fr" : "2fr 1fr"};
   width:60%;
   input{
   color:black;
   border:none;
   padding:10px;
   font-size:20px;
   border:1px solid black;
   &:focus{
   outline:none;
   }
   }
   button{
    padding:10px ;
    background-color: #e50914;
    border:none;
    cursor:pointer;
    color:white;
    
    font-weight:bolder;
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
   }
`;
