'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, BuildOutlined } from '@ant-design/icons';
import { ContactFormData } from '@/lib/database';
import styles from './styles.module.css';

const { TextArea } = Input;

interface ContactFormProps {
  title?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ title = "联系我们", onSuccess }: ContactFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 提交表单
  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        message.success(result.message || '提交成功，我们会尽快与您联系！');
        form.resetFields();
        onSuccess?.();
      } else {
        message.error(result.message || '提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('提交表单错误:', error);
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card 
        title={title} 
        className={styles.formCard}
        headStyle={{ 
          background: 'linear-gradient(135deg, #1677ff, #4096ff)',
          color: 'white',
          borderRadius: '8px 8px 0 0'
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
          size="large"
        >
          {/* 姓名 */}
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: '请输入您的姓名' },
              { min: 2, message: '姓名至少需要2个字符' },
              { max: 20, message: '姓名不能超过20个字符' }
            ]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder="请输入您的姓名"
              className={styles.input}
            />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入您的手机号' },
              { 
                pattern: /^1[3-9]\d{9}$/, 
                message: '请输入正确的手机号格式' 
              }
            ]}
          >
            <Input
              prefix={<PhoneOutlined className={styles.inputIcon} />}
              placeholder="请输入您的手机号"
              maxLength={11}
              className={styles.input}
            />
          </Form.Item>

          {/* 电子邮件 */}
          <Form.Item
            label="电子邮件"
            name="email"
            rules={[
              { required: true, message: '请输入您的邮箱地址' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]}
          >
            <Input
              prefix={<MailOutlined className={styles.inputIcon} />}
              placeholder="请输入您的邮箱地址"
              className={styles.input}
            />
          </Form.Item>

          {/* 公司名称 */}
          <Form.Item
            label="公司名称"
            name="company"
            rules={[
              { max: 100, message: '公司名称不能超过100个字符' }
            ]}
          >
            <Input
              prefix={<BuildOutlined className={styles.inputIcon} />}
              placeholder="请输入您的公司名称（选填）"
              className={styles.input}
            />
          </Form.Item>

          {/* 咨询业务内容 */}
          <Form.Item
            label="咨询业务内容"
            name="content"
            rules={[
              { required: true, message: '请输入您的咨询内容' },
              { min: 10, message: '咨询内容至少需要10个字符' },
              { max: 1000, message: '咨询内容不能超过1000个字符' }
            ]}
          >
            <TextArea
              placeholder="请详细描述您的咨询需求，我们会为您提供专业的解决方案"
              rows={6}
              showCount
              maxLength={1000}
              className={styles.textarea}
            />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item className={styles.submitWrapper}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.submitBtn}
              size="large"
              block
            >
              {loading ? '提交中...' : '提交'}
            </Button>
          </Form.Item>
        </Form>

        {/* 联系方式提示 */}
        <div className={styles.contactTip}>
          <p>📧 提交后我们会在24小时内回复您</p>
          <p>📞 如需紧急联系，请拨打客服热线：400-xxx-xxxx</p>
        </div>
      </Card>
    </div>
  );
} 