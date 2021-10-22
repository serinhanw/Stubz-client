import React, { useState } from 'react';
import axios from 'axios';

// import { Link } from 'react-router-dom';
// import WebFont from 'webfontloader';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
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
    <Form className="register justify-content-md-center">
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

      <Button className="mt-2" variant="success" type="submit" onClick={handleRegister}>Sign Up</Button>
    </Form>

  );
}

// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     FirstName: PropTypes.string.isRequired,
//     LastName: PropTypes.string,
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     Birthday: PropTypes.string.isRequired
//   }),
// };









////// BEFORE MAJOR UPDATES //////

// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import './registration-view.scss';

// export function RegistrationView(props) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [birthday, setBirthday] = useState("");

//   const handleSubmit = () => {
//     e.preventDefault();
//     console.log(username, password, FirstName, LastName, email, birthday);
//     /* Send a request to the server for authentication */
//     /* then call props.onLoggedIn(username) */
//     props.onRegister(username);
//   };

//   return (
//     <div className="registration-form">
//       <Form>
//         <Form.Group className="mb-3" controlId="formFirstName">
//           <Form.Label>First Name:</Form.Label>
//           <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formLastName">
//           <Form.Label>Last Name:</Form.Label>
//           <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formUsername">
//           <Form.Label>Username:</Form.Label>
//           <Form.Control type="text" onChange={(e) => { setUsername(e.target.value); }}></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formPassword">
//           <Form.Label>Password:</Form.Label>
//           <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formEmail">
//           <Form.Label>Email:</Form.Label>
//           <Form.Control type="email" onChange={(e) => setEmail(e.target.value)}></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="formBirthday">
//           <Form.Label>Date of Birth:</Form.Label>
//           <Form.Control type="date" onChange={(e) => setBirthday(e.target.value)}></Form.Control>
//         </Form.Group>

//         <Button className="mt-20" variant="success" type="submit" onClick={handleSubmit}>Sign Up</Button>
//       </Form>
//     </div>
//   );
// }
