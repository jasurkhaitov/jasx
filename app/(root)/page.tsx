'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '@/components/theme/theme-toggle'

export default function BrowsePage() {
	const router = useRouter()
	return (
		<div className='overflow-x-hidden min-h-screen max-w-7xl m-auto px-4 bg-background'>
			<header className='md:py-1 px-3 md:px-5 w-full border-b fixed left-0 top-0 z-40 py-1 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
				<div className='flex h-16 max-w-7xl m-auto items-center justify-between'>
					<Link href='/' className='flex items-center space-x-2'>
						<Brain className='h-8 w-8 text-primary' />
						<span className='font-bold font-monospace text-xl'>JasX</span>
					</Link>

					<div className='flex items-center justify-between space-x-3'>
						<ModeToggle />
						<Button
							className='hidden xs:block'
							onClick={() => router.push('/sign-in')}
							variant='outline'
						>
							Sign in
						</Button>
						<Button
							className='hidden xs:block'
							onClick={() => router.push('/sign-up')}
						>
							Start Free
						</Button>
					</div>
				</div>
			</header>

			<section className='relative pt-48 pb-32'>
				<div className='px-0 sm:px-4 md:px-6'>
					<div className='flex flex-col items-center space-y-4 text-center'>
						<div className='space-y-2'>
							<Badge className='mb-4'>AI-Powered Interview Prep</Badge>
							<h1 className='text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl/none text-balance'>
								Job Interview with{' '}
								<span className='text-primary'>AI-Powered Prep</span>
							</h1>
							<p className='mx-auto max-w-[700px] mb-3 text-muted-foreground text-sm md:text-base text-pretty'>
								Master your interview skills with personalized AI coaching,
								realistic mock interviews, and instant feedback. Land your dream
								job with confidence.
							</p>
						</div>
						<div className='flex flex-col gap-2 min-[400px]:flex-row'>
							<Button size='lg' asChild>
								<Link href='/sign-up'>Get Started Free</Link>
							</Button>
							<Button variant='outline' size='lg' asChild>
								<Link href='/sign-in'>Sign In</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section className='pt-32 pb-18 border-y'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter lg:text-4xl/none text-balance'>
							Everything You Need to Succeed
						</h2>
						<p className='max-w-[900px] text-muted-foreground text-sm md:text-base text-pretty'>
							Our AI-powered platform provides comprehensive interview
							preparation tools designed to boost your confidence and
							performance.
						</p>
					</div>
				</div>

				<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
					<Card className='relative overflow-hidden'>
						<CardHeader>
							<Brain className='h-12 w-12 text-primary mb-4' />
							<CardTitle>Take Interview with AI</CardTitle>
							<CardDescription>
								Practice with our advanced AI interviewer that adapts to your
								industry and role
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className='space-y-2 text-sm'>
								<li className='flex items-center gap-2'>
									<CheckCircle className='h-4 w-4 text-primary' />
									Industry-specific questions
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle className='h-4 w-4 text-primary' />
									Real-time conversation
								</li>
								<li className='flex items-center gap-2'>
									<CheckCircle className='h-4 w-4 text-primary' />
									Unlimited practice sessions
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className='py-24 border-y'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter lg:text-4xl/none text-balance'>
							Ready to Ace Your Next Interview ?
						</h2>
						<p className='max-w-[900px] text-muted-foreground text-sm md:text-base text-pretty'>
							Join thousands of professionals who have landed their dream jobs
							with JasX
						</p>
					</div>
					<div className='flex flex-col gap-2 min-[400px]:flex-row'>
						<Button asChild>
							<Link href='/sign-up'>Start Free Trial</Link>
						</Button>
						<Button variant='outline' asChild>
							<Link href='/sign-in'>Sign In</Link>
						</Button>
					</div>
				</div>
			</section>

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
