import React from 'react';
import './css/App.css';


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


class MovieNotFound extends React.Component {
   render() {
      return (
         <div className="not-found">
            <h1>Movie Not Found</h1>
         </div>
      );
   }
}


class Form extends React.Component {
   render() {
      const { handleSubmit, handleKeywords } = this.props;

      return (
         <form spellCheck="false" onSubmit={handleSubmit}>
            <div className="input-form">
               <input type="text" placeholder="search movie..." autoFocus onChange={handleKeywords} />
               <button>Search</button>
            </div>
         </form>
      );
   }
}


const showMovies = ((AllMovies, MovieNotFound) => {
   return class extends React.Component {
      render() {
         const { movies, statusLoading } = this.props;

         if (statusLoading === true && movies.length === 0) {
            return <div className="spinner-2"></div>
         }

         if (movies.Search) {
            return <AllMovies data={movies} />
         }

         if (movies.Response === 'False') {
            return <MovieNotFound />
         }

         return null;
      }
   }
});


const ListMovie = showMovies(Movies, MovieNotFound);


class App extends React.Component {
   constructor() {
      super();

      this.state = {
         data: [],
         keywords: '',
         isLoading: false
      }

      this.handleInput = this.handleInput.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
   }

   handleInput(event) {
      this.setState({ keywords: event.target.value });
   }

   handleSearch(event) {
      event.preventDefault();

      const keywords = this.state.keywords.trimStart().trimEnd();

      if (!keywords) {
         alert("type something...");
         return;
      }

      this.setState({
         data: [],
         isLoading: true
      });

      fetch(`http://www.omdbapi.com/?apikey=80dfc363&s=${keywords}`)
         .then((res) => res.json())
         .then((data) => this.setState({ data }))
         .catch((err) => {
            console.log(err.message);
         });
   }

   render() {
      const { data, isLoading } = this.state;

      return (
         <div>
            <Form
               handleSubmit={this.handleSearch}
               handleKeywords={this.handleInput}
            />

            <ListMovie
               movies={data}
               statusLoading={isLoading}
            />
         </div>
      );
   }
}


export default App;