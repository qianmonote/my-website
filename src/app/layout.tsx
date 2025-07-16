import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";
import zhCN from "antd/locale/zh_CN";
import { I18nProvider } from "@/context/I18nContext";
import themeConfig from "@/config/theme";
import PageLoadManager from "@/components/PageLoadManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONETOUCH AGRI ROBOTECH SDN. BHD.",
  description: "科技让农田更高效",
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
  applicationName: "ONETOUCH AGRI ROBOTECH",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "ONETOUCH AGRI ROBOTECH",
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': '#1677ff',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1677ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageLoadManager />
        <I18nProvider>
          <AntdRegistry>
            <ConfigProvider theme={themeConfig} locale={zhCN}>
              <App>
                {children}
              </App>
            </ConfigProvider>
          </AntdRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
