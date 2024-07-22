import { useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import {
  Login,
  Signup,
  Profile,
  NotFound,
  NewTreatment,
  Treatments,
  TreatmentDetails,
  MuscleGroups,
} from "./pages";
import ContextProvider from "./store/context-reducer";
import { RequireAuth } from "./util/RequireAuth";

function App() {
  const { state } = useContext(ContextProvider);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/hoidot" replace />} />
          <Route
            path="/kirjaudu"
            element={
              state.isAuthenticated === true ? (
                <Navigate to="/hoidot" replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/rekisteroidy"
            element={
              state.isAuthenticated === true ? (
                <Navigate to="/hoidot" replace />
              ) : (
                <Signup />
              )
            }
          />
          <Route path="/lihasryhmat" element={<MuscleGroups />} />
          <Route
            path="/hoitokortti"
            element={
              <RequireAuth>
                <NewTreatment />
              </RequireAuth>
            }
          />
          <Route
            path="/hoidot"
            element={
              <RequireAuth>
                <Treatments />
              </RequireAuth>
            }
          />
          <Route
            path="/hoidot/hoitotiedot/:id"
            element={
              <RequireAuth>
                <TreatmentDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/profiili"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
