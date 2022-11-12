import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/crypto-api";
import styles from "./Homepage.module.scss";
import Cryptocurrencies from "../Crypto/Cryptocurrencies";
import News from "../News/News";
const { Title } = Typography;

function Homepage() {
    const { data, isFetching } = useGetCryptosQuery();
    const globalState = data?.data?.stats;
    if (isFetching)
        return (
            <div className="center">
                <Spin size="large" />
            </div>
        );
    console.log(globalState);
    return (
        <React.Fragment>
            <Title level={2} className={styles.heading}>
                Global Crytpo Stats
            </Title>
            <Row>
                <Col span={12}>
                    <Statistic
                        title="Total Cryptocurrencies"
                        value={millify(globalState.total)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total Exchanges"
                        value={millify(globalState.totalExchanges)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total Market Cap"
                        value={millify(globalState.totalMarketCap)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total 24h Volume"
                        value={millify(globalState.total24hVolume)}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Total Markets"
                        value={millify(globalState.totalMarkets)}
                    />
                </Col>
            </Row>
            <div className={styles.homeHeadingContainer}>
                <Title level={2} className={styles.homeTitle}>
                    Top 10 cryptocurrencies in the world
                </Title>
                <Title level={3} className={styles.showMore}>
                    <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />

            <div className={styles.homeHeadingContainer}>
                <Title level={2} className={styles.homeTitle}>
                    Latest Crypto News
                </Title>
                <Title level={3} className={styles.showMore}>
                    <Link to="/news">Show More</Link>
                </Title>
            </div>
            <News simplified />
        </React.Fragment>
    );
}

export default Homepage;
