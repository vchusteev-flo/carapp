'use client'

import { OrderCard } from '@/components/order-card';
import { notionClient } from '@/lib/notion';
import { TelegramContext } from '@/providers/telegram';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
interface Order {
  pageId: string
  ID: string
  name: string
  telegramId: string,
  orderCarId: string
  status: string
  comments: string
  price: string
}

const allCars = [
  {
    id: 1,
    name: 'Audi',
    make: 'A3',
    image: '/a3.jpg',
    price: '21,930€',
    featured: true
  },
  {
    id: 2,
    name: 'Mercedes-Benz',
    make: 'C-Class',
    image: '/c-class.jpg',
    price: '18,990€'
  },
  {
    id: 3,
    name: 'Audi',
    make: 'TT',
    image: '/audiTT.jpg',
    price: '25,500€'
  },
  {
    id: 4,
    name: 'Mercedes-Benz',
    make: 'S-Class',
    image: '/mercedesbenzsclass.jpg',
    price: '61,990€'
  },
  {
    id: 5,
    name: 'Audi',
    make: 'Q5',
    image: '/audiq5.jpg',
    price: '44,500€'
  }
]

export default function LoginPage() {
  const telegram = useContext(TelegramContext)
  const userData = telegram?.initDataUnsafe?.user;
  const [orders, setOrders] = useState<Order[] | []>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await notionClient.getCarInquiriesByTelegramId(String(userData!.id))
      setOrders(response)
    }
    fetchOrders()
  }, [])

  return (
    <div className='min-h-screen pb-20 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal text-white'>
      <div className='flex justify-between p-4'>
        <Link href='/' className='rounded-full p-2'>
          <ArrowLeft className='h-6 w-6' color='white' />
        </Link>
      </div>

      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Заказы</h1>
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <OrderCard key={order.ID} order={{...order, image: allCars[index].image, make: allCars[index].make, model: allCars[index].name} } />
          ))}
        </div>
      </div>

      {/* <main className='p-4'>
        <div className='flex items-center gap-4 mb-8'>
          <div className='rounded-full bg-united_nations_blue-400 p-3'>
            <UserCircle className='h-8 w-8' />
          </div>
          <h1 className='text-2xl font-bold'>Telegram Profile</h1>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center gap-3 bg-united_nations_blue-400/10 p-4 rounded-lg'>
            <div className='rounded-full bg-united_nations_blue-400 p-2'>
              <User className='h-6 w-6' />
            </div>
            <div>
              <p className='font-medium'>Name</p>
              <p className='text-sm text-gray-300'>{userData?.first_name || 'Loading...'}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 bg-united_nations_blue-400/10 p-4 rounded-lg'>
            <div className='rounded-full bg-united_nations_blue-400 p-2'>
              <MessageCircle className='h-6 w-6' />
            </div>
            <div>
              <p className='font-medium'>Username</p>
              <p className='text-sm text-gray-300'>@{userData?.username || 'Loading...'}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 bg-united_nations_blue-400/10 p-4 rounded-lg'>
            <div className='rounded-full bg-united_nations_blue-400 p-2'>
              <Hash className='h-6 w-6' />
            </div>
            <div>
              <p className='font-medium'>Telegram ID</p>
              <p className='text-sm text-gray-300'>{userData?.id || 'Loading...'}</p>
            </div>
          </div>
        </div>
      </main> */}
    </div>
  )
}
