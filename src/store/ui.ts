import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isCallbackForm: null,
  isEditModal: false,
  isIdParams: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCallbackForm: (state, { payload }) => {
      state.isCallbackForm = payload;
    },
    setIsEditModal: (state, { payload }) => {
      state.isEditModal = payload;
    },

    setIsIdParams: (state, { payload }) => {
      state.isIdParams = payload;
    },
  },
});

export const { setCallbackForm, setIsEditModal, setIsIdParams } = uiSlice.actions;
export default uiSlice.reducer;
