import axios from 'axios';
import http from 'http';
import FormData from 'form-data';

export async function POST(req) {
  try {
    const formData = new FormData();

    // Read the request body as a stream
    const body = await req.arrayBuffer();
    const buffer = Buffer.from(body);

    // Parse the form data from the buffer
    formData.append('file', buffer, 'upload.zip');
    formData.append('title', req.headers.get('title'));
    formData.append('visibility', req.headers.get('visibility'));

    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      httpAgent: new http.Agent({
        rejectUnauthorized: false,
      }),
    });

    const response = await axiosInstance.post('/upload', formData, {
      headers: formData.getHeaders(),
    });

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
