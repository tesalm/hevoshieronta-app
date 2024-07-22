import { useContext, useEffect } from "react";
import styles from "../styles/NewTreatment.module.css";
import ContextProvider from "../store/context-reducer";
import { postTreatmentCard, verifySession } from "../store/actions";
import TreatmentForm from "../components/TreatmentForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { messages, useDialog } from "../util";


const NewTreatment = (props) => {
  const { dispatch, state } = useContext(ContextProvider);
  const dialog = useDialog();
  const formDefaults = {
    owner: state.profile.name ? state.profile.name : "",
    contactInfo: state.profile.address
      ? state.profile.address + ", " + state.profile.phone
      : "",
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { verifySession(dispatch) }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dialog.openDialogWithProps({
      onConfirmClick: async () => {
        const form = event.target;
        const formDataObj = Object.fromEntries(new FormData(form).entries());
        const formData = { ...formDataObj };

        if (form.checkValidity() === false) event.stopPropagation();
        const res = await postTreatmentCard(formData, dispatch);
        if (res) form.reset();
        document
          .getElementById("content")
          .scrollTo({ top: 0, left: 0, behavior: "smooth" });
      },
    });
  };

  return (
    <div className={styles.formBackground}>
      <h4 className={styles.formTitle}>{messages.treatmentCard}</h4>
      <TreatmentForm handleSubmit={handleSubmit} formData={formDefaults} />
      <ConfirmDialog {...dialog} />
    </div>
  );
}

export default NewTreatment;