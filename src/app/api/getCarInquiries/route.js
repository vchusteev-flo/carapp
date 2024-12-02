import { getCarInquiries } from '../../../utils/notion';

export async function GET() {
  console.log('request');
  try {
    // Manually set CORS headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Allow all origins (or specify a specific domain)
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
    });

    const inquiries = await getCarInquiries();

    return new Response(JSON.stringify(inquiries), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching car inquiries:', error);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return new Response(JSON.stringify({ message: 'Failed to fetch car inquiries' }), {
      status: 500,
      headers,
    });
  }
}
