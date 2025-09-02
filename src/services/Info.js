import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL, 
  }),
  endpoints: (builder) => ({
    getTour: builder.query({
      query: () => 'api/tours',
    }),
      getTourTypes: builder.query({
      query: () => 'api/tour-types',
    }),
      getSlider: builder.query({
      query: () => 'api/sliders',
    }),
      getBlog: builder.query({
      query: () => 'api/blogs',
    }),
      getBlogGallery: builder.query({
      query: () => 'api/blog-gallery',
    }),
      getContactAdress: builder.query({
      query: () => 'api/contact-address',
    }),
      getTourLocation: builder.query({
      query: () => 'api/tour-location',
    }),
      getTourGallery: builder.query({
      query: () => 'api/tour-gallery',
    }),
      getTourItinerary: builder.query({
      query: () => 'api/itinerary',
    }),
      getTourIncludes: builder.query({
      query: () => 'api/includes',
    }),
      getTourExcludes: builder.query({
      query: () => 'api/excludes',
    }),
  }),
});

export const { useGetTourQuery, useGetTourTypesQuery, useGetSliderQuery, useGetBlogQuery, useGetBlogGalleryQuery, useGetContactAdressQuery, useGetTourLocationQuery, useGetTourGalleryQuery, useGetTourItineraryQuery, useGetTourIncludesQuery, useGetTourExcludesQuery} = dataApi;
