import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store'; // Import AppDispatch and RootState for typing
import { addJoinedPlan, removeJoinedPlan } from './userSlice'; // Import actions from user slice
import { data } from '../../lib/plans';

// Thunk to handle joining a plan
export const joinPlan = createAsyncThunk(
  'plans/joinPlan',
  async ({ planId, userId }: { planId: number; userId: number }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const plan = state.plans.categories
      .flatMap(category => category.plans)
      .find(plan => plan.plan_id === planId);
    if (plan && plan.participants < plan.max_participants) {
      // Dispatch action to update user's joined plans
      dispatch(addJoinedPlan(planId));
      // Update the participants count
      plan.participants = plan.participants + 1;
    }
  }
);

// Thunk to handle leaving a plan
export const leavePlan = createAsyncThunk(
  'plans/leavePlan',
  async ({ planId, userId }: { planId: number; userId: number }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const plan = state.plans.categories
      .flatMap(category => category.plans)
      .find(plan => plan.plan_id === planId);

    if (plan && plan.participants > 0) {
      // Dispatch action to remove the plan ID from the user's joined plans
      dispatch(removeJoinedPlan(planId));
      // Update the participants count
      plan.participants = plan.participants - 1;
    }
  }
);

// Define initial state
const initialState = {
  community: data.community,
  categories: data.categories
};

// Create slice
const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    addChatMessage(
      state,
      action: PayloadAction<{ planId: number; userId: number; message: string; timestamp: string }>
    ) {
      state.categories.forEach(category => {
        category.plans.forEach(plan => {
          if (plan.plan_id === action.payload.planId) {
            plan.groupChat.push({
              id: plan.groupChat.length + 1,
              userId: action.payload.userId,
              message: action.payload.message,
              timestamp: action.payload.timestamp
            });
          }
        });
      });
    }
  }
});

export const { addChatMessage } = plansSlice.actions;
export default plansSlice.reducer;
