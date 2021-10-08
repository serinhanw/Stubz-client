import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import WebFont from 'webfontloader';
// import { Link } from "react-router-dom";
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios.get('https://stubz.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a movie is clicked, this func is invoked so updates state of 'selectedMovie' to property of the movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this func updates 'user' property in state to that specific user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(user) {
    this.setState({
      user
    });
  }



  render() {
    const { user, register, movies, selectedMovie } = this.state;


    /* If no user, the LoginView is rendered. If a user logged in, user details are passed as prop to LoginView */
    if (!user) {
      document.querySelector("body").classList.add("login-view");
      return (
        <Row className="justify-content-md-center align-items-center min-vh-100">
          <Col md={8}>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            <p className="party-txt mt-5 mb-2 text-center">Ready to join the party?</p>
            <p className="text-center">
              {/* <Link> */}
              <Button bsPrefix="party-btn" type="submit" onClick={(e) => { e.preventDefault; }}>Sign up here!</Button>
              {/* </Link> */}
            </p>

          </Col>
        </Row>
      );
    }
    // <Link to={`/register`}>Button for registering above when routing</Link>

    if (register) {
      return (
        <Row className="justify-content-md-center align-items-center min-vh-100">
          <Col md={8}>
            <RegistrationView onRegister={user => this.onRegister(user)} />
          </Col>
        </Row>
      );
    }

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center py-3 min-vh-100">
        {selectedMovie
          ? (
            <Row className="justify-content-md-center align-items-center py-3 min-vh-100">
              <Col className="px-5" lg={10} sm={12} xs={12}>
                < MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : movies.map(movie => (
            <Col className="py-4" lg={3} md={4} sm={6} xs={6} key={movie._id}>
              <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default MainView;

