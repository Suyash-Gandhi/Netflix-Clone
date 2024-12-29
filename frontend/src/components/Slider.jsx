import React from 'react'
import CardSlider from './CardSlider'

export default React.memo(function Slider({movies}) {
    const getmoviesfromrange=(from,to)=>{
        return movies.slice(from,to)
    }
    //console.log(movies);
    
  return (
    <div>
        <CardSlider title="Trending Now" data={getmoviesfromrange(0,10)}/>
        <CardSlider title="New Releases" data={getmoviesfromrange(10,20)}/>
        <CardSlider title="Blockbuster Movies" data={getmoviesfromrange(20,30)}/>
        <CardSlider title="Popular Movies" data={getmoviesfromrange(30,40)}/>
        <CardSlider title="Popular on Netflix" data={getmoviesfromrange(40,50)}/>
        <CardSlider title="Action Movies" data={getmoviesfromrange(50,60)}/>
    </div>
  )
})
