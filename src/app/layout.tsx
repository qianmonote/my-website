import type { Metadata, Viewport } from "next";
import "./globals.css";
import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import { I18nProvider } from "@/context/I18nContext";
import AntdLocaleProvider from "@/components/AntdLocaleProvider";
import PageLoadManager from "@/components/PageLoadManager";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "ONETOUCH AGRI ROBOTECH",
  description: "",
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
  maximumScale: 3,
  userScalable: true,
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
      <body className="antialiased">
        <PageLoadManager />
        <I18nProvider>
          <AntdRegistry>
            <AntdLocaleProvider>
              <App>
                {children}
                <SpeedInsights />
              </App>
            </AntdLocaleProvider>
          </AntdRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
