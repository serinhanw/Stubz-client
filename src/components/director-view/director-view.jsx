import React from 'react';

import PropTypes from 'prop-types';
import WebFont from 'webfontloader';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './director-view.scss';


WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// function DirectorView(props) {
export class DirectorView extends React.Component {

  render() {
    const { director, movieData, onBackClick } = this.props;

    // const films = [];
    // movies.map((movie) => {
    //   films.push(
    //     <Col xl={3} lg={4} md={6} sm={12} className="d-flex mb-3" key={movie._id}>
    //       <MovieCard key={movie._id} movieData={movie} />
    //     </Col>
    //   );
    // });

    return (
      <Row className="director-view justify-content-center ">
        <Col >

          <Row className="justify-content-center">
            <Button className="mb-3" bsPrefix="back-btn" onClick={() => { onBackClick(null); }}>
              <i className="bi bi-arrow-left-circle"></i>
            </Button>
          </Row>

          <Row className="justify-content-center name-row" /*md={6} sm={12}*/>
            <h2 className="">{director.Name}<span> {director.Birthyear}</span></h2>
          </Row>

          <Row className="justify-content-center about-row" >
            {/* <h3>About</h3> */}
            <p className="bio">{director.Bio}</p>
          </Row>

          {/* <Row>
          <Col md={12} className="mt-5">
            <h3 className="mb-1">Directed Films</h3>
            <Row className="filmography p-0">{films}</Row>
          </Col>
        </Row> */}
        </Col >
      </Row>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birthyear: PropTypes.string,
  })
};
