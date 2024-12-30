import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import Video from "../assets/video.mp4"
import { IoPlayCircleSharp } from "react-icons/io5"
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeLikedMovies } from '../store';


export default React.memo(function Card({ moviedata, isliked = false }) {

  const [hovered, sethovered] = useState(false)
  const navigate = useNavigate()
  const [email, setemail] = useState(undefined)
  const dispatch = useDispatch()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentuser) => {
      if (currentuser) {
        console.log("User logged in:", currentuser.email);
        setemail(currentuser.email);
      } else {
        console.log("No user found, redirecting...");
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);




  const addtolist = async () => {
    if (!email) {
        console.log("User email not available.");
        return;
    }

    console.log("Adding to list:", email, moviedata);

    try {
        const response = await axios.post("http://localhost:5000/api/user/add", {
            email,
            data: {
                id: moviedata.id,
                name: moviedata.name,
                image: moviedata.image,
                genres: moviedata.genres,
            },
        });

        if (response.status === 200) {
            console.log("Movie added:", response.data);
        } else {
            console.log("Failed to add movie:", response.data.msg);
        }
    } catch (err) {
        console.error("Error adding to list:", err.response ? err.response.data : err.message);
    }
}




  return (
    <Container onMouseEnter={() => sethovered(true)} onMouseLeave={() => sethovered(false)}>
      <img src={`http://image.tmdb.org/t/p/w500${moviedata.image}`} alt="movie" />
      {
        hovered && (
          <div className="hover">
            <div className="image-video-container">
              <img src={`http://image.tmdb.org/t/p/w500${moviedata.image}`} alt="movie" onClick={() => navigate("/player")} />
              <video src={Video} autoPlay loop muted onClick={() => navigate("/player")} />
            </div>
            <div className="info-container flex column">
              <h3 className='name' onClick={() => navigate("/player")}>{moviedata.name}</h3>
              <div className="icons flex j-between">
                <div className="control flex">
                  <IoPlayCircleSharp title="play" onClick={() => navigate("/player")} />
                  <RiThumbUpFill title="Like" />
                  <RiThumbDownFill title="Dislike" />
                  {
                    isliked ? (
                      <BsCheck title="Remove From List" onClick={() => dispatch(removeLikedMovies({ movieId: moviedata.id, email }))} />
                    )

                      : (
                        <AiOutlinePlus title="Add To My List" onClick={addtolist} />
                      )

                  }
                </div>
                <div className="info">
                  <BiChevronDown title="More Info" />
                </div>
              </div>
              <div className="genres flex">
                <ul className='flex'>
                  {moviedata.genres.map((genre, index) => (
                    <li key={`${genre}-${index}`}>{genre}</li>
                  ))}

                </ul>
              </div>
            </div>
          </div>
        )
      }

    </Container>
  )
})

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
            }
        }
      }
    }
  }
`
