import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ContactFormData } from '@/lib/database';

// 提交联系表单数据
export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // 验证必填字段
    const { name, phone, email, company, content } = body;
    
    if (!name || !phone || !email || !content) {
      return NextResponse.json(
        { 
          success: false, 
          message: '姓名、手机号、邮箱和咨询内容为必填项' 
        },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: '邮箱格式不正确' 
        },
        { status: 400 }
      );
    }

    // 验证手机号格式（中国手机号）
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { 
          success: false, 
          message: '手机号格式不正确' 
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // 插入数据
    const result = await db.run(
      `INSERT INTO contacts (name, phone, email, company, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, phone, email, company || '', content]
    );

    return NextResponse.json({
      success: true,
      message: '提交成功，我们会尽快与您联系',
      data: {
        id: result.lastID
      }
    });

  } catch (error) {
    console.error('联系表单提交错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '服务器错误，请稍后重试' 
      },
      { status: 500 }
    );
  }
} 