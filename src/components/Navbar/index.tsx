"use client";

import React, { useCallback, useState } from "react";
import { Drawer, Menu, Select, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useI18n } from "@/context/I18nContext";
import Image from "next/image";
import "./index.css";

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Products and Services 下拉菜单项
  const productsMenuItems = [
    {
      label: <a href="/products/biomass-gasification"> 生物质气化发电系统 </a>,
      key: "product1",
    },
    {
      label: <a href="/products/smart-ev-charging"> 智慧EV充电生态体系 </a>,
      key: "product2",
    },
    { label: <a href="#product3">产品服务3</a>, key: "product3" },
  ];

  const menuItems = [
    {
      label: <a href="/products/biomass-gasification"> 生物质气化发电系统 </a>,
      key: "product1",
    },
    {
      label: <a href="/products/smart-ev-charging"> 智慧EV充电生态体系 </a>,
      key: "product2",
    },
    { label: <a href="/about">{t("about")}</a>, key: "about" },
    { label: <a href="#contact">{t("contact")}</a>, key: "contact" },
  ];

  const handleLangChange = useCallback(
    (value: "zh" | "en") => setLang(value),
    [setLang]
  );

  return (
    <nav className="c-navbar-wrap">
      {/* Logo */}
      <div className="c-navbar-logo">
        <Image
          src="/images/navbar-logo.jpg"
          alt="LOGO"
          width={58}
          height={36}
        />
      </div>

      {/* 右侧菜单 */}
      <div className="desktop-menu">
        <Dropdown
          menu={{ items: productsMenuItems }}
          trigger={["hover"]}
          placement="bottomLeft"
        >
          <div className="navbar-menu-item">
            {t("product")}
            <MenuOutlined style={{ fontSize: "12px", marginLeft: "12px" }} />
          </div>
        </Dropdown>
        <a href="/about" className="navbar-menu-item">
          {t("about")}
        </a>
        <a href="#contact">
          <Image
            src="/images/navbar-btn.png"
            alt="联系我们"
            width={170}
            height={40}
          />
        </a>
        <Select
          value={lang}
          onChange={handleLangChange}
          style={{ width: 100 }}
          options={[
            { value: "zh", label: "zh" },
            { value: "en", label: "en" },
          ]}
        />
      </div>

      {/* 移动端菜单 */}
      <div className="mobile-menu" style={{ display: "none" }}>
        <MenuOutlined
          style={{ color: "#fff", fontSize: 24 }}
          onClick={() => setDrawerOpen(true)}
        />
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        >
          <Menu mode="vertical" items={menuItems} />
          <Select
            value={lang}
            onChange={handleLangChange}
            style={{ width: 100 }}
            options={[
              { value: "zh", label: "zh" },
              { value: "en", label: "en" },
            ]}
          />
        </Drawer>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu {
            display: block !important;
          }
          .center-menu {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .center-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
