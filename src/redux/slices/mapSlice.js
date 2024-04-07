import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post, postForm, put } from '../../utils/axios';
import { storeToken } from '../../utils/StorageToken';
const initialState = {
  addresses: [{ city: "Sharjah", address: "72H, Sharja", detail: "Al Ramla - East, Sharja", selected: true }],
  selectedLocation: null,
  loading: false,
  error: null,
  appLoading: false
};

export const getThunk = createAsyncThunk(
  '/getThunk',
  async (values, { rejectWithValue }) => {
    try {
      const response = await get(values.url);
      return response.data;
    } catch (error) {
      console.log('getThunk error: ', error);
      return rejectWithValue(error.response.data);
    }
  },
);



const mapSlice = createSlice({
  name: 'sliceName',
  initialState: initialState,
  reducers: {
    // reducers go here
    setAddresses(state, { payload }) {
      state.addresses = [...state.addresses, payload]
    },

    setSelectedLocation(state, { payload }) {
      console.log("payload............", payload)
      state.selectedLocation = payload
    },

  },
  extraReducers: (builder) => {

  }
});



export const { setAddresses, setSelectedLocation } = mapSlice.actions;
export default mapSlice.reducer;
