import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';

import { Badge, Row, Col, Button, ListGroup } from 'react-bootstrap';

import './genre-view.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// function GenreList(props) {
export class GenreList extends React.Component {

  // const { genres } = props;

  render() {
    const { genre } = this.props;
    // const { genres } = this.props;
    // const { movies } = this.props;

    return (
      <Row className="justify-content-center align-items-center text-center">
        <Col lg={4} sm={12}>
          {/* <ListGroup className="genre-list">
            <ListGroup.Item className="text-center genre-list-item" >
              <Link to={`/genres/${genre._id}`}>{genre.Name}</Link>
            </ListGroup.Item>
          </ListGroup> */}
          <Badge pill bsPrefix="list-item">
            <Link to={`/genres/${genre._id}`}>{genre.Name}</Link>
          </Badge>

        </Col>
      </Row>


    );
  }
}

// GenreList.propTypes = {
//   genres: PropTypes.array.isRequired,
// };

export default GenreList;

