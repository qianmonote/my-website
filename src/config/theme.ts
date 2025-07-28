const theme = {
  token: {
    // 全局 token 配置
    colorPrimary: '#1677ff',
    colorBorder: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 8,
    fontFamily: "'PingFang SC', 'Arial', sans-serif",
  },
  components: {
    Carousel: {
      dotActiveWidth: 8,
      dotWidth: 8,
      dotHeight: 8,
      dotGap: 8,
      colorText: '#1677ff',
    },
    Dropdown: {
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBorder: 'rgba(255, 255, 255, 0.16)',
      colorPrimary: '#fff',
      colorPrimaryHover: 'rgba(189, 82, 82, 0.16)',
    },
    Menu: {
      colorBgContainer: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorItemBg: 'transparent',
      colorItemBgHover: 'rgba(255, 255, 255, 0.16)',
      colorItemBgSelected: 'rgba(255, 255, 255, 0.16)',
      itemColor: '#fff',
      itemHoverColor: '#fff',
      itemSelectedColor: '#fff',
      borderRadius: 20,
    },
    Drawer: {
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBgContainer: 'rgba(20, 22, 25, 1)',
    },
  },
};

export default theme;
