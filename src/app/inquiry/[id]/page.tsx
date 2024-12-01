import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type pageProps = Promise<{ id: string }>

async function handleInquiry(formData: FormData) {
  'use server'
  // Here you would typically send the inquiry to your backend
  // which would then log it in Notion and send a Telegram notification
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
  redirect('/confirmation/' + formData.get('id'))
}

 export default async function InquiryPage(props:  { params : pageProps}) {
  const { id } = await props.params;
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 tracking-tight">Make an Inquiry</h1>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="space-y-2">
          <CardContent>
              <Image src='/a3.jpg' alt="Car Image" width={300} height={300} />
            </CardContent>
            <CardTitle className="text-2xl font-semibold text-center">Car Model {id}</CardTitle>
            <CardDescription className="text-center text-gray-600">Confirm your interest in this car</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <p className="text-gray-700 text-center leading-relaxed">By making an inquiry, we&apos;ll calculate the delivery costs and update you on the status.</p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <form action={handleInquiry}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" className="px-8 py-2 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg">
                Make an Inquiry
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
