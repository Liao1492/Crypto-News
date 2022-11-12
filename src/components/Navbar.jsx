import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import styles from "../styles/Navbar.module.scss";
import { NavLink } from "react-router-dom";
import {
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
    BuildOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import icon from "../img/cryptocurrency.png";
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setSceenSize] = useState(null);

    useEffect(() => {
        console.log(window.innerWidth);
        const handleSize = () => setSceenSize(window.innerWidth);

        window.addEventListener("resize", handleSize);

        handleSize();

        return () => window.removeEventListener("resize", handleSize);
    }, []);

    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);
    const items = [
        {
            label: <NavLink to="/">Home</NavLink>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>,
            key: "cryptocurrencies",
            icon: <FundOutlined />,
        },
        {
            label: <NavLink to="/news">News</NavLink>,
            key: "news",
            icon: <BuildOutlined />,
        },
    ];
    return (
        <div className={styles.navContainer}>
            <div className={styles.logoContainer}>
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className={styles.logo}>
                    <NavLink to="/">Cryptoverse</NavLink>
                </Typography.Title>
                {/* <Button className="menu-control-container"></Button> */}
                <Button
                    className={styles.menuControlContainer}
                    onClick={() => setActiveMenu((prev) => !prev)}
                >
                    <MenuOutlined />
                </Button>
            </div>

            {activeMenu && <Menu theme="dark" items={items}></Menu>}
        </div>
    );
};

export default Navbar;
