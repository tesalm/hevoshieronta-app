import { useContext, useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Treatments.module.css";
import ContextProvider from "../store/context-reducer";
import SearchBar from "../components/SearchBar";
import SearchByDate from "../components/SearchByDate";
import TreatmentList from "../components/TreatmentList";
import { getTreatments, getTreatmentsByDate, verifySession } from "../store/actions";
import { THERAPIST } from "../store/types";


const Treatments = (props) => {
  const {state, dispatch} = useContext(ContextProvider);
  const {treatments} = state;
  const [loading, setLoading] = useState(treatments.length < 1);
  const [isMounted, setMount] = useState(false);
  const [filteredData, setFiltered] = useState(treatments);

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

  const searchFilter = useCallback((query) => {
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
  }, [treatments]);

  const fetchTreatmentsByDate = useCallback(async (startDate, endDate) => {
    setLoading(true);
    const res = await getTreatmentsByDate(dispatch, startDate, endDate);
    if (Array.isArray(res)) setFiltered(res);
    setLoading(false);
  }, []);

  const LoadingSpinner = () => (
    <div className="text-center">
      <Spinner className="my-5" animation="border" size="lg" variant="primary" />
    </div>
  );

  return (
    <div className={styles.page}>
      <h4>Hoidot</h4>
      {localStorage.role === THERAPIST && (
        <SearchByDate fetchByDate={fetchTreatmentsByDate} />
      )}
      <SearchBar searchFilter={searchFilter} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TreatmentList treatments={treatments} filtered={filteredData} />
      )}
    </div>
  );
};

export default Treatments;