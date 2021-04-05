import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link class="nav-link " to="/">FAMOUS BOOK SHOP</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">
            <Link class="nav-link" to="/order">My Order</Link>
          </Nav.Link>
          <Nav.Link href="#pricing">
          <Link class="nav-link" to="/admin">Admin</Link>
          </Nav.Link>

        </Nav>
        <Nav>
          <Nav.Link >
            <Link to="/login">Login</Link></Nav.Link>
          <Nav.Link  href="#memes">
            {
              loggedInUser.displayName || loggedInUser.name
            }
      </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};






export default Header;