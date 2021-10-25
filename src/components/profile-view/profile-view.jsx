import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import WebFont from 'webfontloader';


import './profile-view.scss';
// import UserInfo from './user-info.jsx';
// import UpdateUser from './update-user.jsx';
// import FavoriteMovies from './favorite-movies.jsx';

import { Button, Card, CardGroup, Container, Form, Row, Col } from 'react-bootstrap';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});


export class ProfileView extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     //user: {},
  //     firstname: "",
  //     lastname: "",
  //     username: "",
  //     password: "",
  //     email: "",
  //     birthday: "",
  //     favorites: [],
  //     validated: false,
  //     errorMessage: '',
  //     errorStatus: '',
  //     errorResponse: '',
  //   };
  // }

  constructor() {
    super();

    this.state = {
      firstname: null,
      lastname: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      favorites: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // getUser(token) {
  //   const username = localStorage.getItem('user');
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   axios
  //     .get(`https://stubz.herokuapp.com/users/${username}`, config)
  //     .then((res) => {

  //       this.setState({
  //         firstname: res.data.FirstName,
  //         lastname: res.data.LastName,
  //         username: res.data.username,
  //         password: res.data.password,
  //         email: res.data.email,
  //         birthday: res.data.Birthday,
  //         favorites: res.data.favorites,

  //       });
  //       console.log(res);
  //       console.log('User data is received!');
  //     })
  //     .catch((e) => {
  //       console.log('Error Retrieving User Data');
  //       console.log(e);
  //     });
  // }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://stubz.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          firstname: response.data.FirstName,
          lastname: response.data.LastName,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.Birthday,
          favorites: response.data.favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // Adds input data to state
  // handleInputChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  //console.log(e.target.name);
  /*console.log(e.target.value);*/
  // };

  // Remove account and log out user, returning to loginView
  // handleDeregister = () => {
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('user');

  //   axios
  //     .delete(`https://stubz.herokuapp.com/users/${username}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(username + " has been deleted.");
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       window.location.pathname = "/";

  //     })
  //     .catch((e) => console.log('error'));
  // };

  removeFavMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .delete(`https://stubz.herokuapp.com/users/${username}/movies/${movieData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
    // .then(() => window.location.reload());
  }

  //////////////
  // handleUpdate = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   // Credentials
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   if (this.state.username != username) {
  //     console.log('Username not familiar.');
  //     axios.post(`https://stubz.herokuapp.com/users`,
  //       {
  //         FirstName: this.state.firstname,
  //         LastName: this.state.lastname,
  //         username: this.state.username,
  //         password: this.state.password,
  //         email: this.state.email,
  //         Birthday: this.state.birthday,
  //         favorites: this.state.favorites,
  //       },
  //       config
  //     ).then((res) => {
  //       const data = res.data;

  //localStorage.setItem('user', data.username);

  // console.log(username + " has been updated.");
  // console.log(res.data);

  //window.open('/', '_self');

  // }).catch((error) => {
  //   console.log('Update Error');
  //   console.log(error);
  //   console.log(error.response);
  //   this.setState({ errorStatus: error.response.request.status });
  //   this.setState({ errorMessage: error.response.request.statusText });
  //   this.setState({ errorResponse: error.response.request.response });
  // });
  // this.setState({
  //   validated: true,
  // });

  // axios.delete(`https://stubz.herokuapp.com/users/${username}`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // })
  //   .then((res) => {
  //     console.log(username + " has been deleted.");
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("token");

  //   })
  //   .catch((e) => console.log('error'));

  // } else {
  //   axios.put(`https://stubz.herokuapp.com/users/${username}`,
  //     {
  //       FirstName: this.state.firstname,
  //       LastName: this.state.lastname,
  //       username: this.state.username,
  //       password: this.state.password,
  //       email: this.state.email,
  //       Birthday: this.state.birthday,
  //     },
  //     config
  //   ).then((res) => {
  //     const data = res.data;
  //     localStorage.setItem('user', data.username);
  //     console.log(username + " has been updated.");
  //     console.log(res.data);

  //window.open('/', '_self');

  //     }).catch((error) => {
  //       console.log('Update Error');
  //       console.log(error);
  //       console.log(error.response);
  //       this.setState({ errorStatus: error.response.request.status });
  //       this.setState({ errorMessage: error.response.request.statusText });
  //       this.setState({ errorResponse: error.response.request.response });
  //     });
  //     this.setState({
  //       validated: true,
  //     });
  //   }
  // };
  ////////////////////

  handleUpdate(e, newFirstName, newLastName, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://stubz.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        FirstName: newFirstName ? newFirstName : this.state.firstname,
        LastName: newLastName ? newLastName : this.state.lastname,
        username: newUsername ? newUsername : this.state.username,
        password: newPassword ? newPassword : this.state.password,
        email: newEmail ? newEmail : this.state.email,
        Birthday: newBirthday ? newBirthday : this.state.birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          firstname: response.data.FirstName,
          lastname: response.data.LastName,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setFirstName(input) {
    this.firstname = input;
  }

  setLastName(input) {
    this.lastname = input;
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  setBirthday(input) {
    this.birthday = input;
  }


  // deleteMovie(e, movieData) {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token');
  //   const username = localStorage.getItem('user');
  //   axios({
  //     method: 'delete',
  //     url: `https://stubz.herokuapp.com/users/${username}/movies/${movieData._id}`,
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then(() => {
  //       alert(`Removed from your Favorites`);
  //       window.open(`/users/${username}`, '_self');
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://stubz.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }



  render() {
    // const username = localStorage.getItem('user');
    // const token = localStorage.getItem('token');
    // const { favorites } = this.state;
    const { favorites, validated } = this.state;
    const { username, firstname, lastname, email, birthday } = this.state;
    const { movies } = this.props;
    // const { user } = this.props;
    // if (!username) return null;

    return (
      <div>
        <Row className="d-flex align-items-end">
          <Col xs={12} sm={12} md={5} >
            <h1 className="greeting-line mb-3 text-center">Hey {username} 👋</h1>
            <Card className="profile-box mb-2">
              <Card.Body className="profile-info ">
                <h5 className="mb-3">Your info</h5>
                <p>Username: {username}</p>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Email: {email}</p>
                <p>Birthday: {birthday}</p>
                <small className="text-light text-center">
                  <Link to="/">
                    {/* <span className="register text-primary" onClick={this.handleDeregister}> */}
                    <span className="register text-primary" onClick={(e) => this.handleDeleteUser(e)}>
                      Remove your account
                    </span>
                  </Link>
                </small>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={7}>
            <Card>
              <Card.Body>
                {/* <Form noValidate validated={this.state.validated} className="update-form"> */}
                {/* <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.firstname, this.lastname, this.username, this.password, this.email, this.birthday)}> */}
                <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.firstname, this.lastname, this.username, this.password, this.email, this.birthday)}>

                  <p>Need to make changes? Make them here!</p>

                  <Row>
                    <Col>
                      <Form.Group controlId="formFirstname" >
                        {/* <Form.Control type="text" name="firstname" placeholder="New first name" onChange={this.handleInputChange} required /> */}
                        <Form.Control type="text" placeholder="New first name" onChange={(e) => this.setFirstName(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Only letter characters allowed.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="formLastname" >
                        {/* <Form.Control type="text" name="lastname" placeholder="New last name" onChange={this.handleInputChange} required /> */}
                        <Form.Control type="text" placeholder="New last name" onChange={(e) => this.setLastName(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Only letter characters allowed.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formUsername" >
                        {/* <Form.Control type="text" name="username" placeholder="New username" onChange={this.handleInputChange} pattern="[a-zA-Z0-9]+" required /> */}
                        <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must contain letters and/or numbers.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formPassword" >
                        {/* <Form.Control type="password" name="password" placeholder="New password" onChange={this.handleInputChange} required minLength="5" /> */}
                        <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must be a minimum length of 5 characters and contains only numbers, letters, and/or special characters.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formEmail" >
                        {/* <Form.Control type="email" name="email" placeholder="New email" onChange={this.handleInputChange} required /> */}
                        <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must be a valid email address.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formBirthday" >
                        {/* <Form.Control type="date" name="Birthday" placeholder="New birthday" onChange={this.handleInputChange} required /> */}
                        <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Please choose a valid date.</Form.Control.Feedback> */}
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* <Button className="button-style" variant="primary" type="submit" onClick={this.handleUpdate}> */}
                  <Button className="button-style" variant="primary" type="submit">
                    Update
                  </Button>

                </Form>

                {/* {this.state.errorMessage &&
              <div>
                <Form.Text className="error-style">Error status: {this.state.errorStatus} : {this.state.errorMessage}</Form.Text>
                <Form.Text className="error-style">{this.state.errorResponse}</Form.Text>
              </div>} */}


              </Card.Body>
            </Card>
          </Col>
        </Row>


        <div className="fav-movies-div text-center p-2">
          <h1>Your favorite movies:</h1>
        </div>
        {
          favorites.length === 0 && (
            <div className="no-fav-movies d-flex flex-column align-items-center">
              You have no favorite movies at the moment.
            </div>
          )
        }
        {
          favorites.length != 0 && (
            <Row className="fav-style">
              {movies.map(m => {
                if (m._id === favorites.find((favoriteMovieID) => favoriteMovieID === m._id)
                ) {
                  return (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} key={m._id} className="d-flex flex-column align-items-center">
                      <MovieCard movieData={m} />
                      {/* <Button className="delete-movie-btn" variant="primary" value={m._id} onClick={(e) => this.deleteMovie(e, m)}>Remove from Favorites</Button> */}
                      <Button className="delete-movie-btn" variant="primary" value={m._id} onClick={(e) => this.removeFavMovie(e, m)}>Remove from Favorites</Button>
                    </Col>
                  )
                }
              })}
            </Row>
          )}
      </div >
    );
  }
}



// ProfileView.propTypes = {
//   user: PropTypes.object,
//   movies: PropTypes.array.isRequired,
//   onLoggedIn: PropTypes.func.isRequired,

// }

























