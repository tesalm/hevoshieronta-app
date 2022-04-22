import { useContext, useState, useRef } from "react";
import { Form, Spinner, Accordion } from "react-bootstrap";
import Mapper from "../components/mapper/Mapper";
import TreatmentForm from "../components/TreatmentForm";
import AccordionItem from "../components/AccordionItem";
import confirmService from "../components/confirm-service";
import ContextProvider from "../store/context-reducer";
import { updateTreatment, postNewTreatment, deleteTreatment } from "../store/actions";
import { THERAPIST, massagesSchema } from "../store/types";
import { setRows, updateRows } from "../util/general";
import "./TreatmentDetails.css"


const TreatmentDetails = (props) => {
  const {dispatch} = useContext(ContextProvider);
  const formRef = useRef(null);
  const {state} = props.location;
  const [loading, setLoading] = useState(false);
  const [treatedAreas, setAreas] = useState(state ? state.treatment.massages : massagesSchema);
  const isReadOnly = localStorage.role === THERAPIST ? false : true;

  const submitTreatmentUpdate = async () => {
    const confirm = await confirmService.show({btnLabel: "Tallenna", message: "Tallenna hoitotiedot?"});
    if (!confirm) return;

    const details = formRef.current.value;
    const formData = {massages: treatedAreas, treatmentInfo: details};

    setLoading(true);
    await updateTreatment(formData, state.treatmentId, dispatch);
    setLoading(false);

    const isTreated = (treatedAreas.leftFlank.length || treatedAreas.rightFlank.length) > 0 ? true : false;
    state.treatment = {...formData, treated: isTreated};
    document.getElementById("content").scrollTo({top:0, left:0, behavior:"smooth"});
  };

  const submitNewTreatment = async () => {
    const confirm = await confirmService.show({btnLabel: "Tallenna", message: "Tallenna uutena hoitona?"});
    if (!confirm) return;

    const treatment = {...state, treatment: {massages: treatedAreas, treatmentInfo: formRef.current.value}};

    setLoading(true);
    const res = await postNewTreatment(treatment, dispatch);
    setLoading(false);

    props.history.replace({
      pathname: "/hoidot/hoitotiedot/" + res.treatmentId,
      state: res
    });
    document.getElementById("content").scrollTo({top:0, left:0, behavior:"smooth"});
  };

  const submitDeleteTreatment = async () => {
    const isTreated = (treatedAreas.leftFlank.length || treatedAreas.rightFlank.length) > 0 ? true : false;
    if (isTreated) return await confirmService.show({btnLabel: "OK", message: "Hoito sisältää hierontoja! Tyhjennä hierontatiedot ennen poistamista."});
    const confirm = await confirmService.show({btnLabel: "Poista", message: "Vahvista poisto kirjoittamalla POISTA", confDeletion: true});
    if (!confirm) return;

    setLoading(true);
    const res = await deleteTreatment(state.treatmentId, dispatch);
    setLoading(false);

    if (res) props.history.replace("/hoidot");
    document.getElementById("content").scrollTo({top:0, left:0, behavior:"smooth"});
  };

  if (!props.location.state) {
    props.history.push("/hoidot");
    return null;
  }

  return (
    <div className="mx-auto pt-4 pb-5">
      <h4>{state.horseName} hoitotiedot</h4>
      <Mapper
        treatments={treatedAreas}
        setAreas={setAreas}
        isReadOnly={isReadOnly}
      />
      <Accordion className="my-4">
        <AccordionItem
          bodyStyle="p-2"
          header="Hoitokortti"
          body={<TreatmentForm isReadOnly={true} formData={state} />}
        />
        <AccordionItem
          ekey="1"
          header={<p className="pe-3 m-0 nowrap">Hieronnat/Havainnot/Hoitosuunnitelma</p>}
          bodyStyle={!isReadOnly ? "p-2" : "p-3"}
          body={isReadOnly === false ? (
              <Form.Control
                ref={formRef}
                defaultValue={state.treatment.treatmentInfo}
                as="textarea"
                onChange={updateRows}
                rows={setRows(state.treatment.treatmentInfo)}
              /> ) : (
              (state.treatment.treatmentInfo || state.treatment.treated) ? state.treatment.treatmentInfo
                : <p className="text-secondary my-2">Hoito vireillä</p>
            )}
        />
      </Accordion>

      {isReadOnly === false && (
        <div className="d-flex justify-content-end">
          <button onClick={submitDeleteTreatment} disabled={loading} className="btn-custom danger me-auto">
            {loading ? <Spinner animation="border" size="sm" /> : "Poista"}
          </button>
          <button onClick={submitNewTreatment} disabled={loading} className="btn-custom me-2">
            {loading ? <Spinner animation="border" size="sm" /> : "Uusi hoito"}
          </button>
          <button onClick={submitTreatmentUpdate} disabled={loading} className="btn-custom">
            {loading ? <Spinner animation="border" size="sm" /> : "Tallenna"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TreatmentDetails;