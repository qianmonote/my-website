import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

// 创建axios实例并覆盖默认的响应类型
const ajax = axios.create({
  withCredentials: true,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
});

// 克隆get方法
const cloneGet = ajax.get;
ajax.get = (url, data) => cloneGet(url, { params: data });

// 请求拦截器
ajax.interceptors.request.use(
  function (config) {
    // 处理FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      return config;
    }

    // 处理application/x-www-form-urlencoded
    if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data, { allowDots: true });
    }

    return config;
  },
  function (error) {
    return Promise.reject({
      flag: 0,
      error: {
        message: '请求配置错误',
        details: error
      }
    });
  }
);

// 响应拦截器
ajax.interceptors.response.use(
  function (response) {
    const data = response.data;
    
    // 如果后端返回的数据不包含flag字段，添加默认值
    if (typeof data.flag === 'undefined') {
      return {
        flag: 1,
        data: data
      };
    }
    
    return data;
  },
  function (error) {
    if (error.response) {
      return Promise.reject({
        flag: 0,
        error: {
          message: error.response.data?.msg || '请求失败，请重试',
          details: error.response.data
        }
      });
    }
    return Promise.reject({
      flag: 0,
      error: {
        message: '网络错误，请检查网络连接'
      }
    });
  }
);

// 定义基础响应类型
interface BaseResponse {
  flag: 0 | 1;
  error?: {
    message?: string;
    details?: unknown;
  };
  data?: unknown;
}

// 重写 axios 实例的类型
type CustomInstance = {
  <T extends BaseResponse>(config: AxiosRequestConfig): Promise<T>;
  get: <T extends BaseResponse>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T extends BaseResponse>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  head: <T extends BaseResponse>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  options: <T extends BaseResponse>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T extends BaseResponse>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
  put: <T extends BaseResponse>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T extends BaseResponse>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
};

// 导出带有自定义类型的实例
export default ajax as CustomInstance;
