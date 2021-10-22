import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';

import { Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';

import './director-view.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// function DirectorList(props) {
export class DirectorList extends React.Component {

  // const { genres } = props;

  render() {
    const { director } = this.props;
    const { movies } = this.props;

    return (
      <Row className="justify-content-center text-center">
        <Col lg={4} sm={12}>
          {/* <ListGroup className="director-list">
            <ListGroup.Item className="text-center">
              <Link to={`/directors/${director._id}`}>{director.Name}</Link>
            </ListGroup.Item>
          </ListGroup> */}

          <Badge pill bsPrefix="list-item">
            <Link to={`/directors/${director._id}`}>{director.Name}</Link>
          </Badge>

        </Col>
      </Row>
    );
  }
}

// DirectorList.propTypes = {
//   directors: PropTypes.array.isRequired,
// };

export default DirectorList;