'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ImageCarouselProps {
  images: string[]
  name: string
}

export function ImageCarousel({ images, name }: ImageCarouselProps) {
  const [activeImage, setActiveImage] = useState(0)

  const nextImage = () => {
    setActiveImage(prev => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setActiveImage(prev => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className='relative h-48 w-full'>
        <Image
          src={images[activeImage]}
          alt={name}
          fill
          className='object-contain'
        />
        <button
          onClick={previousImage}
          className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2'
        >
          <ChevronLeft className='h-6 w-6' />
        </button>
        <button
          onClick={nextImage}
          className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2'
        >
          <ChevronRight className='h-6 w-6' />
        </button>
        <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-2 w-2 rounded-full ${
                index === activeImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className='flex gap-2 p-4'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative h-20 w-20 overflow-hidden rounded-lg ${
              index === activeImage ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${name} view ${index + 1}`}
              fill
              className='object-cover'
            />
          </button>
        ))}
      </div>
    </>
  )
}
