import type { Metadata } from 'next'
import { Mona_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const monaSans = Mona_Sans({
	variable: '--font-mona-sans',
	subsets: ['latin'],
})

const montserrat = Montserrat({
	variable: '--font-monmontserrat',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'JasX AI Mock Interview Platform | Prepare Smarter, Get Hired Faster',
	description:
		'JasX is an AI-powered mock interview platform designed to help developers and job seekers practice real interview questions, improve confidence, and land their dream job.',
	keywords: [
		'JasX',
		'AI Mock Interview',
		'AI Interview Platform',
		'JasX Interview Prep',
		'Practice Technical Interviews',
		'Frontend Developer Interview',
		'Full Stack Developer Interview',
	],
	openGraph: {
		title: 'JasX | AI Mock Interview Platform',
		description:
			'Prepare for job interviews with JasX. Get AI-powered feedback, real-time mock interviews, and tailored practice to boost your chances of success.',
		url: 'https://jasx.vercel.app',
		siteName: 'JasX',
		images: [
			{
				url: 'https://d12araoe7z5xxk.cloudfront.net/og-images/mock-interview.jpg',
				width: 1200,
				height: 630,
				alt: 'JasX AI Mock Interview Platform',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JasX AI Mock Interview Platform',
		description:
			'JasX helps you practice and prepare for real technical interviews using AI feedback and smart question generation.',
		images: [
			'https://d12araoe7z5xxk.cloudfront.net/og-images/mock-interview.jpg',
		],
		creator: '@jasur_khaitov',
	},
	alternates: {
		canonical: 'https://jasx.vercel.app',
	},
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				cz-shortcut-listen='true'
				className={`${monaSans.className} ${montserrat.className} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
