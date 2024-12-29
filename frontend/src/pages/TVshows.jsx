import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchmovies, getGenres } from '../store'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Slider from "../components/Slider"
import Selectgenres from '../components/Selectgenres'
import NotAvailable from "../components/NotAvailable"

export default function TVshows() {
    const [isscrolled, setisscrolled] = useState(false)
    const navigate = useNavigate()
    const genresloaded = useSelector((state) => state.netflix.genresloaded)
    const movies = useSelector((state) => state.netflix.movies)
    const genres = useSelector((state) => state.netflix.genres)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGenres())
    }, [])


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (genresloaded && genres.length > 0) {
            console.log("Genres Loaded:", genres);
            setLoading(true);  // Start loading
            dispatch(fetchmovies({ type: "tv" })).then(() => {
                console.log("Fetched Movies:", movies);
                setLoading(false);  // Stop loading once fetched
            });
        }
    }, [genresloaded]);




    window.onscroll = () => {
        setisscrolled(window.scrollY === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    onAuthStateChanged(firebaseAuth, (currentuser) => {
        // if (currentuser) navigate("/")
    })
    return (

        <Container>
            <div className="navbar">
                <Navbar isscrolled={isscrolled} />
            </div>
            <div className="data">
                <Selectgenres genres={genres} type="tv" />
                {loading ? (
                    <h1>Loading movies...</h1>  // Show loader
                ) : movies.length ? (
                    <Slider movies={movies} />
                ) : (
                    <NotAvailable />
                )}
            </div>
        </Container>
    )
}
const Container = styled.div`
.data {
  margin-top: 8rem;
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
}
`;