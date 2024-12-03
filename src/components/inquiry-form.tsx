'use client'

import { Button } from '@/components/ui/button';
import { notionClient } from '@/lib/notion';
import { useEffect, useState } from 'react';
interface CarInquiry {
  name: string
  telegramId: number
  orderCarId: string
  status: string
  comments: string
  price: number
  finalPrice: string
}

export function InquiryForm({ id, carPrice }: { id: string, carPrice: number })  {
  const [carOrdered, setCarOrdered] = useState(false);

  useEffect(() => {
    const checkIfCarOrdered = async () => {
      const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}');
      if (telegramUserData.id) {
        const inquiries = await notionClient.getCarInquiriesByTelegramId(telegramUserData.id);
        const hasActiveOrder = inquiries.some((inquiry: CarInquiry) => 
          inquiry.orderCarId === id && inquiry.status !== 'Canceled'
        );
        setCarOrdered(hasActiveOrder);
      }
    };
    
    checkIfCarOrdered();
  }, [id]);

  const handleSubmit = async () => {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}')
    
    const inquiryData = {
      name: telegramUserData.username,
      telegramId: telegramUserData.id,
      orderCarId: id,
      status: "New",
      comments: " ",
      price: carPrice,
      finalPrice: '-',
    };
    
    const response = await notionClient.createCarInquiry(inquiryData)
    if (response.ok) {
      setCarOrdered(true)
    }
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button 
        type="submit" 
        disabled={carOrdered} 
        className={`px-16 py-8 ${!carOrdered ? `bg-orange-500`: `bg-green-500`} ${!carOrdered ? `text-white`: `text-black`} font-medium rounded-lg shadow-md hover:shadow-lg`}
      >
        {!carOrdered ? `Связаться  с нами` : `Запрос на обратную связь отправлен`}
      </Button>
    </form>
  )
}
