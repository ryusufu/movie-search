import React, {useState} from 'react';
import MovieCard from './MovieCard'
function SearchMovies () {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([]);

    function handleChange (event) {
        setQuery(event.target.value)

    }

    const searchMovies = async (event) => {
        event.preventDefault();
        console.log('submitting')

        const url = `https://api.themoviedb.org/3/search/movie?api_key=0e2d9ec630e8adbc9e75e8a3bee618e1&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results)
            console.log(data)
        } catch(err) {
            console.log(err)
        }
    }
    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" onChange={handleChange} type="text" value={query} name="query" placeholder="i.e Jurassic Park"/>
                <button className="button">Search</button>
            </form>

            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie}/>
                ))}
            </div>
        </>
    )
}

export default SearchMovies