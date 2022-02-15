import { useContext, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextProvider from "../../store/context-reducer";
import { PROFILE_ICON, LOGIN_ICON, LOGOUT } from "../../store/types";
import "./MainNavigation.css";

function MainNavigation() {
  const history = useHistory();
  const {state, dispatch} = useContext(ContextProvider);
  const [expanded, toggleNav] = useState(false);

  const logoutHandler = () => {
    dispatch({type: LOGOUT});
    history.push("/kirjaudu");
  };

  return (
    <div className="navibar">
      <Navbar bg="dark" variant="dark" expand="lg"
        onSelect={() => toggleNav(false)}
        onToggle={(exp) => toggleNav(exp)} expanded={expanded}
      >
        <Container fluid="xl">
          <LinkContainer to="/" exact className="navbrand">
            <Navbar.Brand>Hevoshieronta</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="shadow-none"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <LinkContainer to="/lihasryhmat" exact>
                <Nav.Link>Lihasryhmät</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/hoitokortti" exact>
                <Nav.Link>Hoitokortti</Nav.Link>
              </LinkContainer>
              {state.isAuthenticated && ( 
                <LinkContainer to="/hoidot" exact>
                  <Nav.Link>Hoidot</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className="user">
              {state.isAuthenticated ? (<>
                <NavDropdown
                  title={<><img height="26px" className="pe-2 icon" src={PROFILE_ICON} alt=""/>{state.profile.email}</>}
                  className="ms-auto"
                  id="basic-nav-dropdown"
                  onSelect={() => toggleNav(false)}
                >
                  <LinkContainer to="/profiili">
                    <NavDropdown.Item>Oma profiili & tiedot</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Kirjaudu ulos
                  </NavDropdown.Item>
                </NavDropdown>
                </>) : (
                <LinkContainer to="/kirjaudu" exact>
                  <Nav.Link>
                    {<><img height="19px" className="pe-2 icon" src={LOGIN_ICON} alt=""/>Kirjaudu</>}
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MainNavigation;