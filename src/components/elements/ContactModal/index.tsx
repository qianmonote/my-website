"use client";

import React, { useState, useEffect } from "react";
import { Modal, Drawer, Form, Input, Button, App } from "antd";
import styles from "./styles.module.css";
import ajax from "@/common/axios";
import {
  ApiResponse,
  ContactFormData,
  ContactFormResponse,
} from "@/common/types";
import { useI18n } from "@/context/I18nContext";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { message } = App.useApp();
  const { lang } = useI18n();
  const layout = {
    labelCol: {
      style: { width: lang === "zh" ? "100px" : "150px", textAlign: "left" as const },
    },
    wrapperCol: { span: lang === "zh" ? 18 : 20 },
  };

  // 国际化文本
  const texts = {
    zh: {
      title: "联系我们",
      company: "公司名称",
      companyPlaceholder: "请输入公司名称",
      companyRequired: "请输入公司名称",
      name: "联系人姓名",
      namePlaceholder: "请输入联系人姓名",
      nameRequired: "请输入联系人姓名",
      phone: "手机号",
      phonePlaceholder: "请输入手机号",
      phoneRequired: "请输入手机号",
      phonePattern: "请输入正确的手机号",
      email: "电子邮件",
      emailPlaceholder: "请输入电子邮件",
      emailRequired: "请输入电子邮件",
      emailPattern: "请输入正确的邮箱格式",
      content: "咨询业务",
      contentPlaceholder: "请输入咨询业务",
      contentRequired: "请输入咨询业务",
      submit: "提交",
      submitSuccess: "提交成功！",
      submitError: "提交失败，请重试",
      agreement: "提交预约即代表阅读并同意",
      userAgreement: "《用户服务协议》",
      privacyPolicy: "《个人信息保护政策》",
      and: "及",
    },
    en: {
      title: "Contact Us",
      company: "corporate name",
      companyPlaceholder: "Please enter the name of your company",
      companyRequired: "Please enter the name of your company",
      name: "Contact Name",
      namePlaceholder: "Please enter the name of the contact person",
      nameRequired: "Please enter the name of the contact person",
      phone: "cell-phone number",
      phonePlaceholder: "Please enter the contact phone number",
      phoneRequired: "Please enter the contact phone number",
      phonePattern: "Please enter a valid phone number",
      email: "E-mail",
      emailPlaceholder: "Please enter email",
      emailRequired: "Please enter your email address",
      emailPattern: "Please enter a valid email format",
      content: "consultancy",
      contentPlaceholder: "Please fill in the business direction you would like to inquire about",
      contentRequired: "Please fill in the business direction you would like to inquire about",
      submit: "Submit",
      submitSuccess: "Submitted successfully!",
      submitError: "Submission failed, please try again",
      agreement: "By submitting, you agree to our",
      userAgreement: "User Service Agreement",
      privacyPolicy: "Privacy Policy",
      and: "and",
    },
  };

  const t = texts[lang];

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 730);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleSubmit = async (values: ContactFormData) => {
    setLoading(true);
    ajax
      .post<ApiResponse<ContactFormResponse>>("/api/contact/submit", values)
      .then((res) => {
        if (res.flag === 1) {
          message.success(t.submitSuccess);
          form.resetFields();
          onClose();
        } else {
          message.error(res.error?.message || t.submitError);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 渲染表单内容
  const renderFormContent = () => (
    <div className={styles.modalContent}>
      <div className={styles.leftSection} />
      <div className={(lang === "en" ? styles["rightSection-en"] : styles.rightSection)}>
        <div className={styles.title}>ONETOUCH AGRI ROBOTECH SDN.BHD</div>
        <Form
          form={form}
          onFinish={handleSubmit}
          className={styles.form}
          {...layout}
        >
          <Form.Item
            name="company"
            label={t.company}
          >
            <Input placeholder={t.companyPlaceholder} style={{ width: "317px" }} />
          </Form.Item>
          <Form.Item
            name="name"
            label={t.name}
          >
            <Input placeholder={t.namePlaceholder} style={{ width: "317px" }} />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t.phone}
            rules={[
              {
                pattern:
                  lang === "zh"
                    ? /^[0-9]\d{4,14}$/
                    : /^[+]?[0-9\s\-\(\)]{7,15}$/,
                message: t.phonePattern,
              },
            ]}
          >
            <Input placeholder={t.phonePlaceholder} style={{ width: "317px" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label={t.email}
            rules={[
              { type: "email", message: t.emailPattern },
            ]}
          >
            <Input placeholder={t.emailPlaceholder} style={{ width: "317px" }} />
          </Form.Item>
          <Form.Item
            name="content"
            label={t.content}
          >
            <Input.TextArea
              placeholder={t.contentPlaceholder}
              autoSize={{ minRows: 3, maxRows: 3 }}
            />
          </Form.Item>
          <div className={styles.submitSection}>
            <Button
              type="primary"
              loading={loading}
              className={styles.submitButton}
              onClick={() => form.submit()}
            >
              {t.submit}
            </Button>
            {/* <div className={styles.agreement}>
              {t.agreement}
              <a href="/user-agreement" target="_blank">
                {t.userAgreement}
              </a>
              {t.and}
              <a href="/privacy-policy" target="_blank">
                {t.privacyPolicy}
              </a>
            </div> */}
          </div>
        </Form>
      </div>
    </div>
  );

  // 移动端底部侧滑
  if (isMobile) {
    return (
      <Drawer
        title={t.title}
        placement="bottom"
        onClose={onClose}
        open={open}
        height="85vh"
        className={styles.mobileDrawer}
        styles={{
          body: {
            padding: "0",
            background: "#fff",
          },
          header: {
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            color: "#333",
          },
          mask: {
            background: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        {renderFormContent()}
      </Drawer>
    );
  }

  // 桌面端弹窗
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={855}
      className={styles.contactModal}
    >
      {renderFormContent()}
    </Modal>
  );
};

export default ContactModal;
