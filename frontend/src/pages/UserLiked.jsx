import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchmovies, getGenres, getuserlikedmovies } from '../store/index'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default function UserLiked() {
    const [isscrolled, setisscrolled] = useState(false)
    const navigate = useNavigate()
    const movies = useSelector((state) => state.netflix.movies)

    const dispatch = useDispatch()

    const [email, setemail] = useState(undefined)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
            if (currentuser) {
                setemail(currentuser.email);
            } else {
                navigate("/login");
            }
        });
    
        return () => unsubscribe();  // Cleanup the listener on unmount
    }, []);
    


    useEffect(() => {
        if (email) {
            dispatch(getuserlikedmovies(email))
        }
    }, [email])


    window.onscroll = () => {
        setisscrolled(window.scrollY === 0 ? false : true)
        return () => (window.onscroll = null)
    }



    return (
        <Container>
            <Navbar isscrolled={isscrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {
                        movies.map((movies, index) => {
                            return <Card moviedata={movies} index={index} key={movies.id} isliked={true} />
                        })
                    }
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;