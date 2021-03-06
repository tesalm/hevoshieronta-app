import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === false ? <Redirect to="/kirjaudu" /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default AuthRoute;