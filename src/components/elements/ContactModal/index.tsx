"use client";

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import styles from "./styles.module.css";
import ajax from "@/common/axios";
import {
  ApiResponse,
  ContactFormData,
  ContactFormResponse,
} from "@/common/types";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const layout = {
  labelCol: { style: { width: "100px", textAlign: "left" as const } },
  wrapperCol: { span: 18 },
};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    ajax
      .post<ApiResponse<ContactFormResponse>>("/api/contact/submit", values)
      .then((res) => {
        console.log(res, "handleSubmit");
        if (res.flag === 1) {
          debugger
          message.success("提交成功！");
          form.resetFields();
          onClose();
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
              name="company"
              label="公司名称"
              rules={[{ required: true, message: "请输入公司名称" }]}
            >
              <Input placeholder="请输入公司名称" />
            </Form.Item>
            <Form.Item
              name="name"
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
                { pattern: /^[0-9]\d{4,14}$/, message: "请输入正确的手机号" },
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
              name="content"
              label="咨询业务"
              rules={[{ required: true, message: "请输入咨询业务" }]}
            >
              <Input.TextArea
                placeholder="请输入咨询业务"
                autoSize={{ minRows: 2, maxRows: 3 }}
              />
            </Form.Item>
            <div className={styles.submitSection}>
              <Button
                type="primary"
                loading={loading}
                className={styles.submitButton}
                onClick={() => form.submit()}
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
