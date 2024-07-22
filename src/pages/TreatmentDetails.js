import { useContext, useState, useRef, useEffect } from "react";
import { Form, Spinner, Accordion } from "react-bootstrap";
import Mapper from "../components/mapper/Mapper";
import TreatmentForm from "../components/TreatmentForm";
import AccordionItem from "../components/AccordionItem";
import ContextProvider from "../store/context-reducer";
import { updateTreatment, postNewTreatment, deleteTreatment, verifySession } from "../store/actions";
import { THERAPIST, massagesSchema } from "../store/types";
import { setRows, updateRows, scrollToTop } from "../util/general";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { messages, useDialog } from "../util";

const TreatmentDetails = (props) => {
  const {dispatch} = useContext(ContextProvider);
  const formRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dialog = useDialog();
  
  const [loading, setLoading] = useState(false);
  const [treatedAreas, setAreas] = useState(state ? state.treatment.massages : massagesSchema);
  const isReadOnly = localStorage.role === THERAPIST ? false : true;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { verifySession(dispatch) }, []);

  const isTreated = () => {
    return (treatedAreas.leftFlank.length || treatedAreas.rightFlank.length) > 0
  };

  const submitTreatmentUpdate = async () => {
    dialog.openDialogWithProps({
      okBtnLabel: messages.save,
      message: messages.saveTreatmentData,
      onOkButtonClick: async () => {
        const details = formRef.current.value;
        const formData = { massages: treatedAreas, treatmentInfo: details };

        setLoading(true);
        await updateTreatment(formData, state.treatmentId, dispatch);
        setLoading(false);

        state.treatment = { ...formData, treated: isTreated() };
        scrollToTop();
      },
    });
  };

  const submitNewTreatment = async () => {
    dialog.openDialogWithProps({
      okBtnLabel: messages.save,
      message: messages.saveAsNewTreatment,
      onOkButtonClick: async () => {
        const treatment = {
          ...state,
          treatment: {
            massages: treatedAreas,
            treatmentInfo: formRef.current.value,
          },
        };
        setLoading(true);
        const res = await postNewTreatment(treatment, dispatch);
        setLoading(false);
    
        navigate("/hoidot/hoitotiedot/" + res.treatmentId, {
          replace: true,
          state: res,
        });
        scrollToTop();
      },
    });
  };

  const submitDeleteTreatment = async () => {
    const confirmDeleteDialogProps = {
      okBtnLabel: messages.delete,
      message: messages.confirmDeleteWrite,
      confirmDeletion: true,
      onOkButtonClick: async () => {
        setLoading(true);
        const res = await deleteTreatment(state.treatmentId, dispatch);
        setLoading(false);
        if (res) navigate("/hoidot", { replace: true });
        scrollToTop();
      },
    };
    if (isTreated()) {
      dialog.openDialogWithProps({
        okBtnLabel: messages.continue,
        message: messages.hasTreatments,
        onOkButtonClick: () =>
          dialog.openDialogWithProps(confirmDeleteDialogProps),
      });
    } else {
      dialog.openDialogWithProps(confirmDeleteDialogProps);
    }
  };

  if (!state) {
    navigate("/hoidot", { replace: true });
    return null;
  };

  return (
    <div className="mx-auto pt-4 pb-5" style={{ maxWidth: "42rem" }}>
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
          header={
            <p className="pe-3 m-0 nowrap">
              Hieronnat/Havainnot/Hoitosuunnitelma
            </p>
          }
          bodyStyle={!isReadOnly ? "p-2" : "p-3"}
          body={
            isReadOnly === false ? (
              <Form.Control
                ref={formRef}
                defaultValue={state.treatment.treatmentInfo}
                as="textarea"
                onChange={updateRows}
                rows={setRows(state.treatment.treatmentInfo)}
              />
            ) : state.treatment.treatmentInfo ? (
              state.treatment.treatmentInfo
            ) : (
              <p className="text-secondary my-2">{messages.noFindings}</p>
            )
          }
        />
      </Accordion>

      {isReadOnly === false && (
        <div className="d-flex justify-content-end">
          <button
            onClick={submitDeleteTreatment}
            disabled={loading}
            className="btn-custom danger me-auto"
          >
            {loading ? <Spinner animation="border" size="sm" /> : messages.delete}
          </button>
          <button
            onClick={submitNewTreatment}
            disabled={loading}
            className="btn-custom me-2"
          >
            {loading ? <Spinner animation="border" size="sm" /> : messages.newTreatment}
          </button>
          <button
            onClick={submitTreatmentUpdate}
            disabled={loading}
            className="btn-custom"
          >
            {loading ? <Spinner animation="border" size="sm" /> : messages.save}
          </button>
        </div>
      )}
      <ConfirmDialog {...dialog} />
    </div>
  );
};

export default TreatmentDetails;