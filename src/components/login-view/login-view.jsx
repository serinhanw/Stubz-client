import React, { useState } from 'react';
import axios from 'axios';
// import PropTypes from "prop-types";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Link } from "react-router-dom";
import WebFont from 'webfontloader';

import './login-view.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://stubz.herokuapp.com/login', {
      username: username,
      password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        // window.open("/", "_self");
      })
      .catch(e => {
        console.log('no such user')
      });
  };
  //lg={6} md={8} sm={12} 

  return (
    <Row className="justify-content-center align-items-center mx-auto min-vh-100">
      <Col lg={6} md={8} sm={12} >
        <Form>
          <h1 className="title text-center mb-3 font-weight-bold ">Stubz</h1>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              className="form-labels-placeholder"
              placeholder="Enter username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              className="form-labels-placeholder"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="mx-auto">
            <Button
              className="login-form-btn"
              bsPrefix="login-form-btn"
              type="submit"
              onClick={handleSubmit}>
              Sign in
            </Button>
          </Row>

          <p className="party-txt text-center mt-5">Ready to party?</p>
          <p className="text-center">
            <Link to='/register'>
              <Button bsPrefix="register-btn" type="submit">Sign up here!</Button>
            </Link>
          </p>



        </Form>
      </Col>
    </Row>
  );
}

// LoginView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }),
//   onLoggedIn: PropTypes.func.isRequired
// };



