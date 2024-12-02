import { InquiryForm } from '@/components/inquiry-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { notionClient } from '@/lib/notion';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function handleInquiry(formData: FormData) {
	'use server'

	const inquiryData = {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		phone: '',
		email: '',
		carOptions: [],
		telegramId: formData.get('telegramId') as string,
		username: formData.get('username') as string,
	}

	await notionClient.createCarInquiry(inquiryData)
	redirect('/confirmation/' + inquiryData.id)
}

type pageProps = Promise<{ id: string }>

export default async function InquiryPage(props:  { params : pageProps} ) {
	const { id } = await props.params

	return (
		<div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal-600 to-charcoal'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-4xl font-bold text-white text-center mb-8 tracking-tight'>
					Make an Inquiry
				</h1>
				<Card className='shadow-xl hover:shadow-2xl transition-shadow duration-300'>
					<CardHeader className='space-y-2'>
						<CardContent>
							<Image src='/a3.jpg' alt='Car Image' width={300} height={300} />
						</CardContent>
						<CardTitle className='text-2xl font-semibold text-center'>
							Car Model {id}
						</CardTitle>
						<CardDescription className='text-center text-gray-600'>
							Confirm your interest in this car
						</CardDescription>
					</CardHeader>
					<CardContent className='px-6'>
						<p className='text-gray-700 text-center leading-relaxed'>
							By making an inquiry, we&apos;ll calculate the delivery costs and
							update you on the status.
						</p>
					</CardContent>
					<CardFooter className='flex justify-center pb-6'>
						<InquiryForm id={id} handleInquiry={handleInquiry} />
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
