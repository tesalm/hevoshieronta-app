import { useContext, useState, useEffect } from "react";
import { FormControl, Form, Spinner, Row, Col } from "react-bootstrap";
import ContextProvider from "../store/context-reducer";
import { updateAccountAuth, updateProfileInfo, getProfileData } from "../store/actions";
import confirmService from '../components/confirm-service';


const Profile = (props) => {
  const {state, dispatch} = useContext(ContextProvider);
  const { name, address, phone } = state.profile;
  const [user, setUser] = useState(localStorage.user? localStorage.user : "");
  const [passw, setPassword] = useState("");
  const [newPassw, setNewPassword] = useState("");
  const [confPassw, setConfPassword] = useState("");
  const [loadingProf, setProfLoad] = useState((name && address && phone) === null);
  const [loadingAuth, setAuthLoad] = useState(false);

  useEffect(() => {
    if ((name && address && phone) === null) {
      async function fetchProfile() {
        await getProfileData(dispatch);
        setProfLoad(false);
      }
      fetchProfile();
    }
  }, []);

  const validateAuthForm = () => {
    if (newPassw.length > 0 || confPassw.length > 0)
      return newPassw.length > 5 && confPassw.length > 5 && user.length > 0 && passw.length > 0;
    return user.length > 0 && passw.length > 5;
  };

  const accountAuthSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      newEmail: event.target.email.value,
      password: event.target.currentPassw.value,
      newPassword: event.target.newPassw.value
    };

    if (credentials.newPassword !== event.target.confNewPassw.value) {
      dispatch({
        type: "NOTIFY",
        payload: { msg: "Salasanat eivät täsmää.", type: "warning" },
      });
      return;
    }
    const confirm = await confirmService.show({btnLabel: "Tallenna", message: "Vaihda tilin tunnistetiedot?"});
    if (!confirm) return;

    setAuthLoad(true);
    await updateAccountAuth(credentials, dispatch);
    setAuthLoad(false);
  };

  const profileInfoSubmit = async (event) => {
    event.preventDefault();
    const confirm = await confirmService.show({btnLabel: "Tallenna", message: "Vaihda profiilin tiedot?"});
    if (!confirm) return;

    const profileInfo = {
      name: event.target.name.value,
      address: event.target.address.value,
      phone: event.target.phone.value
    };

    setProfLoad(true);
    await updateProfileInfo(profileInfo, dispatch);
    setProfLoad(false);
  };

  return (
    <div style={{maxWidth:"42rem", margin:"auto"}}>
      <Form onSubmit={profileInfoSubmit} className="border rounded shadow-sm p-3 pt-4 mb-2 bg-white">
        <h4>Profiilin tiedot</h4>
        <Row className="mb-2">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Nimi</p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="text"
              name="name"
              maxLength={50}
              defaultValue={state.profile.name}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Osoite</p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="text"
              name="address"
              maxLength={50}
              defaultValue={state.profile.address}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Puhelinnumero</p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="number"
              name="phone"
              maxLength={20}
              defaultValue={state.profile.phone}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn-custom mt-2">
            {loadingProf ? (
              <Spinner animation="border" size="sm" />
              ) : (
              "Tallenna"
            )}
          </button>
        </div>
      </Form>

      <Form onSubmit={accountAuthSubmit} className="border rounded shadow-sm p-3 pt-4 mb-3 bg-white">
        <h4>Tilin tiedot</h4>
        <Row className="mb-4">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Nykyinen salasana <span style={{color:"red"}}>*</span></p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="password"
              name="currentPassw"
              required
              maxLength={40}
              onChange={(event) => setPassword(event.target.value)}
            />
            <small className="text-secondary">
              Kirjoita nykyinen salasanasi vaihtaaksesi seuraavat: Sähköpostiosoite tai Salasana.
            </small>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Sähköpostiosoite <span style={{color:"red"}}>*</span></p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="email"
              name="email"
              defaultValue={user}
              required
              maxLength={60}
              onChange={(event) => setUser(event.target.value)}
            />
            <small className="text-secondary">
              Syötä toimiva sähköpostiosoite. Sähköpostiosoitteesi ei näy missään julkisesti ja sitä käytetään vain kirjautumisen tunnuksena ja salasanasi päivittämiseen.
            </small>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Uusi salasana</p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="password"
              name="newPassw"
              maxLength={40}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="auto" sm={4} lg={3} className="pe-0">
            <p className="my-1">Vahvista salasana</p>
          </Col>
          <Col xs={12} sm={8} lg={9}>
            <FormControl
              type="password"
              name="confNewPassw"
              maxLength={40}
              onChange={(event) => setConfPassword(event.target.value)}
            />
            <small className="text-secondary">
              Kirjoita uusi salasana yllä oleviin kenttiin. Salasanassa on oltava vähintään 6 merkkiä. (Valinnainen)
            </small>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button disabled={!validateAuthForm()} type="submit" className="btn-custom mt-2">
            {loadingAuth ? (
              <Spinner animation="border" size="sm" />
              ) : (
              "Tallenna"
            )}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Profile;