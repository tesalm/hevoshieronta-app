import { createContext, useReducer } from "react";
import { LOGIN, LOGOUT, LOADING, REQUEST_FAILURE, SET_TREATMENTS, NEW_TREATMENT, DELETE_TREATMENT, SET_USER, SET_UNAUTHENTICATED, NOTIFY, UPDATE_PROFILE, UPDATE_ACCOUNT } from "./types";

const ContextProvider = createContext();

const initialState = {
  profile: {
    name: null,
    address: null,
    phone: null,
    email: null,
    userType: null
  },
  isAuthenticated: undefined,
  loading: false,
  token: null,
  notification: {message: null, type: undefined},
  treatments: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        profile: {
          ...state.profile,
          ...action.payload,
          email: localStorage.user,
          userType: localStorage.role
        },
        token: localStorage.FBIdToken
      };
    case LOGIN:
      const idToken = `Bearer ${action.payload.token}`;
      localStorage.setItem('user', action.payload.profile.email);
      localStorage.setItem('role', action.payload.profile.userType);
      localStorage.setItem('FBIdToken', idToken);
      return {
        ...state,
        notification: {},
        isAuthenticated: true,
        loading: false,
        profile: {...action.payload.profile},
        token: idToken,
      };
    case UPDATE_ACCOUNT:
      const token = `Bearer ${action.payload.token}`;
      localStorage.setItem('user', action.payload.email);
      localStorage.setItem('FBIdToken', token);
      return {
        ...state,
        notification: {message: "Tilin tunnistetiedot päivitetty.", type: "success"},
        profile: { ...state.profile, email: action.payload.email },
        token: token,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
        notification: {message: "Profiili päivitetty.", type: "success"},
      };
    case REQUEST_FAILURE:
      if (action.payload.code === 401) {  // token expired
        localStorage.clear();
        return {
          ...initialState,
          isAuthenticated: false,
          notification: {message: action.payload.err, type: "danger"}
        };
      }
      return {
        ...state,
        loading: false,
        notification: {message: action.payload.err, type: "danger"}
      }
    case LOGOUT:
      localStorage.clear();
      return {...initialState, isAuthenticated: false};
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case SET_TREATMENTS:
      return {
        ...state,
        loading: false,
        treatments: action.payload
      };
    case NEW_TREATMENT:
      const currState = {...state};
      currState.treatments.unshift(action.payload.treatment)
      return {
        ...state,
        loading: false,
        notification: {
          message: action.payload.msg,
          type: "success" },
        treatments: currState.treatments
      };
    case DELETE_TREATMENT:
      const treatments = state.treatments;
      treatments.splice(treatments.findIndex(t => t.treatmentId === action.payload), 1);
      return {
        ...state,
        loading: false,
        notification: {
          message: `Hoito ${action.payload} poistettu`,
          type: "success" },
        treatments: treatments
      };
    case NOTIFY:
      return {
        ...state,
        loading: false,
        notification: {
          message: action.payload.msg,
          type: action.payload.type }
      };
    default:
      return state;
  }
};

export function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextProvider.Provider value={{state, dispatch}}>
      {props.children}
    </ContextProvider.Provider>
  );
}

export default ContextProvider;