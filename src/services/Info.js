import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL, 
  }),
  endpoints: (builder) => ({
    getTour: builder.query({
      query: () => 'tours',
    }),
      getTourTypes: builder.query({
      query: () => 'tour-types',
    }),
      getSlider: builder.query({
      query: () => 'sliders',
    }),
      getBlog: builder.query({
      query: () => 'blogs',
    }),
      getBlogGallery: builder.query({
      query: () => 'blog-gallery',
    }),
      getContactAdress: builder.query({
      query: () => 'contact-address',
    }),
      getTourLocation: builder.query({
      query: () => 'tour-location',
    }),
      getTourGallery: builder.query({
      query: () => 'tour-gallery',
    }),
      getTourItinerary: builder.query({
      query: () => 'itinerary',
    }),
      getTourIncludes: builder.query({
      query: () => 'includes',
    }),
      getTourExcludes: builder.query({
      query: () => 'excludes',
    }),
  }),
});

export const { useGetTourQuery, useGetTourTypesQuery, useGetSliderQuery, useGetBlogQuery, useGetBlogGalleryQuery, useGetContactAdressQuery, useGetTourLocationQuery, useGetTourGalleryQuery, useGetTourItineraryQuery, useGetTourIncludesQuery, useGetTourExcludesQuery} = dataApi;
