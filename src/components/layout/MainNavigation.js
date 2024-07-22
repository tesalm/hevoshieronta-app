import { useContext, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ContextProvider from "../../store/context-reducer";
import { PROFILE_ICON, LOGIN_ICON, LOGOUT } from "../../store/types";
import styles from "../../styles/MainNavigation.module.css";
import { messages } from "../../util";

function MainNavigation() {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(ContextProvider);
  const [expanded, toggleNav] = useState(false);

  const logoutHandler = () => {
    dispatch({type: LOGOUT});
    navigate("/kirjaudu");
  };

  return (
    <div className={styles.navibar}>
      <Navbar bg="dark" variant="dark" expand="lg"
        onSelect={() => toggleNav(false)}
        onToggle={(exp) => toggleNav(exp)} expanded={expanded}
      >
        <Container fluid="xl">
          <LinkContainer to="/" className={styles.navbrand}>
            <Navbar.Brand>{messages.appTitle}</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="shadow-none"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <LinkContainer to="/lihasryhmat">
                <Nav.Link>{messages.muscleGroups}</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/hoitokortti">
                <Nav.Link>{messages.treatmentCard}</Nav.Link>
              </LinkContainer>
              {state.isAuthenticated && ( 
                <LinkContainer to="/hoidot">
                  <Nav.Link>{messages.treatments}</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className={styles.user}>
              {state.isAuthenticated ? (<>
                <NavDropdown
                  title={<><img height="26px" className={styles.icon} src={PROFILE_ICON} alt=""/>{state.profile.email}</>}
                  className="ms-auto"
                  id="basic-nav-dropdown"
                  onSelect={() => toggleNav(false)}
                >
                  <LinkContainer to="/profiili">
                    <NavDropdown.Item>{messages.myProfile}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    {messages.logout}
                  </NavDropdown.Item>
                </NavDropdown>
                </>) : (
                <LinkContainer to="/kirjaudu">
                  <Nav.Link>
                    {<><img height="19px" className={styles.icon} src={LOGIN_ICON} alt=""/>{messages.login}</>}
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