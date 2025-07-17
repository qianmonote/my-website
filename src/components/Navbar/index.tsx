"use client";

import React, { useCallback, useState } from "react";
import { Drawer, Menu, Dropdown, Switch } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useI18n } from "@/context/I18nContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import styles from "./style.module.css";
import ContactModal from "../elements/ContactModal";

type NavbarProps = Partial<{
  noShowLangChange: boolean;
}>;

// 中英文菜单项
const menuItemsLangMap = {
  product1: {
    zh: "生物质气化发电系统",
    en: "Biomass Gasification Power Generation System",
  },
  product2: {
    zh: "分布式光储充一体化系统",
    en: "Distributed PV-Storage-Charging System",
  },
  product3: {
    zh: "智慧EV充电生态体系",
    en: "Distributed Solar Photovoltaic Power Systems",
  },
  about: {
    zh: "公司简介",
    en: "Company Introduction",
  },
  contact: {
    zh: "联系我们",
    en: "Contact Us",
  },
  productsAndServices: {
    zh: "产品与服务",
    en: "Products and Services",
  },
};

const Navbar: React.FC<NavbarProps> = ({ noShowLangChange = false }) => {
  const { lang, setLang, t } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Products and Services 下拉菜单项
  const productsMenuItems = [
    {
      label: (
        <a href="/products/biomass-gasification">
          {menuItemsLangMap.product1[lang]}
        </a>
      ),
      key: "product1",
      className: "activeMenuItem",
    },
    {
      label: (
        <a href="/products/power-storage-integration">
          {menuItemsLangMap.product2[lang]}
        </a>
      ),
      key: "product2",
      className: "activeMenuItem",
    },
    {
      label: (
        <a href="/products/smart-ev-charging">
          {menuItemsLangMap.product3[lang]}
        </a>
      ),
      key: "product3",
      className: "activeMenuItem",
    },
  ];

  const menuItems = [
    ...productsMenuItems,
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
            {menuItemsLangMap.productsAndServices[lang]}
            <MenuOutlined style={{ fontSize: "12px", marginLeft: "12px" }} />
          </div>
        </Dropdown>
        <Link
          href="/about"
          className={classNames(styles.navbarMenuItem, {
            [styles.active]: isActiveMenuItem("/about"),
          })}
        >
          {menuItemsLangMap.about[lang]}
        </Link>
        <a onClick={handleOpenContactModal}>
          <div className={styles.navbarMenuItemContact}>
            {menuItemsLangMap.contact[lang]}
          </div>
        </a>
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
        {noShowLangChange ? null : (
          <Switch
            checkedChildren="英文"
            unCheckedChildren="中文"
            defaultChecked={lang === "en"}
            onChange={(checked) => {
              if (checked) {
                setLang("en");
              } else {
                setLang("zh");
              }
            }}
          />
        )}
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
          <Switch
            checkedChildren="英文"
            unCheckedChildren="中文"
            defaultChecked={lang === "en"}
            onChange={(checked) => {
              if (checked) {
                setLang("en");
              } else {
                setLang("zh");
              }
            }}
          />
        </Drawer>
      </div>
      <ContactModal
        open={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </nav>
  );
};

export default Navbar;
