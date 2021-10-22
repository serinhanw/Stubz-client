import React from "react";
import PropTypes from 'prop-types';
import WebFont from 'webfontloader';


import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import './header.scss';

WebFont.load({
  google: {
    families:
      ['Anton:400', 'Oswald:200,300,400,500,700', 'Noto Sans Display:300,400,400italic,500,500italic,600']
  }
});

// function Header(props) {
export class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {

    const { user } = this.props;
    const movies = `/`;
    const genres = `/genres`;
    const directors = `/directors`;
    const profile = `/users/${user}`;

    if (!user) return null;
    // id="responsive-navbar-nav"
    return (
      <header>
        <Navbar collapseOnSelect className="pt-3 pb-1 pl-1 pr-1" expand="lg" sticky="top">
          <Container fluid>
            <Navbar.Brand href="/">Stubz</Navbar.Brand>
            <Navbar.Toggle className="navbar-toggle" aria-controls="navbarScroll" />
            <Navbar.Collapse className="menubar" id="navbarScroll">
              <Nav className=" my-2 my-lg-0 text-center ">
                {/* <Nav className="m-auto d-flex text-center"> */}
                <Nav.Link className="navlink" as={Link} to={movies}>Movies</Nav.Link>
                <Nav.Link className="navlink" as={Link} to={genres}>Genres</Nav.Link>
                <Nav.Link className="navlink " as={Link} to={directors}>Directors</Nav.Link>
              </Nav>

              <Nav className="pills ml-auto text-center">
                {/* <Nav className="d-flex text-center"> */}

                <Nav.Link className="user-menu" as={Link} to={profile}>
                  <span className="hi-span">Hi </span>
                  <span className="user-span">{user}</span>
                </Nav.Link>
                <Nav.Link className="logout align-content-center" to={'/'} onClick={this.onLoggedOut}>
                  <Button type="submit" bsPrefix="logout-btn">Logout</Button>
                </Nav.Link>

              </Nav>

              {/* <Nav.Item className="  ">
                  <Button type="submit" bsPrefix="logout-btn">Logout</Button>
                </Nav.Item> */}

              {/* <Nav className=" d-flex justify-content-end">
                <Nav.Link to={'/'} onClick={this.onLoggedOut}>
                  <Button type="submit" bsPrefix="logout-btn">Logout</Button>
                </Nav.Link>
              </Nav> */}
              {/* </Nav> */}


            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
export default Header;

