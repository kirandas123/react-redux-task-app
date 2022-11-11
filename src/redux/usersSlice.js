import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../constants';
import { fetchUsers } from '../fake-backend/users';

const initialState = {
  data: [],
  status: STATUS.UNINIT,
};

export const getUsersAsync = createAsyncThunk(
  'tasks/fetchUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        if (
          action?.payload?.success === true
          && Array.isArray(action?.payload?.users)
        ) {
          state.status = STATUS.SUCCESS;
          state.data = action?.payload?.users;
        } else {
          state.status = STATUS.FAILURE;
        }
      });
  },
});

export const selectUsers = (state) => state?.users;

export default usersSlice.reducer;
