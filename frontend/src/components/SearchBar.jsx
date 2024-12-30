import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { API_KEY } from "../utils/constants";

const TMDB_API_KEY = API_KEY;

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setNotFound(false);  // Reset notFound on each search
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
            );
            if (response.data.results.length === 0) {
                setNotFound(true);
            }
            setResults(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
            setNotFound(true);  // Assume not found on error
        }
        setLoading(false);
    };

    return (
        <Container>
            <div className="search-bar">
                <div className="flex">
                    <input
                        type="text"
                        value={query}
                        placeholder="Search movies or TV shows"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {loading && <p>Loading...</p>}

                <div className="results-grid">
                    {results.length > 0 ? (
                        results.map((item) => (
                            <div key={item.id} className="result-card">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title || item.name}
                                />
                                <h3>{item.title || item.name}</h3>
                                <p>{item.release_date || item.first_air_date}</p>
                            </div>
                        ))
                    ) : (
                        notFound && <p>Not found</p>
                    )}
                </div>
            </div>
        </Container>
    );
}



const Container = styled.div`

    
button {
    color: white;
    margin: 0.3125rem;
}

.results-grid {
    width: 17.5rem;  
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 67%;
    right: 6.4em; 
    max-height: 37.5rem;  
    overflow-y: auto;
}

.result-card {
    padding: 0.325rem; 
}

img {
    
    max-width: 3.75rem; 
    max-height: 3.75rem; 
}

p{
 padding: 0.325rem; 
}
`