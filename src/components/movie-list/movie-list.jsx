import React from 'react';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from "../movie-card/movie-card";

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

function MovieList(props) {
  return (
    <Row>
      <h1 className="text-center mb-5">Movies</h1>
      {props.movies.map((movieData) => (
        <Col xl={3} lg={4} md={6} sm={12} className="justify-content-center d-flex mb-3" key={movie._id}>
          <MovieCard key={movieData._id} movieData={movie} />
        </Col>
      ))}
    </Row>
  );
}

// MovieList.propTypes = {
//   movies: PropTypes.array.isRequired,
// };

export default MovieList;


{/* <Row className="justify-content-md-center min-vh-100">
<Col className="px-5" lg={10} sm={12} xs={12}>
<MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
</Col>
</Row> */}

{/* <Row className="main-view justify-content-md-center py-3 min-vh-100">
<Route exact path="/" render={() => {
return movies.map(m => (
<Col className="py-4" lg={3} md={4} sm={6} xs={6} key={m._id}>
<MovieCard movieData={m} />
</Col> */}

