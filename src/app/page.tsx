'use client'

import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  interface ArrowProps {
    onClick?: () => void;
    currentSlide?: number;
    slideCount?: number;
  }
  
  const PrevArrow = (props: ArrowProps) => {
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
  const NextArrow = (props: ArrowProps) => {
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
    <div className="min-h-screen bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">

      {/* Main Content */}
      <main className="pb-20">
        {/* Car Carousel */}
        <div className="mb-2">
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
            <Link href="/budget" className="text-slate-300 underline">
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
     

    </div>
  )
}

