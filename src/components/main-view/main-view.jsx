import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { GenreList } from '../genre-view/genre-list';
import { DirectorView } from '../director-view/director-view';
import { DirectorList } from '../director-view/director-list';
import { ProfileView } from '../profile-view/profile-view';
import { Header } from '../header/header';

import './main-view.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// import { Link } from "react-router-dom";

// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families:
//       ['Anton:400', 'Noto Sans Display:300,400,400italic,500,500italic,600']
//   }
// });

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      // Initial state is set to null
      movies: [],
      directors: [],
      genres: [],
      // selectedMovie: null,
      user: null,
      // favorites: []
      // register: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
      // this.getUsers(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
    // this.getUsers(authData.token);
  }


  //   // /* When a movie is clicked, this func is invoked so updates state of 'selectedMovie' to property of the movie */
  //   // setSelectedMovie(newSelectedMovie) {
  //   //   this.setState({
  //   //     selectedMovie: newSelectedMovie
  //   //   });
  //   // }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  // onRegister(register) {
  //   this.setState({
  //     register: register,
  //   });
  // }

  getMovies(token) {
    axios.get('https://stubz.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios.get('https://stubz.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          genres: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDirectors(token) {
    axios.get('https://stubz.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          directors: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    axios.get('https://stubz.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movies, user, directors, genres } = this.state;

    return (
      <Router>
        <Header user={user} />
        <Row className="main-view justify-content-center align-items-center min-vh-100">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              {/* <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} /> */}
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} directors={directors} onBackClick={() => history.goBack()} />

            </Col>
          }} />

          <Route exact path="/directors" render={() => {
            // console.log(directors)
            return directors.map(m => (
              <Col md={8} key={m._id}>
                <DirectorList director={m} />
              </Col>
            ))
          }} />


          <Route path="/directors/:name" render={({ match, history }) => {
            // <Route path="/directors/:directorId" render={({ match, history }) => {

            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              {/* <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} /> */}
              {/* <DirectorView director={directors.find(m => m.Name === match.params.name)} onBackClick={() => history.goBack()} /> */}
              <DirectorView
                director={directors.find(m => m._id === match.params.name)}
                movies={movies.filter(m => m.Director.Name === match.params.name)}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }} />

          <Route exact path="/genres" render={() => {
            // console.log(genres)
            return genres.map(m => (
              <Col md={8} key={m._id}>
                {/* <GenreView genre={m} /> */}
                <GenreList genre={m} />
              </Col>
            ))
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            {/* <Route path="/genres/:genreId" render={({ match, history }) => { */ }
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              {/* <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} /> */}
              <GenreView
                genre={genres.find(m => m._id === match.params.name)}
                movies={movies.filter(m => m.Genre.Name === match.params.name)}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }} />

          <Route path="/users/:username" render={(match, history) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              {/* <ProfileView history={history} movies={movies} user={user} onBackClick={() => history.goBack()} /> */}
              <ProfileView history={history} movies={movies} />
            </Col>
          }} />


          {/* <Route path="/users/edit" render={(history) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Col>
          }} /> */}

        </Row>
      </Router>
    );
  }
}

export default MainView;



