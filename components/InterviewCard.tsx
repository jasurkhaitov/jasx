import dayjs from 'dayjs'
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface InterviewCardProps {
	id: string
	userId: string
	role: string
	type: string
	techstack: string[]
	createdAt: string
}

interface Feedback {
	totalScore: number
	finalAssessment: string
	createdAt: string
}

const InterviewCard = ({
	id,
	role,
	type,
	techstack,
	createdAt,
}: InterviewCardProps) => {
	const feedback = null as Feedback | null
	const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
	const formattedDate = dayjs(
		feedback?.createdAt || createdAt || Date.now()
	).format('MMM D, YYYY')

	return (
		<Card className='min-h-72 flex flex-col justify-between'>
			<CardHeader>
				<div className='flex justify-between items-start gap-3'>
					<CardTitle className='capitalize'>{role} Interview</CardTitle>
					<Badge variant='destructive'>{normalizedType}</Badge>
				</div>
				<CardDescription>
					<Image
						src={getRandomInterviewCover()}
						alt='cover image'
						width={70}
						height={70}
						className='rounded-full size-[70px] mt-2'
					/>
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-3'>
				<div className='flex flex-row gap-5 text-sm text-muted-foreground'>
					<div className='flex flex-row gap-2 items-center'>
						<Image src='/calendar.svg' alt='calendar' width={20} height={20} />
						<p>{formattedDate}</p>
					</div>
					<div className='flex flex-row gap-2 items-center'>
						<Image src='/star.svg' alt='star' width={20} height={20} />
						<p>{feedback?.totalScore ?? Math.floor(Math.random() * 100)}/100</p>
					</div>
				</div>

				<p className='text-sm'>
					{feedback?.finalAssessment ||
						"You haven't taken the interview yet. Take it now to improve your skills."}
				</p>
			</CardContent>

			<CardFooter className='flex justify-between items-center'>
				<DisplayTechIcons techStack={techstack} />
				<Button asChild className='text-white'>
					<Link
						href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
					>
						{feedback ? 'Check Feedback' : 'View Interview'}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export default InterviewCard
