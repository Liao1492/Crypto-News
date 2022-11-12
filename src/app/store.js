import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/crypto-api";
import { newsApi } from "../services/crypto-news-api";
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
    },
});
