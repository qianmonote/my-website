'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table, 
  Card, 
  Input, 
  Button, 
  Space, 
  DatePicker, 
  Tag,
  Tooltip,
  Modal,
  App
} from 'antd';
import { SearchOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { RangePickerProps } from 'antd/es/date-picker';
import styles from './styles.module.css';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface ContactFormData {
  id: number;
  name: string;
  phone: string;
  email: string;
  company?: string;
  content: string;
  created_at: string;
}

interface ContactListResponse {
  flag: 0 | 1;
  msg?: string;
  data?: {
    list: ContactFormData[];
    pagination: {
      current: number;
      pageSize: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export default function AdminContactPage() {
  const router = useRouter();
  const { message: antMessage } = App.useApp();
  const [data, setData] = useState<ContactFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchForm, setSearchForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    startDate: '',
    endDate: ''
  });
  const [detailModal, setDetailModal] = useState({
    visible: false,
    data: null as ContactFormData | null
  });

  // 检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          router.replace('/admin/login');
        }
      } catch (error) {
        console.error('验证登录状态失败:', error);
        router.replace('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  // 获取数据
  const fetchData = useCallback(async (params?: { current?: number; pageSize?: number }) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: (params?.current || pagination.current).toString(),
        pageSize: (params?.pageSize || pagination.pageSize).toString(),
        ...searchForm
      });

      const response = await fetch(`/api/contact/list?${queryParams}`, {
        credentials: 'include',
      });
      const result: ContactListResponse = await response.json();

      if (result.flag === 1 && result.data) {
        setData(result.data.list);
        setPagination({
          current: result.data.pagination.current,
          pageSize: result.data.pagination.pageSize,
          total: result.data.pagination.total,
        });
      } else {
        antMessage.error(result.msg || '获取数据失败');
      }
    } catch (error) {
      console.error('获取数据错误:', error);
      antMessage.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [searchForm, antMessage]);

  // 搜索处理
  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 });
    fetchData({ current: 1 });
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({
      name: '',
      phone: '',
      email: '',
      company: '',
      startDate: '',
      endDate: ''
    });
    setPagination({ ...pagination, current: 1 });
    fetchData({ current: 1 });
  };

  // 日期选择处理
  const handleDateRangeChange = (_: RangePickerProps['value'], dateStrings: [string, string]) => {
    setSearchForm({
      ...searchForm,
      startDate: dateStrings[0],
      endDate: dateStrings[1]
    });
  };

  // 查看详情
  const handleViewDetail = (record: ContactFormData) => {
    setDetailModal({
      visible: true,
      data: record
    });
  };

  // 表格列定义
  const columns: ColumnsType<ContactFormData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
      width: 180,
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: '咨询内容',
      dataIndex: 'content',
      key: 'content',
      width: 250,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '提交时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleString('zh-CN');
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  // 表格变化处理
  const handleTableChange = (paginationConfig: TablePaginationConfig) => {
    fetchData({
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    });
  };

  // 初始化数据
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <Card title="联系我们 - 数据管理" className={styles.card}>
        {/* 搜索区域 */}
        <Card size="small" className={styles.searchCard}>
          <div className={styles.searchForm}>
            <div className={styles.searchRow}>
              <Input
                placeholder="姓名"
                value={searchForm.name}
                onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
                className={styles.searchInput}
              />
              <Input
                placeholder="手机号"
                value={searchForm.phone}
                onChange={(e) => setSearchForm({ ...searchForm, phone: e.target.value })}
                className={styles.searchInput}
              />
              <Input
                placeholder="邮箱"
                value={searchForm.email}
                onChange={(e) => setSearchForm({ ...searchForm, email: e.target.value })}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.searchRow}>
              <Input
                placeholder="公司名称"
                value={searchForm.company}
                onChange={(e) => setSearchForm({ ...searchForm, company: e.target.value })}
                className={styles.searchInput}
              />
              <RangePicker
                onChange={handleDateRangeChange}
                placeholder={['开始日期', '结束日期']}
                className={styles.searchInput}
              />
              <Space>
                <Button 
                  type="primary" 
                  icon={<SearchOutlined />} 
                  onClick={handleSearch}
                >
                  搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={() => fetchData()}
                >
                  刷新
                </Button>
              </Space>
            </div>
          </div>
        </Card>

        {/* 数据统计 */}
        <div className={styles.statistics}>
          <Tag color="blue">总数据：{pagination.total} 条</Tag>
        </div>

        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `显示 ${range[0]}-${range[1]} 条，共 ${total} 条数据`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
          className={styles.table}
        />
      </Card>

      {/* 详情模态框 */}
      <Modal
        title="联系信息详情"
        open={detailModal.visible}
        onCancel={() => setDetailModal({ visible: false, data: null })}
        footer={[
          <Button key="close" onClick={() => setDetailModal({ visible: false, data: null })}>
            关闭
          </Button>
        ]}
        width={600}
        className={styles.modalWrapper}
      >
        {detailModal.data && (
          <div className={styles.detailContent}>
            <div className={styles.detailItem}>
              <label>姓名：</label>
              <span>{detailModal.data.name}</span>
            </div>
            <div className={styles.detailItem}>
              <label>手机号：</label>
              <span>{detailModal.data.phone}</span>
            </div>
            <div className={styles.detailItem}>
              <label>邮箱：</label>
              <span>{detailModal.data.email}</span>
            </div>
            <div className={styles.detailItem}>
              <label>公司名称：</label>
              <span>{detailModal.data.company || '-'}</span>
            </div>
            <div className={styles.detailItem}>
              <label>提交时间：</label>
              <span>{new Date(detailModal.data.created_at).toLocaleString('zh-CN')}</span>
            </div>
            <div className={styles.detailItem}>
              <label>咨询内容：</label>
              <TextArea
                value={detailModal.data.content}
                readOnly
                rows={6}
                className={styles.contentTextarea}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 