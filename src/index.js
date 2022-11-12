import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./app/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
