import { NextRequest, NextResponse } from 'next/server';
import { DatabaseAdapter, ContactQueryParams, initializeDatabase } from '@/lib/database';

// 查询联系表单数据（分页、搜索）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 获取查询参数
    const params: ContactQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10'),
      name: searchParams.get('name') || '',
      phone: searchParams.get('phone') || '',
      email: searchParams.get('email') || '',
      company: searchParams.get('company') || '',
      startDate: searchParams.get('startDate') || '',
      endDate: searchParams.get('endDate') || ''
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