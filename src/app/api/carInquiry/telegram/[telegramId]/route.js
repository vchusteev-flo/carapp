import { findCarInquiryByTelegramId } from '../../../../../utils/notion';

export async function OPTIONS() {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  
  return new Response(null, {
    status: 204,
    headers,
  });
}

export async function GET(request, { params }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  });

  try {
    const inquiries = await findCarInquiryByTelegramId(params.telegramId);
    return new Response(JSON.stringify(inquiries), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching car inquiries by telegram ID:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch car inquiries' }), {
      status: 500,
      headers,
    });
  }
}
