// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const response = NextResponse.next();

//   // Add CORS headers
//   response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (or specify allowed domains)
//   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   // Handle preflight requests
//   if (request.method === 'OPTIONS') {
//     return new Response(null, {
//       headers: response.headers,
//     });
//   }

//   return response;
// }

import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: 'http://allowed-origin.com',
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  res.json({ message: 'Hello from Next.js!' });
}
