import React, { useRef, useState } from 'react'
import Card from './Card'
import styled from "styled-components"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
export default React.memo(function CardSlider({ data, title }) {
  const [showcontrols, setshowcontorls] = useState(false)
  const [sliderposition, setsliderposition] = useState(0)
  const listref = useRef()

  const handledirection = (direction) => {
    console.log(listref, direction);

    let distance = listref.current.getBoundingClientRect().x - 70
    if (direction === "left" && sliderposition > 0) {
      listref.current.style.transform = `translateX(${230 + distance}px)`
      setsliderposition(sliderposition - 1)
    }
    if (direction === "right" && sliderposition < 4) {
      listref.current.style.transform = `translateX(${-230 + distance}px)`
      setsliderposition(sliderposition + 1)
    }
  }

  return (
    <Container className='flex column' onMouseEnter={() => setshowcontorls(true)}
      onMouseLeave={() => setshowcontorls(false)}>
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!showcontrols ? "none" : ""} flex j-center a-center`}>
          <AiOutlineLeft onClick={() => handledirection("left")} />
        </div>
        <div className='flex slider' ref={listref}>
          {
            data.map((movie, index) => {
              return <Card moviedata={movie} index={index} key={movie.id} />
            })
          }
        </div>
        <div className={`slider-action right ${!showcontrols ? "none" : ""} flex j-center a-center`}>
          <AiOutlineRight onClick={() => handledirection("right")} />
        </div>
      </div>

    </Container>

  )
})
const Container = styled.div`  
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`