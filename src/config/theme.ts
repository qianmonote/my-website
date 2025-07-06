const theme = {
  token: {
    // 全局 token 配置
    colorPrimary: '#1677ff',
    colorBorder: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 20,
  },
  components: {
    Carousel: {
      dotActiveWidth: 8,
      dotWidth: 8,
      dotHeight: 8,
      dotGap: 8,
      colorText: '#1677ff',
    },
    Select: {
      colorBgContainer: 'rgba(255, 255, 255, 0.16)',
      colorText: '#fff',
      colorBorder: 'rgba(255, 255, 255, 0.3)',
      colorPrimary: '#fff',
      colorPrimaryHover: 'rgba(255, 255, 255, 0.5)',
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorTextPlaceholder: '#fff',
      optionSelectedBg: 'rgba(255, 255, 255, 0.16)',
      optionActiveBg: 'rgba(255, 255, 255, 0.16)',
      selectorBg: 'rgba(255, 255, 255, 0.16)',
    },
    Dropdown: {
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBorder: 'rgba(255, 255, 255, 0.16)',
      colorPrimary: '#fff',
      colorPrimaryHover: 'rgba(255, 255, 255, 0.16)',
    },
    Menu: {
      colorBgContainer: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorItemBg: 'transparent',
      colorItemBgHover: 'rgba(255, 255, 255, 0.16)',
      colorItemBgSelected: 'rgba(255, 255, 255, 0.16)',
      colorItemText: '#fff',
      colorItemTextHover: '#fff',
      colorItemTextSelected: '#fff',
    },
    Drawer: {
      colorBgElevated: 'rgba(20, 22, 25, 1)',
      colorText: '#fff',
      colorBgContainer: 'rgba(20, 22, 25, 1)',
    },
  },
};

export default theme;
