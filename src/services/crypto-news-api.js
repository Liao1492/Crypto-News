import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsHeader = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "9da7f0cda0msh953353d2896f98bp1a06ecjsndd9cd9b46d14",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url, params) => ({
    url,
    params,
    headers: newsHeader,
});
export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNewsCrypto: builder.query({
            query: (count, category) =>
                createRequest(`/news`, { count, category }),
        }),
    }),
});

export const { useGetNewsCryptoQuery } = newsApi;
