'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { Brain, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/client'

import { signIn } from '@/lib/actions/auth.action'

const signInSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(1, 'Password is required'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()

	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: SignInFormData) => {
		setIsLoading(true)
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)
			const user = userCredential.user

			const idToken = await user.getIdToken()

			const result = await signIn({
				email: data.email,
				idToken,
			})

			if (!result.success) {
				toast.error(result.message || 'Failed to sign in')
				return
			}

			toast.success('Welcome back!', {
				description: 'You have successfully signed in to JasX.',
			})
			router.push('/dashboard')
		} catch (error) {
			console.error(error)
			toast.error('Sign in failed', {
				description: 'Please check your credentials and try again.',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<Card className='w-full max-w-md bg-background rounded-sm'>
				<CardHeader className='space-y-1 text-center'>
					<Link href='/' className='flex items-center space-x-2 justify-center'>
						<Brain className='h-8 w-8 text-primary' />
					</Link>
					<CardTitle className='text-2xl font-bold'>Welcome back</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl className='mt-1'>
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
										<FormControl className='mt-1'>
											<div className='relative'>
												<Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
												<Input
													type={showPassword ? 'text' : 'password'}
													placeholder='Enter your password'
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
								{isLoading ? 'Signing in...' : 'Sign In'}
							</Button>
						</form>
					</Form>

					<div className='mt-3 text-center text-sm'>
						<span className='text-muted-foreground'>
							Don&apos;t have an account?{' '}
						</span>
						<Link
							href='/sign-up'
							className='text-primary hover:underline font-medium'
						>
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
