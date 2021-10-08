import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, FirstName, LastName, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegister(username);
  };

  return (
    <div className="registration-form">
      <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={(e) => { setUsername(e.target.value); }}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBirthday">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control type="date" onChange={(e) => setBirthday(e.target.value)}></Form.Control>
        </Form.Group>

        <Button className="mt-20" variant="success" type="submit" onClick={handleSubmit}>Sign Up</Button>
      </Form>
    </div>
  );
}

{/* <form>
      <label>
        First Name:
        <input type="text" value={FirstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={LastName} onChange={e => setLastName(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Sign Up</button>
    </form> */}