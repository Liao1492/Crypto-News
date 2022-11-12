import React, { useState } from "react";
import { Typography, Select, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetNewsCryptoQuery } from "../../services/crypto-news-api";
import styles from "./News.module.scss";
import { useGetCryptosQuery } from "../../services/crypto-api";
const { Text, Title } = Typography;
const { Option } = Select;
function News({ simplified }) {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const quantity = simplified ? 6 : 12;
    const { data, isFetching } = useGetNewsCryptoQuery(quantity, newsCategory);
    const { data: coinList } = useGetCryptosQuery(100);
    console.log("Hey");
    console.log(coinList);
    console.log(data);
    if (isFetching)
        return (
            <div className="center">
                <Spin size="large" />
            </div>
        );
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className={styles.selectNews}
                        placeholder="Select a crypto"
                        optionFilterProp="children"
                        onChange={(e) => console.log(e)}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase())
                        }
                    >
                        <Option value="Cryptocurrencies">Cryptocurrency</Option>
                        {coinList?.data?.coins.map((coin) => (
                            <Option value={coin.name} key={coin.uuid}>
                                {coin.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}
            {data.value.map((n, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className={styles.newsCard}>
                        <a href={n.url} target="_blank" rel="noreferrer">
                            <div className={styles.newsImageContainer}>
                                <Title className="newsTitle" level={4}>
                                    {n.name}
                                </Title>
                                <img
                                    src={n?.image?.thumbnail?.contentUrl}
                                    alt="news image"
                                    className={styles.img}
                                />
                            </div>
                            <p>
                                {n.description > 100
                                    ? `${n.description.substring(0, 100)} ...`
                                    : n.description}
                            </p>
                            <div className={styles.providerContainer}>
                                <div>
                                    <Avatar
                                        src={
                                            n.provider[0]?.image?.thumbnail
                                                ?.contentUrl
                                        }
                                        alt=""
                                    />
                                    <Text className={styles.providerName}>
                                        {n.provider[0]?.name}
                                    </Text>
                                </div>
                                <Text>
                                    {moment(n.datePublished)
                                        .startOf("ss")
                                        .fromNow()}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default News;
