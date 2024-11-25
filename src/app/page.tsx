'use client'

import { FilterModal } from '@/components/filter-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Heart, HomeIcon, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const handleSearch = (filters: any) => {
    console.log('Searching with filters:', filters)
    // Implement your search logic here
  }

  const handleCarClick = (id: number) => {
    router.push(`/car/${id}`)
  }

  // Mock car data
  const featuredCars = [
    {
      id: 1,
      name: 'Tesla model 3 standard range plus',
      image: '/placeholder.svg',
      price: '18,00,000.00'
    }
  ]

  const recommendedCars = [
    {
      id: 1,
      name: 'Audi e-tron Premium',
      image: '/placeholder.svg',
      price: '77,823.73'
    },
    {
      id: 2,
      name: 'BMW i4 M50',
      image: '/placeholder.svg',
      price: '82,500.00'
    },
    {
      id: 3,
      name: 'Mercedes EQS',
      image: '/placeholder.svg',
      price: '96,000.00'
    },
    {
      id: 4,
      name: 'Porsche Taycan',
      image: '/placeholder.svg',
      price: '103,800.00'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="top-0 z-50 p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="p-2">
            {/* <Image src="/carBgg.webp" alt="TopImage" width={100} height={100} /> */}
          </button>
          <h1 className="text-2xl font-bold text-orange-500">CarStore</h1>
          <div className="relative flex-1">
            <Input
              className="w-full rounded-full bg-gray-100 pl-10 pr-4"
              placeholder="Search for Honda Pilot 7-
Passenger"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter className="h-5 w-5" />
          </Button>
          <button className="relative p-2">
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-500" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </header>
      {/* <Image src="/carBggg.webp" alt="TopImage" width={600} height={300} /> */}
      <div className='bg-bgMainFull bg-cover bg-center bg-no-repeat max-w-screen-2xl min-h-screen'>
      </div>

      {/* Main Content */}
      <main className="p-4">
        {/* Featured Section */}
        <div className="mb-8">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="relative mb-4 cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleCarClick(car.id)}
            >
              <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-orange-500 px-4 py-2 text-white">
                Featured
              </div>
              <Image
                src={car.image}
                alt={car.name}
                width={600}
                height={300}
                className="h-48 w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <h3 className="text-lg font-semibold">{car.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended</h2>
            <Link href="/search" className="text-gray-500">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recommendedCars.map((car) => (
              <div
                key={car.id}
                className="cursor-pointer overflow-hidden rounded-lg "
                onClick={() => handleCarClick(car.id)}
              >
                <div className="relative">
                  <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs">
                    360 View
                  </div>
                  <button
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle favorite toggle
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={300}
                    height={200}
                    className="h-32 w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold">{car.name}</h3>
                  <p className="text-sm text-gray-500">Rs. {car.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t">
        <div className="flex items-center justify-around p-4">
          <Link href="/" className="flex flex-col items-center text-orange-500">
            <HomeIcon className="h-6 w-6" />
            <span className="mt-1 text-xs">Home</span>
          </Link>
          <Link href="/favorites" className="flex flex-col items-center text-gray-400">
            <Heart className="h-6 w-6" />
            <span className="mt-1 text-xs">Favorites</span>
          </Link>
          <Link href="/auth/login" className="flex flex-col items-center text-gray-400">
            <User className="h-6 w-6" />
            <span className="mt-1 text-xs">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSearch={handleSearch}
      />
    </div>
  )
}

