'use client'

import { Button } from '@/components/ui/button';

export function InquiryForm({ id, handleInquiry }: { id: string, handleInquiry: (formData: FormData) => Promise<void> }) {
  async function handleSubmit(formData: FormData) {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}')
    formData.append('telegramId', telegramUserData.id)
    formData.append('username', telegramUserData.username)
    formData.append('name', telegramUserData.first_name)
    await handleInquiry(formData)
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
