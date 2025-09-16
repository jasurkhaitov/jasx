import { ModeToggle } from '@/components/theme/theme-toggle'
import { UserNav } from '@/components/UserNav'
import { Brain } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function InterviewLayout({
	children,
}: {
	children: React.ReactNode
}) {
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

			<div className='pt-32 pb-10'>{children}</div>
		</div>
	)
}
