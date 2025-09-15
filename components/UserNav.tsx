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
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { signOut } from '@/lib/actions/auth.action'

export function UserNav() {
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
						<p className='text-sm font-medium leading-none'>John Doe</p>
						<p className='text-xs leading-none text-muted-foreground'>
							john@example.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onClick={() => router.push('/profile')}
				>
					<User className='mr-2 h-4 w-4' />
					<span>Profile</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
