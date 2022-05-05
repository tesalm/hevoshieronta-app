import { LinkContainer } from "react-router-bootstrap";
import styles from "../styles/Treatments.module.css";
import { Row, Col } from "react-bootstrap";
import { OWNER } from "../store/types";

const TreatmentCard = ({ treatment, role }) => {
  return (
    <LinkContainer to={{pathname:`/hoidot/hoitotiedot/${treatment.treatmentId}`, state: treatment}}>
      <div className={treatment.treatment.treated ? styles.cardReady : styles.card}>
        <Row>
          <Col className="text-start nowrap">Hoito {treatment.treatmentId}</Col>
          <Col className="text-end">{treatment.date}</Col>
        </Row>
        {role === OWNER ? (
          <p className="text-start m-0 nowrap">{treatment.horseName}</p> 
        ) : (
          <Row>
            <Col className="text-start mt-0 nowrap">{treatment.owner}</Col>
            <Col className="text-end mt-0 nowrap">{treatment.email}</Col>
          </Row>
        )}
      </div>
    </LinkContainer>
  )
}

export default TreatmentCard;