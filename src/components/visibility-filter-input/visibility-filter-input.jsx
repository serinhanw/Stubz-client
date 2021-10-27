import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="search for a movie 🎬"
    className="text-center"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);