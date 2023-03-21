import React, { useState, useEffect } from "react";
import './App.css';
import Card from "./Card";
import SearchIcon from './search.svg';

// 5d5fcd4a

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=5d5fcd4a';

const movie1 = {
    "Title": "Spider-Man Title Reveal",
    "Year": "2021",
    "imdbID": "tt14122734",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg"
}


const App = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    const searchMovies = async (title) => {

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies(movie1);
    }, []);

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => { searchMovies(search) }}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container" >
                        {movies.map((movie) => (
                            <Card movies={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Movies Found </h2>
                    </div>
                )
            }

        </div>
    );
}
export default App;