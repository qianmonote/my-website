import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ContactQueryParams } from '@/lib/database';

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

    const db = await getDatabase();
    
    // 构建WHERE条件
    const conditions: string[] = [];
    const values: (string | number)[] = [];
    
    if (params.name) {
      conditions.push('name LIKE ?');
      values.push(`%${params.name}%`);
    }
    
    if (params.phone) {
      conditions.push('phone LIKE ?');
      values.push(`%${params.phone}%`);
    }
    
    if (params.email) {
      conditions.push('email LIKE ?');
      values.push(`%${params.email}%`);
    }
    
    if (params.company) {
      conditions.push('company LIKE ?');
      values.push(`%${params.company}%`);
    }
    
    if (params.startDate) {
      conditions.push('DATE(created_at) >= ?');
      values.push(params.startDate);
    }
    
    if (params.endDate) {
      conditions.push('DATE(created_at) <= ?');
      values.push(params.endDate);
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    
    // 查询总数
    const countQuery = `SELECT COUNT(*) as total FROM contacts ${whereClause}`;
    const countResult = await db.get(countQuery, values);
    const total = countResult?.total || 0;
    
    // 分页查询数据
    const offset = (params.page! - 1) * params.pageSize!;
    const dataQuery = `
      SELECT 
        id, name, phone, email, company, content, 
        datetime(created_at, 'localtime') as created_at,
        datetime(updated_at, 'localtime') as updated_at
      FROM contacts 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const dataValues = [...values, params.pageSize, offset];
    const contacts = await db.all(dataQuery, dataValues);
    
    // 计算分页信息
    const totalPages = Math.ceil(total / params.pageSize!);
    
    return NextResponse.json({
      flag: 1,
      data: {
        list: contacts,
        pagination: {
          current: params.page,
          pageSize: params.pageSize,
          total,
          totalPages,
          hasNext: params.page! < totalPages,
          hasPrev: params.page! > 1
        }
      }
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