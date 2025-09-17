import Agent from '@/components/Agent'
import { Badge } from '@/components/ui/badge'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { Activity } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function InterviewPage() {
	const user = await getCurrentUser()

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<>
			<div className='flex items-center justify-between mb-8'>
				<div className='flex items-center gap-3'>
					<Activity className='text-primary' />

					<h1 className='text-xl font-semibold'>
						Frontend Developer Interview
					</h1>
				</div>
				<Badge variant={'destructive'}>Technical Interview</Badge>
			</div>

			<Agent userId={user.id} userName={user?.name} type="generate" />
		</>
	)
}
