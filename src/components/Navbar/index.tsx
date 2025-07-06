"use client";

import React, { useCallback, useState } from "react";
import { Drawer, Menu, Select, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useI18n } from "@/context/I18nContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import styles from "./style.module.css";

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Products and Services 下拉菜单项
  const productsMenuItems = [
    {
      label: (
        <a href="/products/biomass-gasification">生物质废弃物气化发电系统</a>
      ),
      key: "product1",
      className: "activeMenuItem",
    },
    {
      label: <a href="/products/smart-ev-charging">智慧EV充电生态体系</a>,
      key: "product2",
      className: "activeMenuItem",
    },
    {
      label: (
        <a href="/products/power-storage-integration">分布式光储充一体化系统</a>
      ),
      key: "product3",
      className: "activeMenuItem",
    },
    {
      label: <a href="/products/ai-robot">AI棕榈果采摘机器人</a>,
      key: "product4",
      className: "activeMenuItem",
    },
  ];

  const menuItems = [
    {
      label: <a href="/products/biomass-gasification"> 生物质气化发电系统 </a>,
      key: "product1",
      className: "activeMenuItem",
    },
    {
      label: <a href="/products/smart-ev-charging"> 智慧EV充电生态体系 </a>,
      key: "product2",
      className: "activeMenuItem",
    },
    {
      label: <a href="/about">{t("about")}</a>,
      key: "about",
      className: "activeMenuItem",
    },
    {
      label: <a href="#contact">{t("contact")}</a>,
      key: "contact",
      className: "activeMenuItem",
    },
  ];

  const handleLangChange = useCallback(
    (value: "zh" | "en") => setLang(value),
    [setLang]
  );

  // 判断菜单项是否激活
  const isActiveMenuItem = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname]
  );

  // 判断产品菜单是否激活
  const isProductsActive = useCallback(() => {
    return pathname.startsWith("/products");
  }, [pathname]);

  return (
    <nav className={styles.cNavbarWrap}>
      {/* Logo */}
      <Link href="/">
        <div className={styles.cNavbarLogo} />
      </Link>
      {/* 右侧菜单 */}
      <div className={styles.desktopMenu}>
        <Dropdown
          menu={{ items: productsMenuItems }}
          trigger={["hover"]}
          placement="bottomLeft"
          overlayClassName="products-dropdown"
        >
          <div
            className={classNames(styles.navbarMenuItem, {
              [styles.active]: isProductsActive(),
            })}
          >
            Products and Services
            <MenuOutlined style={{ fontSize: "12px", marginLeft: "12px" }} />
          </div>
        </Dropdown>
        <Link
          href="/about"
          className={classNames(styles.navbarMenuItem, {
            [styles.active]: isActiveMenuItem("/about"),
          })}
        >
          Company introduction
        </Link>
        <Link href="/">
          <div className={styles.navbarMenuItemContact}>{t("contact")}</div>
        </Link>
        <Link href="">
          <div
            className={classNames(styles.navbarMenuItem, {
              [styles.active]: isProductsActive(),
            })}
          >
            <Image
              src="/header/call-default.png"
              alt="call"
              width={19}
              height={18}
              style={{ marginRight: 8 }}
            />
            AI Link
            <a href="tel:+60164802817" className={styles.callLink}>
              +60164802817
            </a>
          </div>
        </Link>
        {/* <Select
          value={lang}
          onChange={handleLangChange}
          style={{ width: 100 }}
          options={[
            { value: "zh", label: "zh" },
            { value: "en", label: "en" },
          ]}
        /> */}
      </div>

      {/* 移动端菜单 */}
      <div className={styles.mobileMenu} style={{ display: "none" }}>
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
    </nav>
  );
};

export default Navbar;
