import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Order Confirmation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Car Model {params.id}</CardTitle>
          <CardDescription>Your inquiry has been received</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Thank you for your interest. We'll calculate the delivery costs and update you on the status via the app and Telegram.</p>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

