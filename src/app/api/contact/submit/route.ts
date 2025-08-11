import { NextRequest, NextResponse } from "next/server";
import { DatabaseAdapter, initializeDatabase } from "@/lib/database";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  content: string;
}

// 处理OPTIONS预检请求
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// 提交联系表单数据
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch (error) {
      console.error("解析请求体失败:", error);
      return NextResponse.json(
        {
          flag: 0,
          msg: "无效的请求数据格式",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // 验证必填字段
    const { name, phone, email, company, content } = body;

    // 验证手机号格式（国际手机号，支持多国格式）
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{6,20}$/;
    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          flag: 0,
          msg: "手机号格式不正确",
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return NextResponse.json(
        {
          flag: 0,
          msg: "邮箱格式不正确",
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 初始化数据库（对于 Vercel Neon 很重要）
    try {
      console.log('开始初始化数据库...');
      await initializeDatabase();
      console.log('数据库初始化成功');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("数据库初始化失败:", {
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
        env: {
          POSTGRES_URL: !!process.env.POSTGRES_URL,
          DATABASE_URL: !!process.env.DATABASE_URL,
          VERCEL_ENV: process.env.VERCEL_ENV,
          NODE_ENV: process.env.NODE_ENV
        },
        timestamp: new Date().toISOString()
      });
      return NextResponse.json(
        {
          flag: 0,
          msg: "数据库连接失败，请稍后重试",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    
    // 进行数据插入操作
    try {
      console.log('开始插入联系数据...');
      const result = await DatabaseAdapter.insertContact({
        name: name || "",
        phone: phone || "",
        email: email || "",
        company: company || "",
        content: content || "",
      });

      if (!result || !result.id) {
        throw new Error('插入数据返回结果无效');
      }

      console.log('联系数据插入成功:', { id: result.id });
      return NextResponse.json(
        {
          flag: 1,
          data: {
            id: result.id,
          },
          msg: "提交成功，我们会尽快与您联系",
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      console.error("数据插入失败:", error);
      return NextResponse.json(
        {
          flag: 0,
          msg: "保存数据失败，请稍后重试",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  } catch (error) {
    console.error("联系表单提交错误:", error);
    return NextResponse.json(
      {
        flag: 0,
        msg: "服务器错误，请稍后重试",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
