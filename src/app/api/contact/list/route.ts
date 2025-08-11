import { NextRequest, NextResponse } from 'next/server';
import { DatabaseAdapter, ContactQueryParams, initializeDatabase } from '@/lib/database';

// 查询联系表单数据（分页、搜索）
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('JSON 解析错误:', jsonError);
      return NextResponse.json(
        {
          flag: 0,
          msg: '请求格式错误',
        },
        { status: 400 }
      );
    }
    
    // 获取查询参数
    const params: ContactQueryParams = {
      page: parseInt(body.page || '1'),
      pageSize: parseInt(body.pageSize || '10'),
      name: body.name || '',
      phone: body.phone || '',
      email: body.email || '',
      company: body.company || '',
      startDate: body.startDate || '',
      endDate: body.endDate || ''
    };

    // 初始化数据库
    await initializeDatabase();
    
    // 使用统一的数据库适配器查询数据
    const result = await DatabaseAdapter.queryContacts(params);
    
    return NextResponse.json({
      flag: 1,
      data: result
    });

  } catch (error) {
    console.error('查询联系表单数据错误:', error);
    return NextResponse.json(
      { 
        flag: 0,
        msg: '服务器错误，请稍后重试'
      },
      { status: 500 }
    );
  }
}