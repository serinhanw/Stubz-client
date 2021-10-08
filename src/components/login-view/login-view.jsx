import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form className="login-form">
      <h1 className="title font-weight-bold text-center">Stubz</h1>
      <Form.Group controlId="formUsername" className="mb-3">
        {/* <Form.Label className="form-labels">Username:</Form.Label> */}
        <Form.Control className="form-labels-placeholder" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        {/* <Form.Label className="form-labels">Password:</Form.Label> */}
        <Form.Control className="form-labels-placeholder" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button type="submit" className="login-form-btn" bsPrefix="login-form-btn" onClick={handleSubmit}>Sign in</Button>
    </Form>
  );
}
