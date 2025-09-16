import { ModeToggle } from '@/components/theme/theme-toggle'
import { UserNav } from '@/components/UserNav'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getCurrentUser()

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<div className='overflow-x-hidden min-h-screen max-w-7xl m-auto px-4 bg-background'>
			<header className='md:py-1 px-3 md:px-5 w-full border-b fixed left-0 top-0 z-40 py-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='flex h-16 max-w-7xl m-auto items-center justify-between'>
					<Link href='/' className='flex items-center space-x-2'>
						<Brain className='h-8 w-8 text-primary' />
						<span className='font-bold font-monospace text-xl'>JasX</span>
					</Link>

					<div className='flex items-center justify-between space-x-5'>
						<ModeToggle />
						<UserNav />
					</div>
				</div>
			</header>

			<div className='pt-32 pb-32'>{children}</div>

			<footer className='border-t hidden sm:block bg-background/50 backdrop-blur-md'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center h-16'>
						<Link href='/' className='flex items-center space-x-2'>
							<Brain className='h-8 w-8 text-primary' />
							<span className='font-bold font-monospace text-xl'>JasX</span>
						</Link>

						<div className='flex items-center text-sm text-gray-400 sm:border-l sm:border-gray-800 sm:pl-4 sm:ml-4'>
							<span className='font-montserrat'>
								2025 © JasX. All rights reserved —
							</span>
							<a
								href='https://t.me/jasurkhaitov'
								target='_blank'
								rel='noopener noreferrer'
								className='ml-1 text-blue-500 hover:text-gray-300 transition-colors'
							>
								@jasurkhaitov
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
