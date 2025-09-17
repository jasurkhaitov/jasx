'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { signOut } from '@/lib/actions/auth.action'

type User = {
	name?: string | null
	email?: string | null
}

export function UserNav({ user }: { user: User | null }) {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await signOut()
			toast.success('Signed out successfully')
			router.push('/sign-in')
		} catch (error) {
			console.error(error)
			toast.error('Failed to log out')
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src='/user-avatar.png' alt='User' />
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>
							{user?.name ?? 'Guest'}
						</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user?.email ?? 'Not signed in'}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{user && (
					<DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
						<LogOut className='mr-2 h-4 w-4' />
						<span>Log out</span>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
