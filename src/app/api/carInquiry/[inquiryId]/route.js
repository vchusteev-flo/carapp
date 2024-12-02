import { deleteCarInquiry } from '../../../../utils/notion';

export async function OPTIONS() {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  
  return new Response(null, {
    status: 204,
    headers,
  });
}

export async function DELETE(request, { params }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  });

  const { inquiryId } = params;
  try {
    await deleteCarInquiry(inquiryId);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error deleting car inquiry:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete car inquiry' }), {
      status: 500,
      headers,
    });
  }
}
