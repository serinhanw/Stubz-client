import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span>{movieData.Title}</span>
        </div>
      </div>
    );
  }
}