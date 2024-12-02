import { createCarInquiry } from '../../../utils/notion';

export async function POST(request) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });

  try {
    const inquiryData = await request.json();
    await createCarInquiry(inquiryData);
    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers,
    });
  } catch (error) {
    console.error('Error creating car inquiry:', error);
    return new Response(JSON.stringify({ message: 'Failed to create car inquiry' }), {
      status: 500,
      headers,
    });
  }
}
