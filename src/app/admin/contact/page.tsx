"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Card,
  Input,
  Button,
  Space,
  DatePicker,
  Tooltip,
  Modal,
  App,
  Breadcrumb,
} from "antd";
import dayjs from "dayjs";
import {
  SearchOutlined,
  EyeOutlined,
  ReloadOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { RangePickerProps } from "antd/es/date-picker";
import { useAdminI18n } from "@/hooks/useAdminI18n";
import styles from "./styles.module.css";

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
  const { message: antMessage } = App.useApp();
  const { t } = useAdminI18n();
  const [data, setData] = useState<ContactFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  // 获取默认日期范围（最近一个月）
  const getDefaultDateRange = () => {
    const endDate = dayjs();
    const startDate = dayjs().subtract(1, 'month');
    return {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    };
  };

  const [searchForm, setSearchForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    ...getDefaultDateRange(),
  });
  const [detailModal, setDetailModal] = useState({
    visible: false,
    data: null as ContactFormData | null,
  });

  // 获取数据
  const fetchData = useCallback(
    async (params?: { current?: number; pageSize?: number }) => {
      setLoading(true);
      try {
        const requestBody = {
          page: (params?.current || pagination.current).toString(),
          pageSize: (params?.pageSize || pagination.pageSize).toString(),
          ...searchForm,
        };

        const response = await fetch(`/api/contact/list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
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
          antMessage.error(result.msg || t('admin.contact.messages.fetchError'));
        }
        setLoading(false);
      } catch (error) {
        console.error("获取数据错误:", error);
        antMessage.error(t('admin.contact.messages.networkError'));
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchForm, antMessage, pagination.current]
  );

  // 搜索处理
  const handleSearch = () => {
    setPagination({ ...pagination, current: 1 });
    fetchData({ current: 1 });
  };

  // 重置搜索
  const handleReset = () => {
    setSearchForm({
      name: "",
      phone: "",
      email: "",
      company: "",
      ...getDefaultDateRange(),
    });
    setPagination({ ...pagination, current: 1 });
    fetchData({ current: 1 });
  };

  // 日期选择处理
  const handleDateRangeChange = (
    _: RangePickerProps["value"],
    dateStrings: [string, string]
  ) => {
    setSearchForm({
      ...searchForm,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
  };

  // 查看详情
  const handleViewDetail = (record: ContactFormData) => {
    setDetailModal({
      visible: true,
      data: record,
    });
  };

  // 表格列定义
  const columns: ColumnsType<ContactFormData> = [
    {
      title: t('admin.contact.table.id'),
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: t('admin.contact.table.name'),
      dataIndex: "name",
      key: "name",
      width: 120,
      ellipsis: true,
    },
    {
      title: t('admin.contact.table.phone'),
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: t('admin.contact.table.email'),
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: t('admin.contact.table.company'),
      dataIndex: "company",
      key: "company",
      width: 180,
      ellipsis: true,
      render: (text) => text || "-",
    },
    {
      title: t('admin.contact.table.content'),
      dataIndex: "content",
      key: "content",
      width: 250,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: t('admin.contact.table.createdAt'),
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: t('admin.contact.table.action'),
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            {t('admin.contact.table.view')}
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
      {/* 面包屑导航 */}
      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          {
            href: "/admin",
            title: (
              <>
                <HomeOutlined />
                <span>{t('admin.home')}</span>
              </>
            ),
          },
          {
            title: t('admin.contact.breadcrumb'),
          },
        ]}
      />

      <div className={styles.card}>
        {/* 搜索区域 */}
        <Card size="small" className={styles.searchCard}>
          <div className={styles.searchForm}>
            <div className={styles.searchRow}>
              <Input
                placeholder={t('admin.contact.search.name')}
                value={searchForm.name}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, name: e.target.value })
                }
                className={styles.searchInput}
              />
              <Input
                placeholder={t('admin.contact.search.phone')}
                value={searchForm.phone}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, phone: e.target.value })
                }
                className={styles.searchInput}
              />
              <Input
                placeholder={t('admin.contact.search.email')}
                value={searchForm.email}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, email: e.target.value })
                }
                className={styles.searchInput}
              />
            </div>
            <div className={styles.searchRow}>
              <Input
                placeholder={t('admin.contact.search.company')}
                value={searchForm.company}
                onChange={(e) =>
                  setSearchForm({ ...searchForm, company: e.target.value })
                }
                className={styles.searchInput}
              />
              <RangePicker
                onChange={handleDateRangeChange}
                placeholder={[t('admin.contact.search.startDate'), t('admin.contact.search.endDate')]}
                className={styles.searchInput}
                value={[
                  searchForm.startDate ? dayjs(searchForm.startDate) : null,
                  searchForm.endDate ? dayjs(searchForm.endDate) : null,
                ]}
              />
              <div className={styles.searchInput}></div>
            </div>
            <div className={styles.searchButtonRow}>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                >
                  {t('admin.contact.search.searchBtn')}
                </Button>
                <Button onClick={handleReset}>{t('admin.contact.search.resetBtn')}</Button>
                <Button icon={<ReloadOutlined />} onClick={() => fetchData()}>
                  {t('admin.contact.search.refreshBtn')}
                </Button>
              </Space>
            </div>
          </div>
        </Card>
        {/* 数据表格 */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          size="small"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              t('admin.contact.table.total', {
                start: range[0],
                end: range[1],
                total: total,
              }),
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
          className={styles.table}
        />
      </div>

      {/* 详情模态框 */}
      <Modal
        title={t('admin.contact.detail.title')}
        open={detailModal.visible}
        onCancel={() => setDetailModal({ visible: false, data: null })}
        footer={[
          <Button
            key="close"
            onClick={() => setDetailModal({ visible: false, data: null })}
          >
            {t('admin.contact.detail.close')}
          </Button>,
        ]}
        width={600}
        className={styles.modalWrapper}
      >
        {detailModal.data && (
          <div className={styles.detailContent}>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.name')}</label>
              <span>{detailModal.data.name}</span>
            </div>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.phone')}</label>
              <span>{detailModal.data.phone}</span>
            </div>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.email')}</label>
              <span>{detailModal.data.email}</span>
            </div>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.company')}</label>
              <span>{detailModal.data.company || "-"}</span>
            </div>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.createdAt')}</label>
              <span>
                {dayjs(detailModal.data.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
            <div className={styles.detailItem}>
              <label>{t('admin.contact.detail.content')}</label>
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
