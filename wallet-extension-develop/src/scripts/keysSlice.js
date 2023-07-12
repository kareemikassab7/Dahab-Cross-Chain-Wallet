import { createSlice } from '@reduxjs/toolkit';

const keysSlice = createSlice({
  name: 'keys',
  initialState: {},
  reducers: {
    addKeyPair: (state, action) => {
      const { key, publicKey, privateKey } = action.payload;
      state[key] = { publicKey, privateKey };
    },
  },
});

export const { addKeyPair } = keysSlice.actions;

export default keysSlice.reducer;
