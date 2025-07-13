import { NextRequest, NextResponse } from "next/server";

export async function cors(
  req: NextRequest
): Promise<NextResponse> {
  // 创建新的响应对象
  const response = NextResponse.next();
  
  // 设置CORS头
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // 处理预检请求
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return response;
} 