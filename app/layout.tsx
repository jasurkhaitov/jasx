import type { Metadata } from 'next'
import { Mona_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
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
	title: 'AI Mock Interview Platform',
	description:
		'An AI-powered mock interview platform for preparing for your next job interview',
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
