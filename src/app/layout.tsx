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
				<NavWrapper>{children}</NavWrapper>
				{/* <h1>User Data</h1>
    <div className="user-data">
		<p><strong>ID:</strong> <span id="userId"></span></p>
        <p><strong>Name:</strong> <span id="userFirstAndLast"></span></p>
        <p><strong>Email:</strong> <span id="userName"></span></p>
		<button id='button'>getUser</button>
    </div>
			<script> 
		const app = window.Telegram.WebApp;
        app.ready();
        app.expand();

        console.log(app.initDataUnsafe.user, 'unsafe user data');
        console.log(app.initDataUnsafe, 'unsafe obj');
        console.log(app, 'app obj');
        
        {/* const { first_name, last_name, username, id } = app.initDataUnsafe.user; */}
        
        {/* document.getElementById("userId").textContent = app.initDataUnsafe.user.id;
        document.getElementById("userFirstAndLast").textContent = app.initDataUnsafe.user.first_name + ' ' + app.initDataUnsafe.user.last_name;
        document.getElementById("userName").textContent = app.initDataUnsafe.user.username; */}
    {/* </script>  */}
			</body>
		</html>
	)
}
