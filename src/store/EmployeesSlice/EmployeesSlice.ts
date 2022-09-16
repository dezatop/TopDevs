//Toolkit
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//API
import EmployeesAPI from './EmployeesAPI';
//Types
import {IUser} from './types'

export interface CounterState {
  users: IUser[];
  usersApi: IUser[];
  usersBirthday: IUser[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  users: [],
  usersApi: [],
  usersBirthday: [],
  status: 'idle',
};

export const getUsers = createAsyncThunk(
  'employees/getUsers',
  async () => {
    const response = await EmployeesAPI.getUsers();
    return response.data
  }
);

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    filterUsers: (state, action) => {
      state.users = state.usersApi.filter(({firstName}) => firstName[0].toUpperCase() === action.payload)
    },

    addUserBirthday: (state, action) => {
      const {payload} = action
      if (!!payload.length) {
        state.usersBirthday = payload
      } else {
        state.usersBirthday = [...state.usersBirthday, payload]
      }
    },

    deleteUserBirthday: (state, action) => {
      state.usersBirthday = state.usersBirthday.filter(user => user?.id !== action.payload)
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action.payload
        state.usersApi = action.payload
      })

      .addCase(getUsers.pending, (state, action) => {
        state.status = 'loading'
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
});

export const {filterUsers, addUserBirthday, deleteUserBirthday} = employeesSlice.actions;


export default employeesSlice.reducer;
