import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TMBD_BASE_URL, API_KEY } from "../utils/constants";
import axios from "axios"


const initialState = {
    movies: [],
    genresloaded: false,
    genres: [],
}


const createarrayfromrawdata = (array, moviesarray, genres) => {
    

    array.forEach(movie => {
        const moviegenre = []
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre)
            if (name) moviegenre.push(name.name)
        })
        if (movie.backdrop_path) {
            moviesarray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie?.original_title,
                image: movie.backdrop_path,
                genres: moviegenre.slice(0, 3)
            })
        }
    });
}

const getrawdata = async (api, genres, paging) => {
    const moviesarray = [];
    
    // Fix this condition by handling it at the API construction level
    if (api.includes("trending/movies")) {
        api = api.replace("movies", "movie");
    }
    
    for (let i = 1; moviesarray.length < 60 && i < 10; i++) {
        const { data: { results } } = await axios.get(
            `${api}${paging ? `&page=${i}` : ""}`
        );
        createarrayfromrawdata(results, moviesarray, genres);
    }
    
    return moviesarray;
};


export const fetchmovies = createAsyncThunk("netflix/trending", async ({ type }, thunkapi) => {
    const { netflix: { genres } } = thunkapi.getState();
   return getrawdata(
    `${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`
    , genres, true);
});

export const fetchDataByGenre = createAsyncThunk("netflix/moviesbygenres", async ({ genre,type }, thunkapi) => {
   console.log("in fetch data", genre,type);
   
    const { netflix: { genres } } = thunkapi.getState();
    return  getrawdata (`${ TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres)
});

const BASE_URL = `${import.meta.env.REACT_APP_API_URL || "http://localhost:5000"}`;


export const getuserlikedmovies=createAsyncThunk("netflix/getliked",async(email)=>{
    const {data:{movies}}=await axios.get(`${BASE_URL}/api/user/liked/${email}`)
  return movies
})

export const removeLikedMovies=createAsyncThunk("netflix/deleteliked",async({email,movieId})=>{
    const {data:{movies}}=await axios.put(`${BASE_URL}/api/user/delete/`,{
        email,movieId
    })
  return movies
})

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    
        const { data: { genres } } = await axios.get(
            `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);  
        return genres;
    
});



export const fetchData = async () => {
    try {
      const result = await dispatch(fetchmovies({ type: "all" }));
      console.log("Movies Data:", result);
    } catch (error) {
      console.error("Error during movie fetch:", error);
    }
  };

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresloaded = true;
        })
        builder.addCase(fetchmovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(getuserlikedmovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
        builder.addCase(removeLikedMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        })
    }
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    }
})