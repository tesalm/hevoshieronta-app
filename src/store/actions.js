import {
  signinApiRequest,
  getTreatmentsApiRequest,
  getTreatmentsByDateApiRequest,
  getProfileDataApiRequest,
  postTreatmentApiRequest,
  postNewTreatmentApiRequest,
  deleteTreatmentApiRequest,
  updateTreatmentApiRequest,
  updateAccountAuthApiRequest,
  updateProfileInfoApiRequest } from "../util/api";
import { LOGIN, LOGOUT, LOADING, REQUEST_FAILURE, SET_TREATMENTS, NOTIFY, NEW_TREATMENT, DELETE_TREATMENT, SET_USER, UPDATE_ACCOUNT, UPDATE_PROFILE } from "./types";
import jwtDecode from "jwt-decode";

export async function signinUser(credentials, history, dispatch, isNewUser=false) {
  dispatch({type: LOADING});
  try {
    const data = await signinApiRequest(credentials, isNewUser);
    dispatch({
      type: LOGIN,
      payload: {
        profile: data.profile,
        token: data.token,
      },
    });
    history.push("/hoidot");

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function getTreatments(dispatch, role) {
  //dispatch({ type: LOADING });
  try {
    const data = await getTreatmentsApiRequest(role);
    dispatch({ type: SET_TREATMENTS, payload: data });
    return data;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function getTreatmentsByDate(dispatch, start, end) {
  try {
    const data = await getTreatmentsByDateApiRequest(start, end);
    dispatch({ type: SET_TREATMENTS, payload: data });
    return data;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function postTreatmentCard(formData, dispatch) {
  try {
    const res = await postTreatmentApiRequest(formData); 
    dispatch({
      type: NEW_TREATMENT,
      payload: {treatment: res, msg: "Hoitohakemus lähetetty"}
    });
    return true;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function postNewTreatment(treatment, dispatch) {
  try {
    const res = await postNewTreatmentApiRequest(treatment); 
    dispatch({
      type: NEW_TREATMENT,
      payload: {treatment: res, msg: "Uusi hoito luotu"}
    });
    return res;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function updateTreatment(formData, id, dispatch) {
  try {
    const res = await updateTreatmentApiRequest(formData, id);
    dispatch({
      type: NOTIFY,
      payload: { msg: "Hoito tallennettu.", type: "success" },
    });
    return res;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function deleteTreatment(id, dispatch) {
  try {
    const res = await deleteTreatmentApiRequest(id);
    dispatch({ type: DELETE_TREATMENT, payload: id });
    return res;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function updateAccountAuth(credentials, dispatch) {
  try {
    const res = await updateAccountAuthApiRequest(credentials);
    dispatch({ type: UPDATE_ACCOUNT, payload: res });
    return res;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function updateProfileInfo(profileInfo, dispatch) {
  try {
    const res = await updateProfileInfoApiRequest(profileInfo);
    dispatch({ type: UPDATE_PROFILE, payload: profileInfo });
    return res;

  } catch (err) {
    const pload = err.cause ? { err: err.message, code: err.cause }
      : { err: "Palvelimeen ei saatu yhteyttä" };
    dispatch({ type: REQUEST_FAILURE, payload: pload });
  }
};


export async function getProfileData(dispatch) {
  try {
    const res = await getProfileDataApiRequest();
    const data = {
      name: res.name,
      address: res.address,
      phone: res.phone
    }
    dispatch({ type: SET_USER, payload: data });
    return res;

  } catch (err) {
    console.error(err);
  }
};


export function verifySession(dispatch) {
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch({ type: LOGOUT });
      dispatch({
        type: NOTIFY,
        payload: { msg: "Istuntosi on vanhentunut", type: "danger" },
      });
    } else return true;
  } return false;
};