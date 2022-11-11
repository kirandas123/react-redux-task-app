import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../constants';
import {
  addTask,
  fetchTasks,
  deleteTask
} from '../fake-backend/tasks';

const initialState = {
  data: [],
  fetchStatus: STATUS.UNINIT,
  addStatus: STATUS.UNINIT,
  deleteStatus: STATUS.UNINIT,
};

export const getTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await fetchTasks();
    return response;
  }
);

export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) => {
      const response = await deleteTask(taskId);
      return response;
    }
);

export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (task) => {
      const response = await addTask(task);
      return response;
    }
);

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.fetchStatus = STATUS.PENDING;
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        if (
          action?.payload?.success === true
          && Array.isArray(action?.payload?.tasks)
        ) {
          state.fetchStatus = STATUS.SUCCESS;
          state.data = action?.payload?.tasks;
        } else {
          state.fetchStatus = STATUS.FAILURE;
        }
      })
      .addCase(addTaskAsync.pending, (state) => {
        state.addStatus = STATUS.PENDING;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        if (
          action?.payload?.success === true
          && action?.payload?.task
          && typeof action?.payload?.task === 'object'
        ) {
          const newTasksArray = state?.data;
          const task = action.payload.task;
          newTasksArray?.push(task)

          state.addStatus = STATUS.SUCCESS;
          state.data = newTasksArray;
        } else {
          state.addStatus = STATUS.FAILURE;
        }
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.deleteStatus = STATUS.PENDING;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        if (
          action?.payload?.success === true
          && action?.payload?.taskId
        ) {
          const { taskId } = action?.payload;
          const newTasksArray = state?.data?.filter((task) => task?.id !== taskId);

          state.deleteStatus = STATUS.SUCCESS;
          state.data = newTasksArray;
        } else {
          state.deleteStatus = STATUS.FAILURE;
        }
      });
  }
});

export const selectTasks = (state) => state?.tasks;

export default tasksSlice.reducer;
