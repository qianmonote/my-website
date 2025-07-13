import axios from 'axios';
import qs from 'qs';
import { ApiResponse } from '../types';

// 创建axios实例
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
      msg: '请求配置错误',
      error
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
        msg: error.response.data?.msg || '请求失败，请重试',
        error: error.response.data
      });
    }
    return Promise.reject({
      flag: 0,
      msg: '网络错误，请检查网络连接'
    });
  }
);

export default ajax;
