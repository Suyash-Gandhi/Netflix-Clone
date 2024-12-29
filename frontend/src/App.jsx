import {Route, Routes} from "react-router-dom"
import Signup from './pages/Signup'
import Login from './pages/Login'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
import Movies from "./pages/movies"
import TVshows from "./pages/TVshows"
import UserLiked from "./pages/UserLiked"
export default function App() {
  return (
    <>
     <Routes>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/player" element={<Player/>}/>
      <Route exact path="/mylist" element={<UserLiked/>}/>
      <Route exact path="/tv" element={<TVshows/>}/>
      <Route exact path="/movies" element={<Movies/>}/>
      <Route exact path="/" element={<Netflix/>}/>
     </Routes>
    </>
  )
}
