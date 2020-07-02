import React, { useState } from 'react';
import './App.css';

const MovieNotFound = () => {
  return <h1 className="not-found">Movie Not Found</h1>
}

const App = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const handleInput = (event) => {
    setText(event.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();

    if (text === '') {
      alert('type something');
      return;
    }

    fetch(`http://www.omdbapi.com/?apikey=80dfc363&s=${text}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        return false;
      });
  }

  return (
    <div>
      <div className="form">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="search movie..." onChange={handleInput} />
          <button>Search</button>
        </form>
      </div>

      {data.Response === 'False' && <MovieNotFound />}

      <div className="list-movie">
        {data.Search && (
          data.Search.map((movie) => {
            return (
              <div className="movie" key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.imdbID} />
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}


export default App;