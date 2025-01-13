import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import plansReducer from './plansSlice';

// Create the store
const store = configureStore({
  reducer: {
    user: userReducer,
    plans: plansReducer
  }
});

export default store;

// Export types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
