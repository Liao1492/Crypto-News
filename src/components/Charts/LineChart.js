import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Col, Row, Typography } from "antd";
import styles from "./LineChart.module.scss";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    Chart.register(...registerables);
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
        if (i === 1) {
            console.log(coinHistory?.data?.history[i].timestamp);

            console.log(
                new Date(coinHistory?.data?.history[i].timestamp * 1000)
            );
        }
        coinTimestamp.push(
            new Date(
                coinHistory?.data?.history[i].timestamp * 1000
            ).toLocaleDateString()
        );
    }
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price In USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options = {
        scales: {
            y: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Row className={styles.chartHeader}>
                <Title level={2} className={styles.chartTitle}>
                    {coinName} Price Chart
                </Title>
                <Col className={styles.priceContainer}>
                    <Title level={5} className={styles.priceChange}>
                        Change: {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className={styles.currentPrice}>
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    );
};

export default LineChart;
