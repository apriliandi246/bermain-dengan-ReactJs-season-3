import React, { useState } from "react";
import Form from "./components/Form";
import Movies from "./components/Movies";
import MovieNotFound from "./components/MovieNotFound";
import "./css/App.css";

const showMovies = (AllMovies, MovieNotFound) => {
   return class extends React.Component {
      render() {
         const { movies, statusLoading } = this.props;

         if (statusLoading === true && movies.length === 0) {
            return <div className="spinner-2"></div>;
         }

         if (movies.Search) {
            return <AllMovies data={movies} />;
         }

         if (movies.Response === "False") {
            return <MovieNotFound />;
         }

         return null;
      }
   };
};

const ListMovie = showMovies(Movies, MovieNotFound);

const App = () => {
   const [keywords, setKeywords] = useState("");
   const [data, setData] = useState([]);
   const [isLoading, setLoading] = useState(false);

   const handleInput = (event) => {
      setKeywords(event.target.value);
   };

   const handleSearch = (event) => {
      event.preventDefault();

      if (!keywords.trimStart().trimEnd()) {
         alert("type something...");
         return;
      }

      setData([]);
      setLoading(true);

      fetch(`https://www.omdbapi.com/?apikey=80dfc363&s=${keywords}`)
         .then((res) => res.json())
         .then((data) => setData(data))
         .catch((err) => {
            console.log(err.message);
         });
   };

   return (
      <div>
         <Form handleKeywords={handleInput} handleSearch={handleSearch} />

         <ListMovie movies={data} statusLoading={isLoading} />
      </div>
   );
};

export default App;
