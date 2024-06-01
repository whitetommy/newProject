import { NextResponse } from 'next/server';
import https from 'https';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [(data, headers) => {
    headers['X-Requested-With'] = 'XMLHttpRequest';
    return JSON.stringify(data);
  }]
});

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axiosInstance.post('/upload', body);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
