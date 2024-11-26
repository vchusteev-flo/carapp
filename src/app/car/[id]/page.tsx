'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CarDetailsPage({ params }: { params: { id: string } }) {
	const [activeImage, setActiveImage] = useState(0)

	// Mock data - in real app, fetch this based on params.id
	const car = {
		name: 'Audi A3',
		price: 'Cash Price. 21 930€',
		rating: 4.5,
		description:
			'"A stylish hatchback with a sporty design, great handling, and modern features.',
		features: ['Autopilot', '360° Camera'],
		images: ['/a3.jpg', '/a3side.webp', '/a3front.webp'],
		location: 'Berlin, Germany',
	}

	const nextImage = () => {
		setActiveImage(prev => (prev + 1) % car.images.length)
	}

	const previousImage = () => {
		setActiveImage(prev => (prev - 1 + car.images.length) % car.images.length)
	}

	return (
		<div className='min-h-screen bg-charcoal'>
			{/* Header */}
			{/* <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white p-4">
        </header> */}
			<div className='flex justify-between p-4'>
				<Link href='/' className='rounded-full p-2'>
					<ArrowLeft className='h-6 w-6' color='white' />
				</Link>
				<button className='rounded-full p-2'>
					<Share2 className='h-6 w-6' color='white'/>
				</button>
			</div>

			{/* Main Content */}
			<main className=''>
				{/* Image Carousel */}
				<div className='relative h-48 w-full'>
					<Image
						src={car.images[activeImage]}
						alt={car.name}
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
						{car.images.map((_, index) => (
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

				{/* Thumbnails */}
				<div className='flex gap-2 p-4'>
					{car.images.map((image, index) => (
						<button
							key={index}
							onClick={() => setActiveImage(index)}
							className={`relative h-20 w-20 overflow-hidden rounded-lg ${
								index === activeImage ? 'ring-2 ring-orange-500' : ''
							}`}
						>
							<Image
								src={image}
								alt={`${car.name} view ${index + 1}`}
								fill
								className='object-cover'
							/>
						</button>
					))}
				</div>

				{/* Car Details */}
				<div className='p-4'>
					<div className='mb-4'>
						<h1 className='text-2xl font-bold'>{car.name}</h1>
						<p className='text-lg font-semibold'>{car.price}</p>
					</div>

					<div className='mb-4 flex items-center gap-2'>
						<div className='flex items-center gap-1'>
							<Star className='h-5 w-5 fill-orange-500 text-orange-500' />
							<span className='font-semibold text-orange-500'>
								{car.rating}
							</span>
							<span className='text-gray-500'>/5</span>
						</div>
					</div>

					<div className='mb-4'>
						<p className='text-gray-600'>
							{car.description}
							<button className='ml-1 text-blue-500'>Read more...</button>
						</p>
					</div>

					<div className='mb-6 flex gap-2'>
						{car.features.map(feature => (
							<Badge key={feature} variant='secondary'>
								{feature}
							</Badge>
						))}
						<Button variant='ghost' className='text-gray-500'>
							See All
						</Button>
					</div>

					<div className='mb-6 grid grid-cols-2 gap-4'>
						<div className='flex items-center gap-3'>
							<div className='rounded-full bg-gray-100 p-2'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
									<circle cx='9' cy='7' r='4' />
									<path d='M22 21v-2a4 4 0 0 0-3-3.87' />
									<path d='M16 3.13a4 4 0 0 1 0 7.75' />
								</svg>
							</div>
							<div>
								<p className='font-medium'>Contact Dealer</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='rounded-full bg-gray-100 p-2'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
									<line x1='3' x2='21' y1='9' y2='9' />
									<line x1='9' x2='9' y1='21' y2='9' />
								</svg>
							</div>
							<div>
								<p className='font-medium'>Car details</p>
								<p className='text-sm text-gray-500'>(Model, year...)</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='rounded-full bg-gray-100 p-2'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
									<circle cx='12' cy='10' r='3' />
								</svg>
							</div>
							<div>
								<p className='font-medium'>{car.location}</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<div className='rounded-full bg-gray-100 p-2'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<rect width='20' height='14' x='2' y='5' rx='2' />
									<line x1='2' x2='22' y1='10' y2='10' />
								</svg>
							</div>
							<div>
								<p className='font-medium'>EMI/Loan</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Bottom Button */}
			<div className='fixed bottom-0 left-0 right-0 p-4'>
				<Button className='w-full bg-orange-500 hover:bg-orange-600'>
					Buy Now
				</Button>
			</div>
		</div>
	)
}
