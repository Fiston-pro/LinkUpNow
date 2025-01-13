import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { users, userData } from '../../lib/user';

// Define the initial state
const initialState = {
  users: users,
  loggedInUser: userData
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<{ id: number; updatedInfo: Partial<typeof users[0]> }>) {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex >= 0) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload.updatedInfo };
      }
    },
    addSmile(state, action: PayloadAction<{ id: number; smiles: number }>) {
      const user = state.users.find(user => user.id === action.payload.id);
      if (user) {
        user.smiles += action.payload.smiles;
      }
    },
    updateLoggedInUser(state, action: PayloadAction<Partial<typeof userData>>) {
      state.loggedInUser = { ...state.loggedInUser, ...action.payload };
    },
    // New action to add joined plan
    addJoinedPlan(state, action: PayloadAction<number>) {
      console.log('Adding plan:', action.payload);
      if (!state.loggedInUser.plansJoined.includes(action.payload)) {
        console.log('Plan not found, adding plan:', action.payload);
        state.loggedInUser.plansJoined.push(action.payload);
        console.log('User:', state.loggedInUser);
      }
    },
    // New action to remove joined plan
    removeJoinedPlan(state, action: PayloadAction<number>) {
      state.loggedInUser.plansJoined = state.loggedInUser.plansJoined.filter(id => id !== action.payload);
    }
  }
});

export const { updateUser, addSmile, updateLoggedInUser, addJoinedPlan, removeJoinedPlan } = userSlice.actions;
export default userSlice.reducer;
