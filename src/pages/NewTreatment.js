import { useContext, useEffect } from "react";
import classes from "./NewTreatment.module.css";
import ContextProvider from "../store/context-reducer";
import { postTreatmentCard, verifySession } from "../store/actions";
import TreatmentForm from "../components/TreatmentForm";
import confirmService from '../components/confirm-service';


const NewTreatment = (props) => {
  const {dispatch, state} = useContext(ContextProvider);
  const formDefaults = {
    owner: state.profile.name? (state.profile.name) : "",
    contactInfo: state.profile.address? (state.profile.address +", "+ state.profile.phone) : "",
  };

  useEffect(() => { verifySession(dispatch); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirm = await confirmService.show();
    if (!confirm) return;

    const form = event.target;
    const formDataObj = Object.fromEntries(new FormData(form).entries());
    const formData = { ...formDataObj };

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    const res = await postTreatmentCard(formData, dispatch);
    if (res) form.reset();
    document.getElementById("content").scrollTo({top:0, left:0, behavior:"smooth"});
  };

  return (
    <div className="p-3 pt-4 mb-3 border rounded shadow-sm bg-white">
      <h4 className={classes.formTitle}>Hoitokortti</h4>
      <TreatmentForm handleSubmit={handleSubmit} formData={formDefaults}/>
    </div>
  );
}

export default NewTreatment;