'use client'

import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import { Button } from './ui/button';

interface CarResultsProps {
	count: number,
	maxPrice?: number
}

const arrayOfDescriptions = [
	'"A reliable pre-owned vehicle offering excellent value for its performance and durability."',
	'"A sleek and stylish pre-owned vehicle that combines comfort and performance."',
	'"A versatile pre-owned vehicle that is perfect for both city driving and long-distance travel."',
	'"A reliable pre-owned vehicle that offers a comfortable and spacious interior."',
	'"A sporty pre-owned vehicle that is perfect for those who love to drive."',
	'"A spacious pre-owned vehicle that is perfect for families or groups of friends."',
	'"A fuel-efficient pre-owned vehicle that is perfect for those who want to save on gas."',
	'"A reliable pre-owned vehicle that offers a comfortable and spacious interior."',
	'"A sporty pre-owned vehicle that is perfect for those who love to drive."',
	'"A spacious pre-owned vehicle that is perfect for families or groups of friends."',
	'"A fuel-efficient pre-owned vehicle that is perfect for those who want to save on gas."',
]

const arrayOfNames = [
	'Audi A3',
	'Mercedes-Benz C-Class',
	'Mercedes-Benz S-Class',
	'Mercedes-Benz S-Class',
	'Audi A3',
	'Audi Q5',
	'Audi TT',
]

const arrayOfPrices = [
	21930,
	18990,
	25500,
	32750,
 	28990,
 	35900,
 	29500,
]

const arrayOfSrcs = [
	'/a3.jpg',
	'/c-class.jpg',
	'/cclass.jpg',
	'/mercedesbenzsclass.jpg',
	'/audi.avif',
	'/audiq5.jpg',
	'/audiTT.jpg',
]

export default function CarResults({ count, maxPrice }: CarResultsProps) {
	// This is a mock function to generate dummy data
	const generateDummyCars = (count: number) => {
		const allCars = Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			name: `${arrayOfNames[i]}`,
			description: `${arrayOfDescriptions[i]}`,
			price: arrayOfPrices[i],
			src: `${arrayOfSrcs[i]}`,
		}))
		if (maxPrice) {
			return allCars.filter(car => car.price <= maxPrice)
		}
	}
	const cars = generateDummyCars(count)

	const handleCarClick = (id: number) => {
		router.push(`/car/${id}`)
	}

	return (
		<div className='grid gap-6'>
			<h2 className='text-2xl text-white font-bold'>Best choices</h2>
			<div className='grid grid-cols-2 gap-4'>
			{cars && cars.length > 0 ? (
					cars?.map(car => (
					<Link href={`/car/${car.id}`} key={car.id}
						className='cursor-pointer overflow-hidden rounded-lg bg-white '
						onClick={() => handleCarClick(car.id)}
					>
						<div className='relative'>
							{/* <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-xs">
                    360 View
                  </div> */}
							{/* <button
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle favorite toggle
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </button> */}
							<Image
								src={car.src}
								alt={car.name}
								width={300}
								height={200}
								className='h-32 w-full object-cover'
							/>
						</div>
						<div className='p-3 flex flex-col justify-between h-32 '>
							<h3 className='font-semibold'>{car.name}</h3>
							<p className='text-sm'>Cash Price. {car.price}€</p>
							<Link href={`/inquiry/${car.id}`}>
								<Button variant={'default'} className='bg-orange-600'>Make an Inquiry</Button>
							</Link>
						</div>
					</Link>
				))) : (
					<div className='col-span-2 text-center text-white'>
						No cars found matching your criteria
					</div>
				)}
			</div>

			{/* <div className="grid gap-4 md:grid-cols-3">
        {cars.map((car) => (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.name}</CardTitle>
              <CardDescription>€{car.price.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{car.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/inquiry/${car.id}`}>
                <Button>Make an Inquiry</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div> */}
		</div>
	)
}
