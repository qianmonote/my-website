"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import styles from "./styles.module.css";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

interface ContactFormValues {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  service: string;
}

const layout = {
  labelCol: { flex: '100px', textAlign: 'left' },
  wrapperCol: { span: 18 },
};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactFormValues) => {
    try {
      setLoading(true);
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("提交失败");
      }

      message.success("提交成功！");
      form.resetFields();
      onClose();
    } catch (err: unknown) {
      message.error("提交失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={855}
      className={styles.contactModal}
    >
      <div className={styles.modalContent}>
        <div className={styles.leftSection} />
        <div className={styles.rightSection}>
          <div className={styles.title}>ONETOUCH AGRI ROBOTECH SDN.BHD</div>
          <Form
            form={form}
            onFinish={handleSubmit}
            className={styles.form}
            {...layout}
          >
            <Form.Item
              name="companyName"
              label="公司名称"
              rules={[{ required: true, message: "请输入公司名称" }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>
            <Form.Item
              name="contactName"
              label="联系人姓名"
              rules={[{ required: true, message: "请输入联系人姓名" }]}
            >
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: "请输入手机号" },
                { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="email"
              label="电子邮件"
              rules={[
                { required: true, message: "请输入电子邮件" },
                { type: "email", message: "请输入正确的邮箱格式" },
              ]}
            >
              <Input placeholder="请输入电子邮件" />
            </Form.Item>
            <Form.Item
              name="service"
              label="咨询业务"
              rules={[{ required: true, message: "请输入咨询业务" }]}
            >
              <Input.TextArea placeholder="请输入咨询业务" rows={4} />
            </Form.Item>
            <div className={styles.submitSection}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.submitButton}
              >
                提交
              </Button>
              <div className={styles.agreement}>
                提交预约即代表阅读并同意
                <a href="/user-agreement" target="_blank">
                  《用户服务协议》
                </a>
                及
                <a href="/privacy-policy" target="_blank">
                  《个人信息保护政策》
                </a>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
