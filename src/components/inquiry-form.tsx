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

export function InquiryForm({ id, carPrice }: { id: string; carPrice: number }) {
  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(`hasButtonBeenClicked_${id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [carOrdered, setCarOrdered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Store hasButtonBeenClicked in localStorage whenever it changes
    localStorage.setItem(`hasButtonBeenClicked_${id}`, JSON.stringify(hasButtonBeenClicked));
  }, [hasButtonBeenClicked, id]);

  useEffect(() => {
    const checkIfCarOrdered = async () => {
      const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}');
      if (telegramUserData.id) {
        const inquiries = await notionClient.getCarInquiriesByTelegramId(telegramUserData.id);
        const hasActiveOrder = inquiries.some(
          (inquiry: CarInquiry) => inquiry.orderCarId === id && inquiry.status !== 'Canceled'
        );
        setCarOrdered(hasActiveOrder);
      }
    };

    checkIfCarOrdered();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (carOrdered) {
      // Car is already ordered, so we only change the button state locally
      setHasButtonBeenClicked(true);
    } else {
      // Car is not ordered yet, proceed to send the request to the server
      setIsLoading(true);
      setHasButtonBeenClicked(true);

      const telegramUserData = JSON.parse(localStorage.getItem('telegramUser') || '{}');

      const inquiryData = {
        name: telegramUserData.username,
        telegramId: telegramUserData.id,
        orderCarId: id,
        status: 'New',
        comments: ' ',
        price: carPrice,
        finalPrice: '-',
      };

      const response = await notionClient.createCarInquiry(inquiryData);
      setIsLoading(false);
      if (response) {
        setCarOrdered(true);
      }
    }
  };

  let buttonText;
  if (carOrdered) {
    buttonText = !hasButtonBeenClicked
      ? 'Запрос на обратную связь отправлен'
      : 'Связаться с нами';
  } else {
    buttonText = !hasButtonBeenClicked ? 'Запрос на расчет отправлен' : 'Сделать расчет';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        className={`px-16 py-8 transition-colors duration-300 ${
          hasButtonBeenClicked ? 'bg-green-500 text-black' : 'bg-orange-500 text-white'
        } font-medium rounded-lg`}
        disabled={isLoading}
      >
        {buttonText}
      </Button>
    </form>
  );
}
