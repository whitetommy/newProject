// app/api/upload/route.js
import { NextResponse } from 'next/server';
import https from 'https';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });

    const uploadFormData = new FormData();
    uploadFormData.append('file', blob, file.name);

    const response = await axiosInstance.post('/upload', uploadFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
