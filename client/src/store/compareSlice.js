import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    itemOneId: "",
    itemTwoId: "",
  },
  reducers: {
    addItemToCompare: (state, action) => {
      // item id sent
      const item = action.payload;
      //if item 1 is not set yet set it
      if (state.itemOneId === "") {
        state.itemOneId = item;
      } else if(state.itemTwoId === ""){
        state.itemTwoId = item;
      }
    },
    removeItemFromCompare: (state, action) => {
      const id = action.payload;
      if (state.itemOneId === id) {
        state.itemOneId = "";
      } else if (state.itemTwoId === id) {
        state.itemTwoId = "";
      }
    },
    swapItemOneCompare: (state, action) => {
      const item = action.payload;
      state.itemOneId = item;
    },
    swapItemTwoCompare: (state, action) => {
      const item = action.payload;
      state.itemTwoId = item;
    },
  },
});

export const compareActions = compareSlice.actions;
export default compareSlice;
