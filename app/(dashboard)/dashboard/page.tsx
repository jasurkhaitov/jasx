import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DashboardPage() {
	return (
		<>
			<section className='flex bg-gradient-to-b flex-col md:flex-row items-center justify-between gap-8 rounded-lg p-5 sm:p-8'>
				<div className='flex flex-col gap-4 max-w-lg'>
					<h2 className='text-2xl font-bold'>
						Get Interview-Ready with AI-Powered Practice & Feedback
					</h2>
					<p className='text-sm text-muted-foreground'>
						Practice on real interview questions & get instant feedback
					</p>

					<Button asChild className='w-full text-white sm:w-fit'>
						<Link href='/interview'>Start an Interview</Link>
					</Button>
				</div>

				<Image
					src='/robot.png'
					alt='robo-dude'
					width={400}
					height={400}
					className='hidden sm:block'
				/>
			</section>
		</>
	)
}
