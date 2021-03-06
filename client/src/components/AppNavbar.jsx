import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return(<Navbar color="dark" dark expand="sm" className="mb-5">
    <Container>
      <NavbarBrand href="/">Lighthouse</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/"><i className="fas fa-boxes fa-fw"></i>Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/images"><i className="far fa-images fa-fw"></i>Images</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login"><i className="fas fa-sign-in-alt fa-fw"></i>Sign in</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Container>
  </Navbar>
  );
};

export default AppNavbar;
