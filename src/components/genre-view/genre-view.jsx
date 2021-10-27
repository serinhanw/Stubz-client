import React from 'react';
// import MovieCard from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';
import MovieCard from "../movie-card/movie-card";

import { Row, Col, Button } from 'react-bootstrap';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// function GenreView(props) {
export class GenreView extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     sameGenreMovies: [],
  //   };
  // }


  render() {
    const { genre, onBackClick } = this.props;
    const { movies } = this.props;
    // const { sameGenreMovies } = this.state;


    // const sameGenreMovies = [];
    // movies.map((movie) => {
    //   sameGenreMovies.push(
    //     <Col xl={3} lg={4} md={6} sm={12} className="d-flex mb-3" key={movie._id}>
    //       <MovieCard key={movie._id} movieData={movie} />
    //     </Col>
    //   );
    // });

    return (
      <Row className="genre-view justify-content-center mx-auto">
        <Col sm={12}>
          <Row className="justify-content-center">
            <Button className="mb-2" bsPrefix="back-btn" onClick={() => { onBackClick(null) }}>
              < i className="bi bi-arrow-left-circle"></i>
            </Button>
          </Row>
          <Row>
            <Col sm={12}>
              <h2 className="mb-3">{genre.Name}</h2>
            </Col>
            <Col sm={12}>
              <p className="description">{genre.Description}</p>
            </Col>
            <Col md={12} className="mt-5">
              <h3 className="mb-1">Recommended Movies</h3>
              {/* <Row className="filmography p-0">{sameGenreMovies}
                {(movies.map((movie) => sameGenreMovies.push(
                  <Col xl={3} lg={4} md={6} sm={12} className="d-flex mb-3" key={movie._id}>
                    <MovieCard key={movie._id} movieData={movie} />
                  </Col>
                )))}
              </Row> */}
              {movies.map((m) => (
                <div className="movie" key={m._id}>
                  {m.Title}
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  })
};

