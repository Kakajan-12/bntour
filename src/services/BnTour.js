import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bnTourApi = createApi({
  reducerPath: 'bnTourApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BN_URL }),
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => 'video',
    }),
    getHotels: builder.query({
      query: () => 'hotels',
    }),
    getHotelGallery: builder.query({
      query: () => 'hotel-gallery',
    }),
    getVisa: builder.query({
      query: () => 'visa',
    }),
  }),
});

export const { useGetVideoQuery, useGetHotelsQuery, useGetHotelGalleryQuery, useGetVisaQuery } = bnTourApi;

