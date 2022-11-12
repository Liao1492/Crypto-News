import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
    "X-RapidAPI-Key": "9da7f0cda0msh953353d2896f98bp1a06ecjsndd9cd9b46d14",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url, params) => ({
    url,
    params,
    headers: cryptoHeaders,
});
console.log(createRequest("/coins"));
export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins`, { limit: count }),
        }),
        getCryptoDetail: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ uuid, timePeriod }) => {
                return createRequest(`/coin/${uuid}/history`, { timePeriod });
            },
        }),
    }),
});

export const { useGetCryptosQuery } = cryptoApi;
export const { useGetCryptoDetailQuery, useGetCryptoHistoryQuery } = cryptoApi;

// const options = {
//     method: "GET",
//     url: "https://coinranking1.p.rapidapi.com/exchanges",
//     params: {
//         referenceCurrencyUuid: "yhjMzLPhuIDl",
//         limit: "50",
//         offset: "0",
//         orderBy: "24hVolume",
//         orderDirection: "desc",
//     },
//     headers: {
//         "X-RapidAPI-Key": "9da7f0cda0msh953353d2896f98bp1a06ecjsndd9cd9b46d14",
//         "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
//     },
// };
