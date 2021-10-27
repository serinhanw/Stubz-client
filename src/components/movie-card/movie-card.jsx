// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Image from 'react-bootstrap/Image';

import { Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import './movie-card.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

{/* <Row className="pt-5 justify-content-center align-items-center mx-auto min-vh-100">
      <Col lg={6} md={8} sm={12} ></Col> */}

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Row className="justify-content-md-center align-items-center">
        <Col className="mx-1" >
          <Card border="dark" className="card-container">
            <Card.Body className="card-body p-0">
              <Link to={`/movies/${movieData._id}`}>
                <Card.Img className="card-img" width={300} height={310} src={movieData.ImagePath} alt={movieData.Title + " Poster"} crossOrigin="anonymous" />
              </Link>
            </Card.Body>
            {/* <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text className="truncate">{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant="primary">Details</Button>
        </Card.Body> */}
          </Card>
        </Col>
      </Row>
    );
  }
}


MovieCard.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};






