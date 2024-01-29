import { combineReducers } from "@reduxjs/toolkit";
import user from "./slice/UserSlice";
import film from "./slice/FilmReducer";

const reducers = combineReducers({
    user,
    film,
});

export default reducers;