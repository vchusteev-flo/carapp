'use client'

import { Button } from '@/components/ui/button';
import { notionClient } from '@/lib/notion';
import { useState } from 'react';

export function InquiryForm({ id, carPrice }: { id: string, carPrice: number })  {
  const [isOk, setIsOk] = useState(false);
  const handleSubmit = async () => {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}')
    
    const inquiryData = {
      name: "Vladimir",
      telegramId: telegramUserData.id,
      orderCarId: "3",
      status: "New",
      comments: " ",
      price: carPrice,
    };
    
    const response = await notionClient.createCarInquiry(inquiryData)
    if (response.ok) {
      setIsOk(true)
    }

    // await notionClient.createCarInquiry(inquiryData)
    // redirect('/confirmation/' + id)
    console.log('ok')
    console.log(inquiryData)
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" disabled={isOk} className={`px-8 py-2 ${isOk ? `bg-orange-500`: `bg-green-500`} ${isOk ? `text-white`: `text-black`} font-medium rounded-lg shadow-md hover:shadow-lg`}>
        Make an Inquiry
      </Button>
    </form>
  )
}
