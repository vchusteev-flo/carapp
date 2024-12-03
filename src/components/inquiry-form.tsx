'use client';

import { Button } from '@/components/ui/button';
import { notionClient } from '@/lib/notion';
import { useEffect, useState } from 'react';

interface CarInquiry {
  name: string;
  telegramId: number;
  orderCarId: string;
  status: string;
  comments: string;
  price: number;
  finalPrice: string;
}
interface InquiryStatus {
  status: 'New' | 'CallMe' | 'Offer' | null;
  pageId?: string;
}

export function InquiryForm({ id, carPrice }: { id: string; carPrice: number }) {
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus>({ status: null });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentStatus = async () => {
    const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}');
    if (telegramUserData.id) {
      const inquiries = await notionClient.getCarInquiriesByTelegramId(telegramUserData.id);
      const currentInquiry = inquiries.find((inquiry: CarInquiry) => 
        inquiry.orderCarId === id && inquiry.status !== 'Canceled'
      );
      if (currentInquiry) {
        setInquiryStatus({ status: currentInquiry.status, pageId: currentInquiry.pageId });
      }
    }
  };

  useEffect(() => {
    fetchCurrentStatus();
  }, [id, ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Submit started, current status:', inquiryStatus);
  
    try {
      if (inquiryStatus.status === 'New') {
        console.log('Updating New to CallMe');
        await notionClient.updateCarInquiryStatus(inquiryStatus.pageId!, 'CallMe');
        setInquiryStatus({ ...inquiryStatus, status: 'CallMe' });
      } else if (inquiryStatus.status === 'Offer') {
        console.log('Updating Offer to CallMe');
        await notionClient.updateCarInquiryStatus(inquiryStatus.pageId!, 'CallMe');
        setInquiryStatus({ ...inquiryStatus, status: 'CallMe' });
      } else if (!inquiryStatus.status) {
        console.log('Creating new inquiry');
        const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}');
        const createResponse = await notionClient.createCarInquiry({
          name: telegramUserData.username,
          telegramId: telegramUserData.id,
          orderCarId: id,
          status: "New",
          comments: " ",
          price: carPrice,
          finalPrice: '-',
        });
        console.log('Create response:', createResponse);
        
        const inquiries = await notionClient.getCarInquiriesByTelegramId(telegramUserData.id);
        console.log('Fetched inquiries:', inquiries);
        
        const currentInquiry = inquiries.find((inquiry: CarInquiry) => 
          inquiry.orderCarId === id && inquiry.status !== 'Canceled'
        );
        console.log('Found current inquiry:', currentInquiry);
        
        if (currentInquiry) {
          setInquiryStatus({ status: currentInquiry.status, pageId: currentInquiry.pageId });
          console.log('Updated status to:', currentInquiry.status);
        }
      }
    } catch (error) {
      console.error('Order submission error:', error);
    }
  
    setIsLoading(false);
    console.log('Final status:', inquiryStatus);
  };
  

  const getButtonConfig = () => {
    switch (inquiryStatus.status) {
      case 'CallMe':
        return { text: 'Запрос на обратную связь отправлен', color: 'bg-green-500', disabled: true };
      case 'New':
        return { text: 'Запрос на расчет отправлен', color: 'bg-green-500', disabled: false };
      case 'Offer':
        return { text: 'Связаться со мной', color: 'bg-orange-500', disabled: false };
      default:
        return { text: 'Сделать расчет', color: 'bg-orange-500', disabled: false };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button 
        type="submit" 
        disabled={buttonConfig.disabled || isLoading}
        className={`px-16 py-8 ${buttonConfig.color} ${buttonConfig.color === 'bg-green-500' ? 'text-black' : 'text-white'} font-medium rounded-lg shadow-md hover:shadow-lg`}
      >
        {isLoading ? 'Отправка запроса...' : buttonConfig.text}
      </Button>
    </form>
  );
}
