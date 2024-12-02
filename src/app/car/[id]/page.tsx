import { ImageCarousel } from '@/components/image-carousel';
import { InquiryForm } from '@/components/inquiry-form';
import { Badge } from '@/components/ui/badge';
import {
	ArrowLeft,
	Share2
} from 'lucide-react';
import Link from 'next/link';

type pageProps = Promise<{ id: string }>

export default async function CarDetailsPage( props:  { params : pageProps} ) {
	const { id } = await props.params;
	// Mock data - in real app, fetch this based on params.id
	const car = {
		name: 'Audi A3',
		price: 21930,
		rating: 4.5,
		description:
			'"A stylish hatchback with a sporty design, great handling, and modern features.',
		features: ['Autopilot', '360° Camera'],
		images: ['/a3.jpg', '/a3side.webp', '/a3front.webp'],
		location: 'Berlin, Germany',
	}

	return (
		<div className='min-h-screen pb-20 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal text-white'>
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
			<ImageCarousel images={car.images} name={car.name} />
				{/* Car Details */}
				<div className='p-4'>
					<div className='mb-4'>
						<h1 className='text-2xl font-bold'>{car.name}</h1>
						<p className='text-lg font-semibold'>{car.price}€</p>
					</div>

					{/* <div className='mb-4 flex items-center gap-2'>
						<div className='flex items-center gap-1'>
							<Star className='h-5 w-5 fill-orange-500 text-orange-500' />
							<span className='font-semibold text-orange-500'>
								{car.rating}
							</span>
							<span className=''>/5</span>
						</div>
					</div> */}

					<div className='mb-4'>
						<p className=''>
							{car.description}
							<button className='ml-1 text-orange-500'>Read more...</button>
						</p>
					</div>

					<div className='mb-6 flex gap-2'>
						{car.features.map(feature => (
							<Badge key={feature} variant='secondary'>
								{feature}
							</Badge>
						))}
					</div>
							<InquiryForm id={id} carPrice={car.price} />
				</div>
			</main>
		</div>
	)
}
