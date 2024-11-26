'use client'

import { FilterModal } from '@/components/filter-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Filter, Heart, HomeIcon, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Slider from "react-slick";

// Import slick-carousel styles
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Home() {
  const router = useRouter()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSearch = (filters: any) => {
    console.log('Searching with filters:', filters)
    // Implement your search logic here
  }

  const handleCarClick = (id: number) => {
    router.push(`/car/${id}`)
  }

  // Combine featured and recommended cars
  const allCars = [
    {
      id: 1,
      name: 'Audi A3',
      image: '/a3.jpg',
      price: '21,930€',
      featured: true
    },
    {
      id: 2,
      name: 'Mercedes-Benz C-Class',
      image: '/c-class.jpg',
      price: '18,990€'
    },
    {
      id: 3,
      name: 'Audi TT',
      image: '/audiTT.jpg',
      price: '25,500€'
    },
    {
      id: 4,
      name: 'Mercedes-Benz S-Class',
      image: '/mercedesbenzsclass.jpg',
      price: '61,990€'
    },
    {
      id: 5,
      name: 'Audi Q5',
      image: '/audiq5.jpg',
      price: '44,500€'
    }
  ]

  const PrevArrow = (props: any) => {
    const { onClick } = props
    return (
      <button
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
        onClick={onClick}
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
    )
  }

  const NextArrow = (props: any) => {
    const { onClick } = props
    return (
      <button
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md"
        onClick={onClick}
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.5)",
          display: "inline-block",
          margin: "0 4px",
        }}
      />
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gunmetal-300 via-gunmetal-600 to-gunmetal-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-charcoal p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              className="w-full rounded-full bg-gray-100 pl-10 pr-4"
              placeholder="By price $"
              type='number'
              step={1000}
              />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          <h1 className="text-xl font-bold text-white">ChoiceGear</h1>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 bg-white"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {/* Car Carousel */}
        <div className="mb-8">
          {isClient && (
            <div className="relative">
              <Slider {...settings}>
                {allCars.map((car) => (
                  <div key={car.id} className="relative">
                    <div
                      className="relative cursor-pointer overflow-hidden"
                      // onClick={() => handleCarClick(car.id)}
                    >
                      {car.featured && (
                        <div className="absolute left-0 top-0 z-10 rounded-br-lg bg-orange-500 px-4 py-2 text-white">
                          Featured
                        </div>
                      )}
                      <Image
                        src={car.image}
                        alt={car.name}
                        width={600}
                        height={300}
                        className="h-64 w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                        <h3 className="text-lg font-semibold">{car.name}</h3>
                        <p className="text-sm">Cash Price. {car.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <style jsx global>{`
                .slick-dots li.slick-active div {
                  background-color: white !important;
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Recommended Section */}
        <div className="px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl text-white font-semibold">Recommended</h2>
            <Link href="/search" className="text-gray-500">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allCars.slice(1).map((car) => (
              <div
                key={car.id}
                className="cursor-pointer overflow-hidden rounded-lg bg-white "
                onClick={() => handleCarClick(car.id)}
              >
                <div className="relative">
                  {/* <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs">
                    360 View
                  </div> */}
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
                <div className="p-3 flex flex-col justify-between h-24 ">
                  <h3 className="font-semibold">{car.name}</h3>
                  <p className="text-sm">Cash Price. {car.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-charcoal shadow-t">
        <div className="flex items-center justify-around p-4">
          <Link href="/" className="flex flex-col items-center text-gray-200">
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

