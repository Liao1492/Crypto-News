import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailQuery } from "../../services/crypto-api";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import styles from "./CryptoDetailCoin.module.scss";
import { Col, Row, Typography, Select, Spin } from "antd";
import HTMLReactParser from "html-react-parser";
import LineChart from "../Charts/LineChart";
import { useGetCryptoHistoryQuery } from "../../services/crypto-api";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetailCoin = () => {
    const [timePeriod, setTimePeriod] = useState("7d");
    console.log("Time Period");
    console.log(timePeriod);
    const { coinId } = useParams();
    const { data, isFetching } = useGetCryptoDetailQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({
        uuid: coinId,
        timePeriod,
    });

    console.log(coinHistory);
    const cryptoDetails = data?.data?.coin;

    const time = ["24h", "7d", "30d"];
    if (!cryptoDetails || !coinHistory)
        return (
            <div className="center">
                <Spin size="large" />
            </div>
        );

    console.log(cryptoDetails);
    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "Rank",
            value: cryptoDetails.rank,
            icon: <NumberOutlined />,
        },
        {
            title: "24h Volume",
            value: `$ ${
                cryptoDetails["24hVolume"] &&
                millify(cryptoDetails["24hVolume"])
            }`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${
                cryptoDetails.marketCap && millify(cryptoDetails.marketCap)
            }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Number Of Markets",
            value: cryptoDetails.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        ,
        {
            title: "Total Supply",
            value: `$ ${
                cryptoDetails.supply.total === null
                    ? millify(cryptoDetails.supply.circulating)
                    : millify(cryptoDetails.supply.total)
            }`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${millify(cryptoDetails.supply.circulating)}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <Col className={styles.coinDetailContainer}>
            <Col className={styles.coinHeadingContainer}>
                <Title level={2} className={styles.coinName}>
                    {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in USD dollar. View Value
                    Statistic,market cap and suppply
                </p>
            </Col>
            <Select
                defaultValue={"7d"}
                className={styles.selectTimePeriod}
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((t) => (
                    <Option key={t}>{t}</Option>
                ))}
            </Select>
            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails.price)}
                coinName={cryptoDetails.name}
            />
            <Col className={styles.statsContainer}>
                <Col className={styles.coinValueStatistics}>
                    <Col className={styles.coinValueStatisticsHeading}>
                        <Title level={3} className={styles.coinDetailsHeading}>
                            {cryptoDetails.name}
                            {" Value Statistics"}
                        </Title>
                        <p>An overview showing stats of {cryptoDetails.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className={styles.coinStats} key={title}>
                            <Col className={styles.coinStatsName}>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className={styles.stats}>{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className={styles.coinValueStatistics}>
                    <Col className={styles.coinValueStatisticsHeading}>
                        <Title level={3} className={styles.coinDetailsHeading}>
                            {cryptoDetails.name} {" General Statistics"}
                        </Title>
                        <p>An overview showing stats of {cryptoDetails.name}</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className={styles.coinStats} key={title}>
                            <Col className={styles.coinStatsName}>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className={styles.stats}>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className={styles.coinDescLink}>
                <Row className={styles.coinDesc}>
                    <Title level={3} className={styles.coinDetailsHeading}>
                        What is {cryptoDetails.name}?
                    </Title>
                    {HTMLReactParser(cryptoDetails.description)}
                </Row>
                <Col className={styles.coinLinks}>
                    <Title level={3} className={styles.coinDetailsHeading}>
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className={styles.coinLink} key={link.name}>
                            <Title level={5} className={styles.linkName}>
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="norefer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetailCoin;
