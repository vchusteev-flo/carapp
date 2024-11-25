import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface CarResultsProps {
  count: number
}

export default function CarResults({ count }: CarResultsProps) {
  // This is a mock function to generate dummy data
  const generateDummyCars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Car Model ${i + 1}`,
      description: `This is a great car with amazing features.`,
      price: Math.floor(Math.random() * 50000) + 10000,
    }))
  }

  const cars = generateDummyCars(count)

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Search Results</h2>
      <div className="grid gap-4 md:grid-cols-3">
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
      </div>
    </div>
  )
}

