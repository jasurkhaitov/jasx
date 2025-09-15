import { getCurrentUser } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getCurrentUser()
	if (user) redirect('/dashboard')
	return <div>{children}</div>
}
