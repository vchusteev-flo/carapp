import { getCarInquiries } from '../../../utils/notion';

export async function GET() {
  try {
    const inquiries = await getCarInquiries();
    return new Response(JSON.stringify(inquiries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching car inquiries:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch car inquiries' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
