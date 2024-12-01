'use client'

import { TelegramContext } from '@/providers/telegram';
import { ArrowLeft, Hash, MessageCircle, User, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

export default function LoginPage() {
  const telegram = useContext(TelegramContext)
  const userData = telegram?.initDataUnsafe?.user

  return (
    <div className='min-h-screen pb-20 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal text-white'>
      <div className='flex justify-between p-4'>
        <Link href='/' className='rounded-full p-2'>
          <ArrowLeft className='h-6 w-6' color='white' />
        </Link>
      </div>

      <main className='p-4'>
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
      </main>
    </div>
  )
}
