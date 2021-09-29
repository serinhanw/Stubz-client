import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'synopsis1', ImagePath: '...' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'synopsis2', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'synopsis3', ImagePath: '...' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movieData) => { this.setSelectedMovie(movieData) }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;

// condition ? truthy : falsy