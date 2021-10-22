import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import Button from "react-bootstrap/Button";

import './movie-view.scss';

import WebFont from 'webfontloader';


WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// // function MovieView(props) {
export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: "",
      birthday: "",
      favorites: [],
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
        // console.log(res);
        // console.log('User data is received!');
      })
      .catch((e) => {
        console.log('Error Retrieving User Data');
        console.log(e);
      });
  }

  addMovie(e, movieData) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'post',
      url: `https://stubz.herokuapp.com/users/${username}/movies/${movieData._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`Added to your Favorites`);
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });

  }

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
        window.location.reload();

      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //   addToFavorites() {
  //     const token = localStorage.getItem('token');
  //     const username = localStorage.getItem('user');

  //     axios.post(`https://stubz.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` }
  //       }).then(response => {
  //         alert(`Added to Favorites List`)
  //       }).catch(function (error) {
  //         console.log(error);
  //       });
  //   };

  render() {
    const { movieData, onBackClick, directors } = this.props;
    // const { movies } = this.props;
    // const username = localStorage.getItem('user');
    // const token = localStorage.getItem('token');
    const { favorites } = this.state;


    return (
      <Row className="movie-view">
        <Col>
          <Row className="justify-content-center">
            <Button className="mb-3" bsPrefix="back-btn" onClick={() => onBackClick(null)}>
              <i className="bi bi-arrow-left-circle"></i>
            </Button>
          </Row>
          <Row className="justify-content-center" /*md={6} sm={12}*/>
            <Figure>
              <Figure.Image className="movie-poster" width={300} height={310} src={movieData.ImagePath} crossOrigin="anonymous" alt={movieData.Title + " Poster"} />
            </Figure>
          </Row>

          <Row className="justify-content-center" >
            <Col className="movie-details">
              <Row className="title-fav">
                <Col xs={10} sm={10} >
                  <h2 className="movie-title">{movieData.Title}</h2>
                </Col>
                {(movieData._id === favorites.find((favoriteMovieID) => favoriteMovieID === movieData._id)) ? (
                  <Col>
                    <Button bsPrefix="favorites-btn" type="button" value={movieData._id} onClick={(e) => { this.deleteMovie(e, movieData); }}>
                      {/* <i className="bi bi-heart-fill"></i> */}
                      Delete
                    </Button>
                  </Col>
                ) : (
                  <Col>
                    <Button bsPrefix="favorites-btn" type="button" value={movieData._id} onClick={(e) => { this.addMovie(e, movieData); }}>
                      {/* <i className="bi bi-heart-fill"></i> */}
                      Add
                    </Button>
                  </Col>
                )}

              </Row>
              <p className="release-date">
                {/* <span className="label">Release Date: </span> */}
                <span className="value">{movieData.Year}</span>
              </p>
              <p className="movie-description">{movieData.Description}</p>
              <p className="movie-director">
                <span>Director: </span>
                {/* <Link className="director-name" to={`/directors/${movieData.Director[0]}`}> */}
                <Link className="director-name" to={`/directors/${movieData.Director._id}`}>
                  {/* {movieData.Director.map(directors => directors.Name).join(", ")} */}
                  {/* {directors.find((d) => d._id === movieData.Director[0]).Name} */}
                  {movieData.Director.Name}
                </Link>
              </p>
              {/* <Link to={`/genres/${movieData.Genre._id}`}> */}
              <Link to={`/genres/${movieData.Genre._id}`}>
                <Button bsPrefix="genre-btn" className="mb-4" type="button">
                  {/* {movieData.Genre.map(genres => genres.Name).join(", ")} */}
                  {movieData.Genre.Name}
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}


MovieView.propTypes = {
  movieData: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    // Genre: PropTypes.array.isRequired,
    // Director: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired
};

// MovieView.propTypes = {
//   movieData: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string,
//         Name: PropTypes.string,
//         Description: PropTypes.string,
//       }),
//     ),
//     Director: PropTypes.arrayOf(
//       PropTypes.shape({
//         _id: PropTypes.string,
//         Name: PropTypes.string,
//         Bio: PropTypes.string,
//         Birthyear: PropTypes.string,
//       }),
//     ),
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
//   movies: PropTypes.array.isRequired

// };










