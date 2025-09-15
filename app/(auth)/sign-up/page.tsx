'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Brain, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUp } from '@/lib/actions/auth.action'

const signUpSchema = z.object({
	fullName: z.string().min(3, 'Full name must be at least 3 characters'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: SignUpFormData) => {
		setIsLoading(true)
		try {
			const { email, fullName, password } = data

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user

			const result = await signUp({
				uid: user.uid,
				name: fullName,
				email,
				password,
			})

			if (!result.success) {
				toast.error(result.message)
				return
			}

			toast.success('Account created successfully!', {
				description: 'Welcome! You can now sign in.',
			})
			router.push('/sign-in')
		} catch (error: unknown) {
			const errMsg = error instanceof Error ? error.message : 'Unknown error'
			toast.error(`Something went wrong: ${errMsg}`)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<Card className='w-full bg-background max-w-md'>
				<CardHeader className='space-y-1 text-center'>
					<Link href='/' className='flex items-center space-x-2 justify-center'>
						<Brain className='h-8 w-8 text-primary' />
					</Link>

					<CardTitle className='text-2xl font-bold'>
						Create your account
					</CardTitle>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='fullName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<div className='relative'>
												<User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
												<Input
													placeholder='Enter your full name'
													className='pl-10'
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<div className='relative'>
												<Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
												<Input
													type='email'
													placeholder='Enter your email'
													className='pl-10'
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className='relative'>
												<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
												<Input
													type={showPassword ? 'text' : 'password'}
													placeholder='Create a password'
													className='pl-10 pr-10'
													{...field}
												/>
												<button
													type='button'
													onClick={() => setShowPassword(!showPassword)}
													className='absolute cursor-pointer right-3 top-3 text-muted-foreground hover:text-foreground transition-colors'
												>
													{showPassword ? (
														<EyeOff className='h-4 w-4' />
													) : (
														<Eye className='h-4 w-4' />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type='submit'
								className='w-full mt-1'
								disabled={isLoading}
							>
								{isLoading ? 'Creating account...' : 'Create Account'}
							</Button>
						</form>
					</Form>

					<div className='mt-3 text-center text-sm'>
						<span className='text-muted-foreground'>
							Already have an account?{' '}
						</span>
						<Link
							href='/sign-in'
							className='text-primary hover:underline font-medium'
						>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
