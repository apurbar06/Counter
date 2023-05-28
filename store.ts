/* eslint-disable prettier/prettier */
import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const counterSlice = createSlice({
  name: 'counters',
  initialState: {value: [{count: 0, counterName: 'Counter'}]},
  reducers: {
    incremented: (state, action: PayloadAction<{index: number}>) => {
      state.value = state.value.map((e, i) =>
        i === action.payload.index ? {...e, count: e.count + 1} : e,
      );
    },
    decremented: (state, action: PayloadAction<{index: number}>) => {
      state.value = state.value.map((e, i) =>
        i === action.payload.index ? {...e, count: e.count - 1} : e,
      );
    },
    reset: (
      state,
      action: PayloadAction<{index: number; resetValue: number}>,
    ) => {
      state.value = state.value.map((e, i) =>
        i === action.payload.index
          ? {...e, count: action.payload.resetValue}
          : e,
      );
    },
    changeName: (
      state,
      action: PayloadAction<{index: number; name: string}>,
    ) => {
      state.value = state.value.map((e, i) =>
        i === action.payload.index
          ? {...e, counterName: action.payload.name}
          : e,
      );
    },
    addCounter: state => {
      state.value.push({count: 0, counterName: 'Counter'});
    },
  },
});


export const actions = counterSlice.actions;
export const store = configureStore({
  reducer: counterSlice.reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
