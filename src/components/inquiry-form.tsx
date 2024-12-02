'use client'

import { Button } from '@/components/ui/button';
import { notionClient } from '@/lib/notion';

export function InquiryForm({ id, carPrice }: { id: string, carPrice: number }) {
  const handleSubmit = async () => {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}')
    
    const inquiryData = {
      name: "Vladimir",
      telegramId: parseInt(telegramUserData.id),
      orderCarId: "3",
      status: "New",
      comments: " ",
      price: carPrice,
    };
    
    const resp2 = await notionClient.createCarInquiry(inquiryData)
    console.log(resp2, '>>> resp2')

    // await notionClient.createCarInquiry(inquiryData)
    // redirect('/confirmation/' + id)
    console.log('ok')
    console.log(inquiryData)
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" className="px-8 py-2 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg">
        Make an Inquiry
      </Button>
    </form>
  )
}
