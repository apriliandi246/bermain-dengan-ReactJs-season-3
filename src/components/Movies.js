import React from 'react';


class Movies extends React.Component {
   render() {
      const data = this.props.data;

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
}


export default Movies;