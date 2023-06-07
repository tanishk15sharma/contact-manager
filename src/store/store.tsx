import { configureStore } from "@reduxjs/toolkit";
import contractReducer from "../features/ContactsSlice";
const store = configureStore({
  reducer: {
    contacts: contractReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
