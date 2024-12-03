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

export function InquiryForm({
	id,
	carPrice,
}: {
	id: string
	carPrice: number
}) {
	const [carOrdered, setCarOrdered] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const checkIfCarOrdered = async () => {
			const telegramUserData = JSON.parse(
				localStorage.getItem('telegramUser') || '{}'
			)
			if (telegramUserData.id) {
				const inquiries = await notionClient.getCarInquiriesByTelegramId(
					telegramUserData.id
				)
				const hasActiveOrder = inquiries.some(
					(inquiry: CarInquiry) =>
						inquiry.orderCarId === id && inquiry.status !== 'Canceled'
				)
				setCarOrdered(hasActiveOrder)
			}
		}

		checkIfCarOrdered()
	}, [id])

	const handleSubmit = async () => {
		setIsLoading(true)
		const telegramUserData = JSON.parse(
			localStorage.getItem('telegramUser') || '{}'
		)

		const inquiryData = {
			name: telegramUserData.username,
			telegramId: telegramUserData.id,
			orderCarId: id,
			status: 'New',
			comments: ' ',
			price: carPrice,
			finalPrice: '-',
		}

		const response = await notionClient.createCarInquiry(inquiryData)
    setTimeout(() => {
      if (response.ok) {
        setCarOrdered(true);
      }
      setIsLoading(false);
    }, 2000);
	}

	return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <Button 
        type="submit" 
        className={`px-16 py-8 transition-colors duration-300 ${(!carOrdered && !isLoading) ? 'bg-orange-500 text-white' : 'bg-green-500 text-black'} font-medium rounded-lg shadow-md hover:shadow-lg`}
      >
        {isLoading ? 'Запрос на обратную связь отправлен' : !carOrdered ? 'Связаться с нами' : 'Запрос на обратную связь отправлен'}
      </Button>
    </form>
	)
}
