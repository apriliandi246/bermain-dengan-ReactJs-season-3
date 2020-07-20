import React from 'react';
import Form from './components/Form';
import Movies from './components/Movies';
import MovieNotFound from './components/MovieNotFound';
import './css/App.css';


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