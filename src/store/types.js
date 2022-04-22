// Reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const SET_USER = "SET_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOADING = "LOADING";
export const NOTIFY = "NOTIFY";
export const REQUEST_FAILURE = "REQUEST_FAILURE";
export const SET_TREATMENTS = "SET_TREATMENTS";
export const NEW_TREATMENT = "NEW_TREATMENT";
export const DELETE_TREATMENT = "DELETE_TREATMENT";
export const POST_TREATMENT = "POST_TREATMENT";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

// User types
export const OWNER = "omistaja";
export const THERAPIST = "hoitaja";

// Icons and image urls
export const PROFILE_ICON = "https://res.cloudinary.com/djviqofzs/image/upload/v1636981580/hh-web/user_isgb6s.png";
export const SEARCH_ICON = "https://res.cloudinary.com/djviqofzs/image/upload/v1636981572/hh-web/search_rvizet.png";
export const LOGIN_ICON = "https://res.cloudinary.com/djviqofzs/image/upload/v1644250919/hh-web/lock_e5npxl.png";

// DB schemas
export const massagesSchema = {
  leftFlank: [],
  rightFlank: []
};

const treatment = {
  massages: massagesSchema,
  treatmentInfo: "",
  treated: false
};