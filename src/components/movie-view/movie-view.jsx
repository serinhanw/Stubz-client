import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  // keypressCallback(event) {
  //   console.log(event.key);
  // }

  // componentDidMount() {
  //   document.addEventListener('keypress', this.keypressCallback);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keypress', this.keypressCallback);
  // }

  render() {
    const { movieData, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movieData.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movieData.Title}</span>
        </div>
        <div className="movie-year">
          <span className="label">Year: </span>
          <span className="value">{movieData.Year}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movieData.Genre}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movieData.Description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movieData.Director}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}

// MovieView.propTypes = {
//   movieData: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Year: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string,
//       Description: PropTypes.string,
//     }),
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };

MovieView.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }).isRequired,
    ).isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};