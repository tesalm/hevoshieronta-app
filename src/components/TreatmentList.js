import { Link } from "react-router-dom";
import TreatmentCard from "./TreatmentCard";
import { OWNER } from "../store/types";

const TreatmentList = ({ treatments, filtered }) => {
  const userRole = localStorage.role;
  return (
    <>
      {treatments.length > 0 ? (
        filtered.length > 0 ? (
          filtered.map((card, index) => (
            <TreatmentCard key={index} treatment={card} role={userRole} />
          ))
        ) : (
          <p className="text-center text-secondary mt-5">
            Haku ei tuottanut tuloksia.
          </p>
        )
      ) : (
        <div className="text-center mb-4 mt-5">
          <p className="text-secondary">Ei hoitoja</p>
          {userRole === OWNER && (
            <Link to="/hoitokortti">Täytä hoitohakemus</Link>
          )}
        </div>
      )}
    </>
  );
};

export default TreatmentList;