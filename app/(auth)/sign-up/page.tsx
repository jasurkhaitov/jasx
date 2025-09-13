'use client'

import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { Brain, Upload, FileText, User } from 'lucide-react'

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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const signUpSchema = z.object({
	fullName: z.string().min(3, 'Full name must be at least 3 characters'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	profilePicture: z
		.any()
		.refine(files => files?.length === 1, 'Profile picture is required')
		.refine(
			files => files?.[0]?.type?.startsWith('image/'),
			'Only image files (PNG/JPG) are allowed'
		),
	resume: z
		.any()
		.refine(files => files?.length === 1, 'Resume is required')
		.refine(
			files => files?.[0]?.type === 'application/pdf',
			'Only PDF files are allowed'
		),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
	const [profilePreview, setProfilePreview] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	})

	const handleProfilePictureChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = e => {
				setProfilePreview(e.target?.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			setProfilePreview(null)
		}
	}

	const onSubmit = async (data: SignUpFormData) => {
		setIsLoading(true)

		try {
			await new Promise(resolve => setTimeout(resolve, 2000))

			toast('Account created successfully!', {
				description:
					'Welcome to JasX. You can now start practicing interviews.',
			})

			router.push('/sign-in')

			console.log('Form data:', {
				fullName: data.fullName,
				email: data.email,
				password: data.password,
				profilePicture: data.profilePicture[0]?.name,
				resume: data.resume[0]?.name,
			})
		} catch (error) {
			toast.error(`Something went wrong: ${error}`, {
				description: 'Please try again later.',
			})
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
											<Input
												type='email'
												placeholder='Enter your email'
												{...field}
											/>
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
											<Input
												type='password'
												placeholder='Create a password'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='profilePicture'
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								render={({ field: { onChange, value, ...field } }) => (
									<FormItem>
										<FormLabel>Profile Picture</FormLabel>
										<FormControl>
											<div className='space-y-2'>
												<div className='flex items-center gap-4'>
													<div className='relative'>
														<Input
															type='file'
															accept='image/*'
															onChange={e => {
																onChange(e.target.files)
																handleProfilePictureChange(e)
															}}
															className='hidden'
															id='profile-picture'
															{...field}
														/>
														<label
															htmlFor='profile-picture'
															className='flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer text-sm'
														>
															<Upload className='h-4 w-4' />
															Choose Image
														</label>
													</div>
													{profilePreview && (
														<div className='relative h-12 w-12 rounded-full overflow-hidden border-2 border-border'>
															<Image
																src={profilePreview || '/placeholder.svg'}
																alt='Profile preview'
																fill
																className='object-cover'
															/>
														</div>
													)}
												</div>
												<p className='text-xs text-muted-foreground'>
													Upload a PNG or JPG image
												</p>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='resume'
								render={({ field: { onChange, value, ...field } }) => (
									<FormItem>
										<FormLabel>Resume</FormLabel>
										<FormControl>
											<div className='space-y-2'>
												<div className='flex items-center gap-2'>
													<Input
														type='file'
														accept='.pdf'
														onChange={e => onChange(e.target.files)}
														className='hidden'
														id='resume'
														{...field}
													/>
													<label
														htmlFor='resume'
														className='flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer text-sm flex-1'
													>
														<FileText className='h-4 w-4' />
														{value?.[0]?.name || 'Choose PDF file'}
													</label>
												</div>
												<p className='text-xs text-muted-foreground'>
													Upload your resume as a PDF file
												</p>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Creating account...' : 'Create Account'}
							</Button>
						</form>
					</Form>

					<div className='mt-3 text-center text-sm'>
						<span className='text-muted-foreground'>
							Already have an account ?{' '}
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
