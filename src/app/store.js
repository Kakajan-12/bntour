import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dataApi } from '../services/Info';
import { bnTourApi } from '../services/BnTour';

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    [bnTourApi.reducerPath]: bnTourApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dataApi.middleware)
      .concat(bnTourApi.middleware),
});

setupListeners(store.dispatch);
