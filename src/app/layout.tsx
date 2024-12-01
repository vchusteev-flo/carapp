import { NavWrapper } from '@/components/nav-wrapper';
import { TelegramProvider } from '@/providers/telegram';
import localFont from 'next/font/local';
import './globals.css';

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
				<script defer src="https://telegram.org/js/telegram-web-app.js"></script> 
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
				<TelegramProvider>
					<NavWrapper>{children}</NavWrapper>
				</TelegramProvider>

				<script dangerouslySetInnerHTML={{
					__html: `
						if (typeof window !== 'undefined' && window.Telegram) {
							const app = window.Telegram.WebApp;
							app.ready();
							app.expand();

							console.log(app.initDataUnsafe.user, 'unsafe user data');
							console.log(app.initDataUnsafe, 'unsafe obj');
							console.log(app, 'app obj');
						}
					`
				}} />
			</body>
		</html>
	)
}
