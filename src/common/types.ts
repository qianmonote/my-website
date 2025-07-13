// API响应类型
export interface ApiResponse<T = unknown> {
  flag: 0 | 1;
  msg?: string;
  data?: T;
  [key: string]: any; // 支持其他错误信息
}

// 联系表单数据类型
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  content: string;
}

// 联系表单响应数据类型
export interface ContactFormResponse {
  id: number;
} 