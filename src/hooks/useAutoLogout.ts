import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { MessageInstance } from 'antd/es/message/interface';

interface UseAutoLogoutOptions {
  checkInterval?: number; // 检查间隔时间（毫秒）
  activityEvents?: string[]; // 监听的用户活动事件
  messageApi?: MessageInstance; // message实例
}

export function useAutoLogout(options: UseAutoLogoutOptions = {}) {
  const {
    checkInterval = 5 * 60 * 1000, // 默认5分钟检查一次
    activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'],
    messageApi
  } = options;
  
  const router = useRouter();
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // 更新最后活动时间
  const updateLastActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    // 更新cookie中的最后活动时间
    document.cookie = `admin_last_activity=${Date.now()}; path=/; max-age=${2 * 60 * 60}; SameSite=Lax`;
  }, []);

  // 检查登录状态
  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.flag !== 1) {
        // 登录状态失效，清理定时器并跳转到登录页
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current);
          checkIntervalRef.current = null;
        }
        
        // 显示提示信息
        if (data.msg && messageApi) {
          messageApi.warning(data.msg);
        }
        
        // 跳转到登录页
        router.replace('/admin/login');
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
      // 网络错误时也跳转到登录页
      router.replace('/admin/login');
    }
  }, [router]);

  // 手动退出登录
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (messageApi) {
        messageApi.success('已退出登录');
      }
      router.replace('/admin/login');
    } catch (error) {
      console.error('退出登录失败:', error);
      if (messageApi) {
        messageApi.error('退出登录失败');
      }
    }
  }, [router]);

  useEffect(() => {
    // 添加用户活动监听器
    const handleActivity = () => {
      updateLastActivity();
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // 设置定时检查
    checkIntervalRef.current = setInterval(checkAuthStatus, checkInterval);

    // 立即检查一次
    checkAuthStatus();

    return () => {
      // 清理事件监听器
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });

      // 清理定时器
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [activityEvents, checkInterval, checkAuthStatus, updateLastActivity]);

  return {
    logout,
    updateLastActivity,
  };
}