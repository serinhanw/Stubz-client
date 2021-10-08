import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import Badge from 'react-bootstrap/Badge'
import WebFont from 'webfontloader';
import './movie-view.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

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
      <Row className="movie-view">
        <Col>
          <Row className="justify-content-center">
            <Button className="mb-3" bsPrefix="back-btn" onClick={() => onBackClick(null)}>
              <i className="bi bi-arrow-left-circle"></i>
            </Button>
          </Row>
          <Row className="justify-content-center" /*md={6} sm={12}*/>
            <Figure>
              <Figure.Image className="movie-poster" width={300} height={310} src={movieData.ImagePath} crossOrigin="anonymous" alt={movieData.Title + " Poster"} />
            </Figure>
          </Row>
          <Row className="justify-content-center" >
            <Col className="movie-details">
              <Row className="title-fav">
                <Col xs={10} sm={10} ><h2 className="movie-title">{movieData.Title}</h2></Col>
                <Col><Button bsPrefix="favorites-btn" type="button"><i class="bi bi-heart-fill"></i></Button></Col>
              </Row>
              <p className="release-date">
                {/* <span className="label">Release Date: </span> */}
                <span className="value">{movieData.Year}</span>
              </p>
              <p className="movie-description">{movieData.Description}</p>
              <p className="movie-director">
                <span>Director: </span>
                {/* <Link to={`/directors/${movieData.Director.Name}`}>{movieData.Director.Name}</Link> */}
              </p>
              {/* <Link to={`/genres/${movieData.Genre.Name}`}>genre button here</Link> */}
              <Button bsPrefix="genre-btn" className="mb-4" type="button">{movieData.Genre.map(genres => genres.Name).join(", ")}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Director: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};


   // <Card className="bg-secondary">
      //   <Card.Img variant="top" className="movie-poster" alt={movieData.Title + " Poster"} src={movieData.ImagePath} crossOrigin="anonymous" />
      //   <Card.Body>
      //     <Card.Title className="movie-title text-light">{movieData.Title}</Card.Title>
      //     <Card.Subtitle className="movie-year mb-4 text-light">{movieData.Year}</Card.Subtitle>
      //     <Card.Text className="movie-description py-4 text-light">{movieData.Description}</Card.Text>
      //     <h6 className="font-weight-bold">Director: </h6>
      //     <Card.Text className="movie-director text-light">{movieData.Director.map(directors => directors.Name).join(", ")}</Card.Text>
      //     <h6 className="font-weight-bold">Genre(s): </h6>
      //     <Card.Text className="movie-genre text-light">{movieData.Genre.map(genres => genres.Name).join(", ")}</Card.Text>
      //     <Button className="button-fave" variant="outline-primary" type="button">Add to Favorites</Button>
      //     <Button className="mt-30" variant="outline-info" type="button" onClick={() => onBackClick(null)}>Back</Button>
      //   </Card.Body>
      // </Card>
