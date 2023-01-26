import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../features/joke/jokeSlice";

export default configureStore({
  reducer: {
    joke: jokeReducer,
  },
});
