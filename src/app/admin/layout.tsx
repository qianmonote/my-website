'use client';

import React, { useState, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Layout, Menu, Button, Avatar, Dropdown, Spin, App } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import {
  UserOutlined,
  LogoutOutlined,
  ContactsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { useAdminI18n } from '@/hooks/useAdminI18n';
import { AdminI18nProvider } from '@/components/AdminI18nProvider';
import type { MenuProps } from 'antd';
import './layout.module.css';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { message } = App.useApp();
  const { lang, setLang, t } = useAdminI18n();
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // 只在非登录页面时使用 useAutoLogout
  const { logout } = useAutoLogout(pathname === '/admin/login' ? {} : { messageApi: message });

  // 确保组件已挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  // 检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (data.flag === 1 && data.user) {
          setUserInfo({ username: data.user.username });
        } else {
          router.replace('/admin/login');
          return;
        }
      } catch (error) {
        console.error('验证登录状态失败:', error);
        router.replace('/admin/login');
        return;
      } finally {
        setLoading(false);
      }
    };

    // 如果是登录页面，不需要检查认证
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // 只有在组件挂载后才执行认证检查
    if (mounted) {
      checkAuth();
    }
  }, [router, pathname, mounted]);

  // 如果是登录页面，直接渲染子组件，不使用布局
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 菜单项配置
  const menuItems: MenuProps['items'] = [
    {
      key: '/admin/contact',
      icon: <ContactsOutlined />,
      label: t('admin.contact.title'),
      onClick: () => router.push('/admin/contact'),
    },
  ];

  // 语言切换菜单
  const languageMenuItems: MenuProps['items'] = [
    {
      key: 'zh',
      label: '中文',
      onClick: () => setLang('zh'),
    },
    {
      key: 'en',
      label: 'English',
      onClick: () => setLang('en'),
    },
  ];

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('admin.logout'),
      onClick: logout,
    },
  ];

  // 获取当前选中的菜单项
  const selectedKeys = [pathname];

  // 防止hydration错误，只在客户端渲染loading状态
  if (!mounted || loading) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
        suppressHydrationWarning={true}
      >
        {mounted && <Spin size="large" />}
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧菜单 */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          background: '#001529',
        }}
      >
        <div style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          borderBottom: '1px solid #303030',
        }}>
          {collapsed ? t('admin.titleCollapsed') : t('admin.title')}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>

      {/* 右侧内容区域 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* 语言切换 */}
            <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
              <Button type="text" icon={<GlobalOutlined />} style={{ height: '40px' }}>
                {lang === 'zh' ? '中文' : 'EN'}
              </Button>
            </Dropdown>
            
            {/* 用户菜单 */}
            {userInfo && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button type="text" style={{ height: '64px', padding: '0 16px' }}>
                  <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: 8 }} />
                  <span>{userInfo.username}</span>
                </Button>
              </Dropdown>
            )}
          </div>
        </Header>

        {/* 主要内容区域 */}
        <Content style={{
          margin: '16px',
          padding: '16px',
          background: '#fff',
          borderRadius: '6px',
          height: 'calc(100vh - 64px - 32px)',
          overflowY: 'auto',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminI18nProvider>
      <App>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </App>
    </AdminI18nProvider>
  );
}