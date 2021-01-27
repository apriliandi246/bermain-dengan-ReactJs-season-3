import React from "react";

const Movies = ({ data }) => {
   return (
      <React.Fragment>
         <div className="list-movie">
            {data.Search.map((movie) => {
               return (
                  <div className="movie" key={movie.imdbID}>
                     <h2>{movie.Title}</h2>
                     <img src={movie.Poster} alt={movie.imdbID} />
                     <p>{movie.Year}</p>
                     <p>{movie.Type}</p>
                  </div>
               );
            })}
         </div>
      </React.Fragment>
   );
};

export default Movies;
