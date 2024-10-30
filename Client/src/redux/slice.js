import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  currentQuestion: {
    _id: "64673c5aa0f219aa535d2abd",
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answer: "Mars",
  },
  result: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    currentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    result: (state, action) => {
      state.result = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  currentQuestion,
  result,
} = counterSlice.actions;

export default counterSlice.reducer;
