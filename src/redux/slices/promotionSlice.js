import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageURI: '',
  title: '',
  description: '',
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    setImageAndDetails: (state, action) => {
        const { imageURI, title, description } = action.payload;
        state.imageURI = imageURI;
        state.title = title;
        state.description = description;
    },
  },
});

export const { setImageAndDetails} = promotionSlice.actions;
export default promotionSlice.reducer;
