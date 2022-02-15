import { useContext, useEffect, useState } from "react";
import { Button, Spinner, Card, Row, Col, Form } from "react-bootstrap";
import "./Treatments.css";
import ContextProvider from "../store/context-reducer";
import SearchBar from "../components/SearchBar";
import { getTreatments, getTreatmentsByDate, verifySession } from "../store/actions";
import { OWNER, HANDLER } from "../store/types";


const Treatments = (props) => {
  const {state, dispatch} = useContext(ContextProvider);
  const {treatments, profile} = state;
  const [loading, setLoading] = useState(treatments.length < 1);
  const [isMounted, setMount] = useState(false);
  const [filteredData, setFiltered] = useState(treatments);
  const [range, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1, 4).toISOString().split("T")[0], 
    end: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    if (!verifySession(dispatch)) return;
    if (!isMounted && treatments.length === 0) {
      async function fetchTreatments() {
        const userRole = localStorage.role;
        const res = await getTreatments(dispatch, userRole);
        if (Array.isArray(res)) setFiltered(res);
        setLoading(false);
      }
      fetchTreatments();
    }
    return () => { setMount(true) }; // component unmount
  }, []);

  const searchFilter = (query) => {
    let filtered = [];
    if (query.length > 1) {
      filtered = treatments.filter((item) => {
        const owner = item.owner.toLowerCase();
        const horse = item.horseName.toLowerCase();
        const id = item.treatmentId;
        const normalizedText = query.toLowerCase();
        return owner.indexOf(normalizedText) > -1
            || id.indexOf(normalizedText) > -1
            || horse.indexOf(normalizedText) > -1;
      });
      setFiltered(filtered);
    }
    if (query.length === 0) setFiltered(treatments);
  };

  const routeChange = () => {
    props.history.push("/hoitokortti");
  };

  const getTreatment = (treatment) => {
    props.history.push({
      pathname: "/hoidot/hoitotiedot/" + treatment.treatmentId,
      state: treatment
    });
  };

  const TreatmentCard = ({ card }) => (
    <Card onClick={() => getTreatment(card)}
      className={`card${card.treatment.treated && "-ready"} shadow-sm`}>
      <Card.Body className="p-3">
        <Row>
          <Col className="text-start nowrap">Hoito {card.treatmentId}</Col>
          <Col className="text-end">{card.date}</Col>
        </Row>
        {profile.userType === OWNER ? (
          <Card.Text className="text-start mt-0 nowrap">{card.horseName}</Card.Text> 
        ) : (
          <Row>
            <Col className="text-start mt-0 nowrap">{card.owner}</Col>
            <Col className="text-end mt-0 nowrap">{card.email}</Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  );

  const fetchTreatmentsByDate = async (event) => {
    event.preventDefault();
    const form = event.target;
    setDateRange({start: form.start.value, end: form.end.value});
    setLoading(true);
    const res = await getTreatmentsByDate(dispatch, form.start.value, form.end.value);
    if (Array.isArray(res)) setFiltered(res);
    setLoading(false);
  }

  const SearchTreatmentsByDate = () => (
    <Form onSubmit={fetchTreatmentsByDate}>
      <Row className="mb-2 mx-auto justify-content-center" >
        <Col xs={4} md={5} className="px-0" >
          <Form.Control required type="date" name="start" defaultValue={range.start}/>
        </Col>
        <Col xs="auto" md="auto" className="px-1"><p className="my-auto">__</p></Col>
        <Col xs={4} md={5} className="ps-0 pe-2">
          <Form.Control required type="date"
            defaultValue={range.end} name="end"/>
        </Col>
        <Col xs="auto" md="auto" className="px-0">
          <Button type="submit">Hae</Button>
        </Col>
      </Row>
    </Form>
  );

  const LoadingSpinner = () => (
    <div className="text-center">
      <Spinner className="my-5" animation="border" size="lg" variant="primary" />
    </div>
  );

  return (
    <div className="mx-auto page">
      <div className="px-3 pt-4 pb-5 bg-white border rounded shadow-sm">
        <h4>Hoidot</h4>
        {(localStorage.role === HANDLER) && <SearchTreatmentsByDate/>}
        <SearchBar searchFilter={searchFilter} />
        {loading ? <LoadingSpinner/> : treatments.length > 0 ? (
          filteredData.length > 0 ? ( 
            filteredData.map((card, index) => <TreatmentCard key={index} card={card} />)
          ) : (
            <p className="text-center text-secondary mt-5">
              Haku ei tuottanut tuloksia.
            </p>
          )
        ) : (
          <div className="text-center mb-4 mt-5">
            <p className="text-secondary">Ei hoitoja</p>
            {profile.userType === OWNER && <Button onClick={routeChange}>Täytä hoitohakemus</Button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Treatments;