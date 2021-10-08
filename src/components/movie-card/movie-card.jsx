import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    /* two props: one func onMovieClick, and one object movieData */
    const { movieData, onMovieClick } = this.props;

    return (
      <Card /*className="h-auto"*/>
        <Card.Img className="movie-card-link" width={300} height={310} src={movieData.ImagePath} alt={movieData.Title + " Poster"} crossOrigin="anonymous" onClick={() => onMovieClick(movieData)} />
        {/* <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text className="truncate">{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant="primary">Details</Button>
        </Card.Body> */}
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

// <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
      //   {/* <div className="movie-poster">
      //     <img src={movieData.ImagePath} />
      //   </div> */}
      //   <div className="movie-title">
      //     <span>{movieData.Title}</span>
      //   </div>
      //   <div className="movie-year">
      //     <span>{movieData.Year}</span>
      //   </div>
      // </div>