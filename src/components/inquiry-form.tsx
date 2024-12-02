'use client'

import { Button } from '@/components/ui/button';
import { notionClient } from '@/lib/notion';

export function InquiryForm({ id }: { id: string }) {
  const handleSubmit = async () => {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}')
    
    const inquiryData = {
      id: Number(id),
      name: telegramUserData.first_name || '',
      phone: '',
      email: '',
      carOptions: [],
      telegramId: telegramUserData.id,
      username: telegramUserData.username
    }
    const resp = await notionClient.getCarInquiries();
    const resp2 = await notionClient.createCarInquiry(inquiryData)
    console.log(resp, '>>> resp')
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
