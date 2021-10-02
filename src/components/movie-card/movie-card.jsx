import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    /* two props: one func onMovieClick, and one object movieData */
    const { movieData, onMovieClick } = this.props;
    return (
      <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
        {/* <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div> */}
        <div className="movie-title">
          <span>{movieData.Title}</span>
        </div>
        <div className="movie-year">
          <span>{movieData.Year}</span>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
