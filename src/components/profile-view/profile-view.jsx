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
  constructor(props) {
    super(props);
    this.state = {
      //user: {},
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      birthday: "",
      favorites: [],
      validated: false,
      errorMessage: '',
      errorStatus: '',
      errorResponse: '',
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://stubz.herokuapp.com/users/${username}`, config)
      .then((res) => {

        this.setState({
          firstname: res.data.FirstName,
          lastname: res.data.LastName,
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          birthday: res.data.Birthday,
          favorites: res.data.favorites,

        });
        console.log(res);
        console.log('User data is received!');
      })
      .catch((e) => {
        console.log('Error Retrieving User Data');
        console.log(e);
      });
  }

  // Adds input data to state
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.name);
    /*console.log(e.target.value);*/
  };

  // Remove account and log out user, returning to loginView
  handleDeregister = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://stubz.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(username + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";

      })
      .catch((e) => console.log('error'));
  };

  //////////////
  handleUpdate = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Credentials
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (this.state.username != username) {
      console.log('Username not familiar.');
      axios.post(`https://stubz.herokuapp.com/users`,
        {
          FirstName: this.state.firstname,
          LastName: this.state.lastname,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          Birthday: this.state.birthday,
          favorites: this.state.favorites,
        },
        config
      ).then((res) => {
        const data = res.data;
        //localStorage.setItem('user', data.username);
        console.log(username + " has been updated.");
        console.log(res.data);
        //window.open('/', '_self');
      }).catch((error) => {
        console.log('Update Error');
        console.log(error);
        console.log(error.response);
        this.setState({ errorStatus: error.response.request.status });
        this.setState({ errorMessage: error.response.request.statusText });
        this.setState({ errorResponse: error.response.request.response });
      });
      this.setState({
        validated: true,
      });
      // axios.delete(`https://stubz.herokuapp.com/users/${username}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // })
      //   .then((res) => {
      //     console.log(username + " has been deleted.");
      //     localStorage.removeItem("user");
      //     localStorage.removeItem("token");

      //   })
      //   .catch((e) => console.log('error'));
    } else {
      axios.put(`https://stubz.herokuapp.com/users/${username}`,
        /* `https://stubz.herokuapp.com/users/profile`, */
        {
          FirstName: this.state.firstname,
          LastName: this.state.lastname,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          Birthday: this.state.birthday,
        },
        config
      ).then((res) => {
        const data = res.data;
        localStorage.setItem('user', data.username);

        console.log(username + " has been updated.");
        console.log(res.data);
        //window.open('/', '_self');
      }).catch((error) => {
        console.log('Update Error');
        console.log(error);
        console.log(error.response);
        this.setState({ errorStatus: error.response.request.status });
        this.setState({ errorMessage: error.response.request.statusText });
        this.setState({ errorResponse: error.response.request.response });
      });
      this.setState({
        validated: true,
      });
    }
  };
  ////////////////////

  deleteMovie(e, movieData) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios({
      method: 'delete',
      url: `https://stubz.herokuapp.com/users/${username}/movies/${movieData._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`Removed from your Favorites`);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  render() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const { favorites } = this.state;
    const { firstname, lastname, email, birthday } = this.state;
    const { movies } = this.props;
    const { user } = this.props;
    if (!username) return null;

    return (
      <div>
        <Row className="d-flex align-items-end">
          <Col xs={12} sm={12} md={5} >
            <h1 className="greeting-line mb-3 text-center">Hey {username} 👋</h1>
            <Card className="profile-box mb-2">
              <Card.Body className="profile-info ">
                <h5 className="mb-3">Your info</h5>
                <p>Username: {user}</p>
                <p>First Name: {firstname}</p>
                <p>Last Name: {lastname}</p>
                <p>Email: {email}</p>
                <p>Birthday: {birthday}</p>
                <small className="text-light text-center">
                  <Link to="/">
                    <span className="register text-primary" onClick={this.handleDeregister}>
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
                <Form noValidate validated={this.state.validated} className="update-form">
                  <p>Need to make changes? Make them here!</p>

                  <Row>
                    <Col>
                      <Form.Group controlId="formFirstname" >
                        <Form.Control type="text" name="firstname" placeholder="New first name" onChange={this.handleInputChange} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Only letter characters allowed.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="formFirstname" >
                        <Form.Control type="text" name="lastname" placeholder="New last name" onChange={this.handleInputChange} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Only letter characters allowed.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formUsername" >
                        <Form.Control type="text" name="username" placeholder="New username" onChange={this.handleInputChange} pattern="[a-zA-Z0-9]+" required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must contain letters and/or numbers.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formPassword" >
                        <Form.Control type="password" name="password" placeholder="New password" onChange={this.handleInputChange} required minLength="5" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must be a minimum length of 5 characters and contains only numbers, letters, and/or special characters.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formEmail" >
                        <Form.Control type="email" name="email" placeholder="New email" onChange={this.handleInputChange} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Must be a valid email address.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="formBirthday" >
                        <Form.Control type="date" name="Birthday" placeholder="New birthday" onChange={this.handleInputChange} required />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid"> Please choose a valid date.</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="button-style" variant="primary" type="submit" onClick={this.handleUpdate}>
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
                      <Button className="delete-movie-btn" variant="primary" value={m._id} onClick={(e) => this.deleteMovie(e, m)}>Remove from Favorites</Button>
                    </Col>
                  )
                }
              })}
            </Row>
          )
        }
      </div >
    );
  }
}

// ProfileView.propTypes = {
//   user: PropTypes.object,
//   movies: PropTypes.array.isRequired,
//   onLoggedIn: PropTypes.func.isRequired,

// }

























