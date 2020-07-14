import React, { useState } from 'react';
import './App.css';

const MovieNotFound = () => (
   <div className="not-found">
      <h1>Movie Not Found</h1>
   </div>
);

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

const showMovies = ((Component1, Component2) => {
   return class extends React.Component {
      render() {
         const { movies, statusLoading } = this.props;

         if (statusLoading === true && movies.length === 0) {
            return <div className="spinner-2"></div>;
         }

         if (movies.Response === 'False') {
            return <Component2 />
         }

         if (movies.Search) {
            return <Component1 data={movies} />
         }

         return null;
      }
   }
});

const ListMovie = showMovies(Movies, MovieNotFound);

const App = () => {
   const [text, setText] = useState('');
   const [data, setData] = useState([]);
   const [isLoading, setLoading] = useState(false);

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
      setLoading(true);

      fetch(`http://www.omdbapi.com/?apikey=80dfc363&s=${text}`)
         .then((res) => res.json())
         .then((data) => setData(data))
         .catch((err) => {
            console.log(err.message);
         });
   }

   return (
      <div>
         <form onSubmit={handleSearch}>
            <div className="input-form">
               <input type="text" placeholder="search movie..." onChange={handleInput} />
               <button>Search</button>
            </div>
         </form>

         <ListMovie
            movies={data}
            statusLoading={isLoading}
         />
      </div>
   );
}

export default App;