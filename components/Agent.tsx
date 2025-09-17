'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import { interviewer } from '@/constants'
import { createFeedback } from '@/lib/actions/general.action'
import { Card } from './ui/card'
import { Button } from './ui/button'

enum CallStatus {
	INACTIVE = 'INACTIVE',
	CONNECTING = 'CONNECTING',
	ACTIVE = 'ACTIVE',
	FINISHED = 'FINISHED',
}

interface SavedMessage {
	role: 'user' | 'system' | 'assistant'
	content: string
}

export default function Agent({
	userName,
	userId,
	interviewId,
	feedbackId,
	type,
	questions,
}: AgentProps) {
	const router = useRouter()
	const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
	const [messages, setMessages] = useState<SavedMessage[]>([])
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [lastMessage, setLastMessage] = useState<string>('')

	useEffect(() => {
		const onCallStart = () => {
			setCallStatus(CallStatus.ACTIVE)
		}

		const onCallEnd = () => {
			setCallStatus(CallStatus.FINISHED)
		}

		const onMessage = (message: Message) => {
			if (message.type === 'transcript' && message.transcriptType === 'final') {
				const newMessage = { role: message.role, content: message.transcript }
				setMessages(prev => [...prev, newMessage])
			}
		}

		const onSpeechStart = () => {
			console.log('speech start')	
			setIsSpeaking(true)
		}

		const onSpeechEnd = () => {
			console.log('speech end')
			setIsSpeaking(false)
		}

		const onError = (error: Error) => {
			console.log('Error:', error)
		}

		vapi.on('call-start', onCallStart)
		vapi.on('call-end', onCallEnd)
		vapi.on('message', onMessage)
		vapi.on('speech-start', onSpeechStart)
		vapi.on('speech-end', onSpeechEnd)
		vapi.on('error', onError)

		return () => {
			vapi.off('call-start', onCallStart)
			vapi.off('call-end', onCallEnd)
			vapi.off('message', onMessage)
			vapi.off('speech-start', onSpeechStart)
			vapi.off('speech-end', onSpeechEnd)
			vapi.off('error', onError)
		}
	}, [])

	useEffect(() => {
		if (messages.length > 0) {
			setLastMessage(messages[messages.length - 1].content)
		}

		const handleGenerateFeedback = async (messages: SavedMessage[]) => {
			console.log('handleGenerateFeedback')

			const { success, feedbackId: id } = await createFeedback({
				interviewId: interviewId!,
				userId: userId!,
				transcript: messages,
				feedbackId,
			})

			if (success && id) {
				router.push(`/interview/${interviewId}/feedback`)
			} else {
				console.log('Error saving feedback')
				router.push('/')
			}
		}

		if (callStatus === CallStatus.FINISHED) {
			if (type === 'generate') {
				router.push('/')
			} else {
				handleGenerateFeedback(messages)
			}
		}
	}, [messages, callStatus, feedbackId, interviewId, router, type, userId])

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING)

		if (type === 'generate') {
			await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
				variableValues: {
					username: userName,
					userid: userId,
				},
			})
		} else {
			let formattedQuestions = ''
			if (questions) {
				formattedQuestions = questions
					.map(question => `- ${question}`)
					.join('\n')
			}

			await vapi.start(interviewer, {
				variableValues: {
					questions: formattedQuestions,
				},
			})
		}
	}

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED)
		vapi.stop()
	}

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
						isSpeaking ? 'bg-card' : 'bg-transparent'
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
						{isSpeaking && (
							<span className='absolute inline-flex h-24 w-24 rounded-full bg-blue-400 opacity-75 animate-ping' />
						)}
					</div>
					<h3 className='text-xl font-mono font-semibold'>{userName} (You)</h3>
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
					<Button className='relative' onClick={() => handleCall()}>
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
					<Button
						onClick={() => handleDisconnect()}
						className='bg-red-700 hover:bg-red-800'
					>
						End
					</Button>
				)}
			</div>
		</div>
	)
}
