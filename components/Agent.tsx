import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

enum CallStatus {
	INACTIVE = 'INACTIVE',
	CONNECTING = 'CONNECTING',
	ACTIVE = 'ACTIVE',
	FINISHED = 'FINISHED',
}

export default function Agent({ name }: { name: string }) {
	const isSpeaking = true
	const isUserSpeaking = true

	const callStatus = CallStatus.FINISHED

	const messages = [
		'Whats your name?',
		'My name is John Doe, nice to meet you!',
	]
	const lastMessage = messages[messages.length - 1]

	return (
		<div className='px-0 sm:px-4'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
				<Card
					className={`shadow-none rounded-md p-8 text-center h-80 flex flex-col gap-5 justify-between ${
						isSpeaking ? 'bg-card' : 'bg-transparent'
					}`}
				>
					<div className='relative w-auto h-full mx-auto p-5 flex-1 flex items-center justify-center'>
						<Image
							src='/black-avatar.webp'
							alt='AI Image'
							width={96}
							height={96}
							className='w-24 h-24 rounded-full object-cover relative z-10'
						/>

						{isSpeaking && (
							<span className='absolute inline-flex h-24 w-24 rounded-full bg-blue-400 opacity-75 animate-ping' />
						)}
					</div>
					<h3 className='text-xl font-mono font-semibold'>AI Interviewer</h3>
				</Card>

				<Card
					className={`shadow-none rounded-md p-8 text-center h-80 flex flex-col gap-5 justify-between ${
						isUserSpeaking ? 'bg-card' : 'bg-transparent'
					}`}
				>
					<div className='w-auto h-full relative mx-auto p-5 flex-1 flex items-center justify-center'>
						<Image
							src='/user-avatar.png'
							alt='Adrian'
							width={96}
							height={96}
							className='w-24 h-24 rounded-full object-cover'
						/>
						{isUserSpeaking && (
							<span className='absolute inline-flex h-24 w-24 rounded-full bg-blue-400 opacity-75 animate-ping' />
						)}
					</div>
					<h3 className='text-xl font-mono font-semibold'>{name} (You)</h3>
				</Card>
			</div>

			{messages.length > 0 && (
				<div className='border p-3 rounded-md mb-5 text-center'>
					<p
						className={cn(
							'transition-opacity text-base font-mono text-green-600 duration-500 opacity-0',
							'animate-fadeIn opacity-100'
						)}
					>
						{lastMessage}
					</p>
				</div>
			)}

			<div className='w-full flex justify-center'>
				{callStatus !== CallStatus.ACTIVE ? (
					<Button className='relative'>
						<span
							className={cn(
								'absolute animate-ping rounded-full opacity-75',
								callStatus !== CallStatus.CONNECTING && 'hidden'
							)}
						/>

						<span>
							{callStatus === CallStatus.INACTIVE ||
							callStatus === CallStatus.FINISHED
								? 'Call'
								: '. . . '}
						</span>
					</Button>
				) : (
					<Button className='bg-red-700 hover:bg-red-800'>End</Button>
				)}
			</div>
		</div>
	)
}
