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
          }
        }
      );
    }

    // 验证必填字段
    const { name, phone, email, company, content } = body;

    // if (!name || !phone || !email || !content) {
    //   return NextResponse.json(
    //     {
    //       flag: 0,
    //       msg: "姓名、手机号、邮箱和咨询内容为必填项",
    //     },
    //     { 
    //       status: 400,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //       }
    //     }
    //   );
    // }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          flag: 0,
          msg: "邮箱格式不正确",
        },
        { 
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
    }

    // 验证手机号格式（中国手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          flag: 0,
          msg: "手机号格式不正确",
        },
        { 
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
    }

    // 初始化数据库
    try {
      await initializeDatabase();
    } catch (error) {
      console.error("数据库初始化失败:", error);
      return NextResponse.json(
        {
          flag: 0,
          msg: "数据库连接失败，请稍后重试",
        },
        { 
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
    }

    // 插入数据
    try {
      const result = await DatabaseAdapter.insertContact({
        name,
        phone,
        email,
        company: company || "",
        content
      });

      return NextResponse.json({
        flag: 1,
        data: {
          id: result.id,
        },
        msg: "提交成功，我们会尽快与您联系"
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      });
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
          }
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
        }
      }
    );
  }
}
