import { FeatureBadges } from '@/components/feature-badges';
import { ImageCarousel } from '@/components/image-carousel';
import { InquiryForm } from '@/components/inquiry-form';
import { notionClient } from '@/lib/notion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Params = {
	id: string[]
}

async function getCarData(id: string) {
	const response = await notionClient.getCarInquiryById(id)
	return response
}

export default async function CarDetailsPage({
	params,
}: {
	params: Promise<Params>
}) {
	const data = await params
	console.log(data)
	const { id } = await params
	let carResponse
	if (id.length > 1) {
		console.log(id[1], 'id1 to getCarData')
		carResponse = await getCarData(id[1])
	}

	// Mock data - in real app, fetch this based on params.id
	const cars = [
		{
			id: '1',
			name: 'Audi A3',
			image: '/a3.jpg',
			price: 21930,
			mileage: '12 000km',
			year: 2023,
			description: 'Стильный хэтчбек со спортивным дизайном, отличной управляемостью и современными функциями.',
			features: [
				'Autopilot',
				'360° Camera',
				'Premium Sound System',
				'Leather Seats',
				'Navigation',
				'Bluetooth',
				'Parking Sensors',
			],
			images: ['/a3.jpg', '/a3side.webp', '/a3front.webp'],
			location: 'Berlin, Germany'
		},
		{
			id: '2',
			name: 'Mercedes-Benz C-Class',
			image: '/c-class.jpg',
			price: 18990,
			year: 2012,
			mileage: '142 000km',
			description: 'Роскошный седан с элегантным дизайном, превосходным комфортом и передовыми технологиями.',
			features: [
				'MBUX Infotainment',
				'Burmester Sound System',
				'Leather Seats',
				'Navigation',
				'Bluetooth',
				'Active Parking Assist',
			],
			images: ['/mfront.jpg', '/mside.jpg', '/mfront.jpg'],
			location: 'Berlin, Germany'
		},
		{
			id: '3',
			name: 'Audi TT',
			image: '/audiTT.jpg',
			price: 25500,
			year: 2016,
			mileage: '36 000km',
			description: 'Спортивное купе с выразительным дизайном и мощным двигателем.',
			features: [
				'Virtual Cockpit',
				'Sport Seats',
				'LED Headlights',
				'Navigation',
				'Bluetooth',
				'Parking Sensors',
			],
			images: ['/audiTT.jpg', '/audiTTdrive.avif', '/audiTTin.avif'],
			location: 'Berlin, Germany'
		},
		{
			id: '4',
			name: 'Mercedes-Benz S-Class',
			image: '/mercedesbenzsclass.jpg',
			price: 61990,
			year: 2016,
			mileage: '52 000km',
			description: 'Флагманский седан с максимальным комфортом и инновационными технологиями.',
			features: [
				'MBUX Infotainment',
				'Burmester 3D Sound',
				'Massage Seats',
				'Night Vision',
				'Air Suspension',
				'Active Parking',
			],
			images: ['/mercedesbenzsclass.jpg', '/classIn.jpg', '/msfront.jpg'],
			location: 'Berlin, Germany'
		},
		{
			id: '5',
			name: 'Audi Q5',
			image: '/audiq5.jpg',
			price: 44500,
			year: 2018,
			mileage: '66 000km',
			description: 'Премиальный кроссовер с просторным салоном и отличной динамикой.',
			features: [
				'Quattro AWD',
				'Virtual Cockpit',
				'Panoramic Roof',
				'Navigation',
				'Bang & Olufsen Sound',
				'Parking Assist',
			],
			images: ['/audiq5.jpg', '/audiq5side.jpg', '/audiq5back.jpg'],
			location: 'Berlin, Germany'
		}
	]

	const car = id[0] ? cars.find(c => c.id === id[0]) : cars[0];

	if (!car) {
		return <div>Car not found</div>
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
			</div>

			{/* Main Content */}
			<main className=''>
				<ImageCarousel images={car!.images} name={car!.name} />
				{/* Car Details */}
				<div className='p-4'>
					<div className='mb-4'>
						<h1 className='text-2xl font-bold'>{car!.name}</h1>
						<p className='text-lg font-semibold'>{car!.price}€</p>
						<p>{car!.year}</p>
						<p>{car!.mileage}</p>
					</div>

					{/* <div className='mb-4 flex items-center gap-2'>
						<div className='flex items-center gap-1'>
							<Star className='h-5 w-5 fill-orange-500 text-orange-500' />
							<span className='font-semibold text-orange-500'>
								{car!.rating}
							</span>
							<span className=''>/5</span>
						</div>
					</div> */}

					<div className='space-y-6 mt-6'>
						<div>
							<h2 className='text-xl font-semibold mb-2'>
								Данные о расчете стоимости:
							</h2>
							<p>Локация: Германия</p>

							<p>
								Стоимость под ключ:{' '}
								{id[1] ? `${carResponse.finalPrice}$` : 'Пока не расчитана'}
							</p>
						</div>
						{id[1] && carResponse.comments ? (
							<div>
								<h2 className='text-xl font-semibold mb-2'>
									Комментарий продавца услуги:
								</h2>
								<p className='text-muted-foreground'>{carResponse.comments}</p>
							</div>
						) : (
							[]
						)}
						<div>
							<h2 className='text-xl font-semibold mb-2'>Описание:</h2>
							<p className=''>{car!.description}</p>
						</div>
						<FeatureBadges features={car!.features}/>

					</div>

					<div className='pt-10 flex justify-center'>
						<InquiryForm id={id[0]} carPrice={car!.price} />
					</div>
				</div>
			</main>
		</div>
	)
}
