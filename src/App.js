import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./styles/_global.scss";
import styles from "./styles/App.module.scss";
import {
    Navbar,
    Homepage,
    CryptoDetail,
    Cryptocurrencies,
    News,
    CryptoDetailCoin,
} from "./components/index";

const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.main}>
                <Layout>
                    <div className={styles.routes}>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route
                                path="/cryptocurrencies"
                                element={<Cryptocurrencies />}
                            />
                            <Route path="/crypto" element={<CryptoDetail />}>
                                <Route
                                    path=":coinId"
                                    element={<CryptoDetailCoin />}
                                />
                            </Route>
                            <Route path="/news" element={<News />} />
                        </Routes>
                    </div>
                </Layout>

                <div className={styles.footer}>
                    <Typography.Title
                        level={5}
                        style={{ color: "white", textAlign: "center" }}
                    >
                        Cryptoverse <br />
                        All rights reserved
                    </Typography.Title>
                    <Space>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/exchanges">Exchanges</NavLink>
                        <NavLink to="/news">News</NavLink>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default App;
