import localFont from 'next/font/local';
import './globals.css';

import { NavWrapper } from '@/components/nav-wrapper';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata = {
	title: 'Car Import App',
	description: 'Import cars from Germany, Austria, and Luxembourg to Portugal',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='stylesheet'
					type='text/css'
					charSet='UTF-8'
					href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
				/>
				<link
					rel='stylesheet'
					type='text/css'
					href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
				/>
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NavWrapper>{children}</NavWrapper>
			</body>
		</html>
	)
}
