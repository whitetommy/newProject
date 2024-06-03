import { NextResponse } from 'next/server';
import http from 'http';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  httpAgent: new http.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const maxDuration = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('file_id');

  if (!fileId) {
    return NextResponse.json({ error: 'Missing file_id parameter' }, { status: 400 });
  }

  try {
    const response = await axiosInstance.get(`/analyze/?file_id=${fileId}`);

    if (!response.data || Object.keys(response.data).length === 0) {
      return NextResponse.json({ message: '취약점이 없습니다' }, { status: 200 });
    }
    
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
