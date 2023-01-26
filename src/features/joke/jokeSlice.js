import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJokes = createAsyncThunk("jokes/fetchJokes", async () => {
  const jokes = [];
  for (let i = 0; i < 6; i++) {
    var response = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        accept: "application/json",
      },
    });
    const joke = response.data;
    joke.score = 0;
    jokes.push(joke);
  }
  return jokes;
});

export const jokeSlice = createSlice({
  name: "joke",
  initialState: {
    jokes: [],
    loading: false,
    error: "",
  },
  reducers: {
    increaseScore: (state, action) => {
      const joke = state.jokes.filter((joke) => joke.id == action.payload)[0];
      joke.score++;
    },
    decreaseScore: (state, action) => {
      const joke = state.jokes.filter((joke) => joke.id == action.payload)[0];
      joke.score--;
    },
    getStoreData: (state, action) => {
      state.jokes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchJokes.fulfilled, (state, action) => {
      state.jokes = [...action.payload];
      state.loading = false;
      console.log(state.jokes);
    });
    builder.addCase(fetchJokes.rejected, (state) => {
      state.error = "xeta bash verdi!!!";
    });
  },
});

export const { increaseScore, decreaseScore, getStoreData } = jokeSlice.actions;

export default jokeSlice.reducer;
