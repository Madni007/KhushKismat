import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post, postForm, put } from '../../utils/axios';
import { storeToken } from '../../utils/StorageToken';
const initialState = {
  voucherList: [],
  data: [],
  leftDrawerOpen:false,
  user: null,
  isAuth: false,
  loading: false,
  error: null,
  values: null,
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

export const postThunk = createAsyncThunk(
  '/postThunk',
  async (values, { rejectWithValue }) => {
    try {
      console.log('thnuk value: ', values.data);
      const response = await post(values.url, values.data);
      console.log("post thunk response", response)
      return response?.data;
    } catch (error) {
      console.log('postThunk error: ', error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);


export const postFormThunk = createAsyncThunk(
  '/postThunk',
  async (values, { rejectWithValue }) => {
    try {
      console.log('thnuk value: ', values.data);
      const response = await postForm(values.url, values.data);
      console.log("post multiform thunk response=>", response)
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const putThunk = createAsyncThunk(
  '/putThunk',
  async (values, { rejectWithValue }) => {
    try {
      const response = await put(values.url, values.data);
      return response.data;
    } catch (error) {
      console.log('putThunk error: ', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const delThunk = createAsyncThunk(
  '/putThunk',
  async (values, { rejectWithValue }) => {
    try {
      const response = await del(values.url, values.data);
      return response.data;
    } catch (error) {
      console.log('delThunk error: ', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const GetUserProfile = createAsyncThunk(
  'user/UserMyProfile', async (value, { rejectWithValue }) => {
    try {
      const { data } = await get('/dashboard/user-details');
      console.log("jasdlkjadsk", data)
      return { data };
    } catch (err) {

      console.log("get user profile error=>", err)
    }
  })

const commonSlice = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {

    setleftDrawerOpen(state, { payload }) {
      state.leftDrawerOpen = payload
    },
    setAppLoading(state, action) {
      // reducer logic for setting app loading
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      // reducer logic for handling successful user profile retrieval
      state.user = action.payload.data;
      state.loading = false;
    });
    // Add other extra reducers if needed
  }
});



export const { setleftDrawerOpen, setAppLoading } = commonSlice.actions;
export default commonSlice.reducer;
