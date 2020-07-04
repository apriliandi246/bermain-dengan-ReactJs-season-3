import React, { useState } from 'react';
import './App.css';

const MovieNotFound = () => {
  return (
    <div className="not-found">
      <h1>Movie Not Found</h1>
    </div>
  );
}

const Movies = ({ data }) => {
  return (
    <React.Fragment>
      <div className="list-movie">
        {
          data.Search.map((movie) => {
            return (
              <div className="movie" key={movie.imdbID}>
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt={movie.imdbID} />
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
              </div>
            );
          })
        }
      </div>
    </React.Fragment>
  );
}

const App = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);

  const handleInput = (event) => {
    setText(event.target.value);
  }

  const handleSearch = (event) => {
    event.preventDefault();

    if (!text) {
      alert('type something...');
      return;
    }

    setData([]);
    setStatus(true);

    fetch(`http://www.omdbapi.com/?apikey=80dfc363&s=${text}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err.message);
      });
  }

  let movies;

  if (data.Search) {
    movies = <Movies data={data} />
  } else {
    if (data.Response === 'False') {
      movies = <MovieNotFound />
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div class="input-form">
            <input type="text" placeholder="search movie..." onChange={handleInput} />
            <button>Search</button>
          </div>
        </form>
      </div>

      {status && data.length === 0 ? <div className="spinner-2"></div> : movies}
    </div>
  );
}


export default App;