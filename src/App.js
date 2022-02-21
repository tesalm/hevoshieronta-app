import { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Layout from "./components/layout/Layout";
import { Login, Signup, Profile, NotFound, NewTreatment, Treatments, TreatmentDetails, MuscleGroups } from "./pages";
import AuthRoute from "./util/AuthRoute";
import ContextProvider from "./store/context-reducer";


function App() {
  const { state, dispatch } = useContext(ContextProvider);
  
  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch({ type: "LOGOUT" });
      } else {
        dispatch({ type: "SET_USER" });
      }
    } else dispatch({ type: "SET_UNAUTHENTICATED" });
  }, []);

  return (
    <Layout>
      <Switch>
        {/* Redirect to the Treatments page, until home page is complete */}
        <Redirect exact from="/" to="/hoidot" />

        <Route exact path="/kirjaudu" component={Login}>
          {state.isAuthenticated === true && <Redirect to="/hoidot" />}
        </Route>

        <Route exact path="/rekisteroidy" component={Signup}>
          {state.isAuthenticated === true && <Redirect to="/hoidot" />}
        </Route>

        <Route exact path="/lihasryhmat" component={MuscleGroups} />

        <AuthRoute
          authenticated={state.isAuthenticated}
          exact
          path="/hoitokortti"
          component={NewTreatment}
        />
        <AuthRoute
          authenticated={state.isAuthenticated}
          exact
          path="/hoidot"
          component={Treatments}
        />
        <AuthRoute
          authenticated={state.isAuthenticated}
          path="/hoidot/hoitotiedot/:id"
          component={TreatmentDetails}
        />
        <AuthRoute
          authenticated={state.isAuthenticated}
          path="/profiili"
          component={Profile}
        />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
