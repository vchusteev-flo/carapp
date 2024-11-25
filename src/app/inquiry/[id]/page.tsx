'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InquiryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleInquiry = async () => {
    setIsLoading(true)
    // Here you would typically send the inquiry to your backend
    // which would then log it in Notion and send a Telegram notification
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
    setIsLoading(false)
    router.push(`/confirmation/${params.id}`)
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Make an Inquiry</h1>
      <Card>
        <CardHeader>
          <CardTitle>Car Model {params.id}</CardTitle>
          <CardDescription>Confirm your interest in this car</CardDescription>
        </CardHeader>
        <CardContent>
          <p>By making an inquiry, we'll calculate the delivery costs and update you on the status.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleInquiry} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Make an Inquiry'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

