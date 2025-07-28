'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Dropdown, App } from 'antd';
import { useRouter } from 'next/navigation';
import { GlobalOutlined } from '@ant-design/icons';
import { AdminI18nProvider } from '@/components/AdminI18nProvider';
import { useAdminI18n } from '@/hooks/useAdminI18n';
import type { MenuProps } from 'antd';
import styles from './styles.module.css';

interface LoginFormData {
  username: string;
  password: string;
}

function LoginPageContent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { lang, setLang, t } = useAdminI18n();
  const { message } = App.useApp();

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

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.flag === 1) {
        // 根据是否有已存在会话显示不同的提醒
        if (data.hasExistingSession) {
          message.warning({
            content: t('admin.login.sessionWarning'),
            duration: 4,
          });
        } else {
          message.success(t('admin.login.loginSuccess'));
        }
        
        // 清除可能存在的旧的活动时间记录
        document.cookie = 'admin_last_activity=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        // 设置新的活动时间
        document.cookie = `admin_last_activity=${Date.now()}; path=/; max-age=${2 * 60 * 60}; SameSite=Lax`;
        router.push('/admin/contact');
      } else {
        message.error(data.msg || t('admin.login.loginFailed'));
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error(t('admin.login.loginFailedRetry'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* 语言切换按钮 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}>
        <Dropdown menu={{ items: languageMenuItems }} placement="bottomRight">
          <Button type="text" icon={<GlobalOutlined />} style={{ 
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
          }}>
            {lang === 'zh' ? '中文' : 'EN'}
          </Button>
        </Dropdown>
      </div>
      
      <div className={styles.loginBox}>
        <h1>{t('admin.login.title')}</h1>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            label={t('admin.login.username')}
            name="username"
            rules={[{ required: true, message: t('admin.login.usernameRequired') }]}
          >
            <Input placeholder={t('admin.login.usernamePlaceholder')} />
          </Form.Item>

          <Form.Item
            label={t('admin.login.password')}
            name="password"
            rules={[{ required: true, message: t('admin.login.passwordRequired') }]}
          >
            <Input.Password placeholder={t('admin.login.passwordPlaceholder')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {t('admin.login.loginBtn')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AdminI18nProvider>
      <App>
        <LoginPageContent />
      </App>
    </AdminI18nProvider>
  );
}