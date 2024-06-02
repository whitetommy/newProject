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
});

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('file_id');

  if (!fileId) {
    return NextResponse.json({ error: 'Missing file_id parameter' }, { status: 400 });
  }

  try {
    const response = await axiosInstance.get(`/patch/?file_id=${fileId}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
