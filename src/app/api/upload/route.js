import axios from 'axios';
import http from 'http';

export async function POST(req) {
  let data;

  try {
    data = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      httpAgent: new http.Agent({
        rejectUnauthorized: false,
      }),
    });

    const response = await axiosInstance.post('/upload', data);
    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      ...(error.response ? { data: error.response.data } : {}),
    }), {
      status: error.response ? error.response.status : 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
