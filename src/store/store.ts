import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import employeesSlice from 'store/EmployeesSlice/EmployeesSlice';

export const store = configureStore({
  reducer: {
    employeesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
