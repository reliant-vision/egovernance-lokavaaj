import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () =>{
    return (
            <>
              <Navbar expand="lg" className="bg-dark">
                <Container >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="text-light"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className="text-light">Home</Nav.Link>
                        <Nav.Link href="#about" className="text-light">About</Nav.Link>
                        <Nav.Link href="#contact" className="text-light">Contact</Nav.Link>
                        <NavDropdown title={<span className="text-light">Services</span>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1" className="text-dark">Create Application</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" className="text-dark">
                            Know Your Application Status
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </>
    )
}

export default NavBar;