import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bnTourApi = createApi({
  reducerPath: 'bnTourApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => 'api/video',
    }),
    getHotels: builder.query({
      query: () => 'api/hotels',
    }),
    getHotelGallery: builder.query({
      query: () => 'api/hotel-gallery',
    }),
    getVisa: builder.query({
      query: () => 'api/visa',
    }),
  }),
});

export const { useGetVideoQuery, useGetHotelsQuery, useGetHotelGalleryQuery, useGetVisaQuery } = bnTourApi;

