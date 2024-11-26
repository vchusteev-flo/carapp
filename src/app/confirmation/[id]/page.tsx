import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Order Confirmation</h1>
        <Card>
          <CardHeader className="space-y-2">
            <CardContent>
              <Image src='/a3.jpg' alt="Car Image" width={300} height={300} />
            </CardContent>
            <CardTitle className="text-2xl text-center text-gray-900">Car Model {params.id}</CardTitle>
            <CardDescription className="text-center text-gray-600">Your inquiry has been received</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <p className="text-gray-700 text-center leading-relaxed">
              Thank you for your interest. We'll calculate the delivery costs and update you on the status via the app and Telegram.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Link href="/">
              <Button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
