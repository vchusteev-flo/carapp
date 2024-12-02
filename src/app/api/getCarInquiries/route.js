import cors from '@/app/middleware';
import { getCarInquiries } from '../../../utils/notion';

export async function GET() {
	console.log('request')
  try {
		await cors(req, res);
    const inquiries = await getCarInquiries();
    return new Response(JSON.stringify(inquiries), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow all origins (or specify specific domain)
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Methods allowed
      },
    });
  } catch (error) {
    console.error('Error fetching car inquiries:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch car inquiries' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'},
    });
  }
}
