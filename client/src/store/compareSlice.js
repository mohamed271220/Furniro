import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    itemOneId: "",
    itemTwoId: "",
    quantity: 0,
  },
  reducers: {
    addItemToCompare: (state, action) => {
      // item id sent
      const { id } = action.payload;
      //if item 1 is not set yet set it
      if (state.itemOneId === "") {
        state.itemOneId = id;
        state.quantity++;
      } else if (state.itemTwoId === ""
      ) {
        if (state.itemOneId === id) {
          return
        }
        state.itemTwoId = id;
        state.quantity++;
      }
    },
    removeItemFromCompare: (state, action) => {
      const { id } = action.payload;
      if (state.itemOneId === id) {
        state.itemOneId = "";
        state.quantity--;
      } else if (state.itemTwoId === id) {
        state.itemTwoId = "";
        state.quantity--;
      }
    },
    swapItemOneCompare: (state, action) => {
      const { id } = action.payload;
      state.itemOneId = id;
    },
    swapItemTwoCompare: (state, action) => {
      const { id } = action.payload;
      state.itemTwoId = id;
    },
  },
});

export const compareActions = compareSlice.actions;
export default compareSlice;
