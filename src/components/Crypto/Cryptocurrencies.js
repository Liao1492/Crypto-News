import React, { useEffect } from "react";
import millify from "millify";
import { NavLink } from "react-router-dom";
import { Card, Col, Row, Input, Spin } from "antd";
import { useGetCryptosQuery } from "../../services/crypto-api";
import { useState } from "react";
import styles from "./Cryptocurrencies.module.scss";
import { filter } from "domutils";
function Cryptocurrencies({ simplified }) {
    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");
    console.log(cryptos);
    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchedTerm.toLowerCase())
        );
        setCryptos(filteredData);
    }, [cryptoList, searchedTerm]);
    if (isFetching)
        return (
            <div className="center">
                <Spin size="large" />
            </div>
        );
    return (
        <>
            {!simplified && (
                <div className={styles.searchCrypto}>
                    <Input
                        placeholder="search cryptocurrency"
                        onChange={(e) => setSearchedTerm(e.target.value)}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className={styles.cryptoCardContainer}>
                {cryptos?.map((curr) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className={styles.cryptoCard}
                        key={curr.uuid}
                    >
                        <NavLink to={`/crypto/${curr.uuid}`}>
                            <Card
                                title={`${curr.rank}. ${curr.name} `}
                                extra={
                                    <img
                                        className={styles.cryptoImage}
                                        src={curr.iconUrl}
                                    />
                                }
                                hoverable
                            >
                                <p>Price: {millify(curr.price)}</p>
                                <p>Marketcap: {millify(curr.marketCap)}</p>
                                <p>Daily change: {millify(curr.change)} % </p>
                            </Card>
                        </NavLink>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Cryptocurrencies;
