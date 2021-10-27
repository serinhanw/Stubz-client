import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

// import { Link } from 'react-router-dom';
// import WebFont from 'webfontloader';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';


import './registration-view.scss';

// WebFont.load({
//   google: {
//     families:
//       ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
//   }
// });

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const { handleLogin } = props;

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://stubz.herokuapp.com/users', {
      FirstName: firstname,
      LastName: lastname,
      username: username,
      password: password,
      email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };


  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     axios.post('https://stubz.herokuapp.com/users', {
  //       FirstName: FirstName,
  //       LastName: LastName,
  //       username: username,
  //       password: password,
  //       email: email,
  //       Birthday: Birthday
  //     })
  //       .then(response => {
  //         const data = response.data;
  //         console.log(data);
  //         window.open('/', '_self');
  //       })
  //       .catch(e => {
  //         console.log('error registering the user')
  //       });
  //   };

  return (

    <Form className="register justify-content-md-center pt-5">
      <Form.Group className="mb-3" controlId="formFirstname">
        <Form.Label>First Name:*</Form.Label>
        <Form.Control type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastname">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:*</Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => { setUsername(e.target.value); }}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:*</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:*</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Date of Birth:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)}></Form.Control>
      </Form.Group>

      <p>
        <small>Fields marked with * are required.</small>
      </p>

      <Button className="mt-2" bsPrefix="signup-btn" type="submit" onClick={handleRegister}>Sign Up</Button>
    </Form>

  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    firtsname: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};




