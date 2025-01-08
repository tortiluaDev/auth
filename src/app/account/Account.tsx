'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SkeletonLoaderAccount } from '@/components/SkeletonLoaderAccount'

import { useUserStore } from '@/store/userStore'

import { notificationSuccess } from '@/utils/toast'

import { authService } from '@/services/auth.service'

import styles from '../auth/auth-form.module.scss'

interface IAccountForm {
	oldPassword: string
	newPassword: string
}

export function Account() {
	const { register, handleSubmit, reset, formState } = useForm<IAccountForm>({
		mode: 'onChange'
	})
	const { mutate, isPending } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: async (passwords: IAccountForm) => authService.changePassword(passwords),
		onSuccess: (data, passwords) => {
			if (passwords.oldPassword === user.password) {
				setNewPassword(passwords.newPassword)
				setIsSubmit(false)
				notificationSuccess('Пароль был успешно изменен')
			} else passwordsMatch = true
		}
	})

	const oldPasswordError = formState.errors.oldPassword?.message
	const newPasswordError = formState.errors.newPassword?.message
	let passwordsMatch = false
	const [isSubmit, setIsSubmit] = useState(false)

	const user = useUserStore(state => state.user)
	const setNewPassword = useUserStore(state => state.setPassword)

	const onSubmit: SubmitHandler<IAccountForm> = formData => {
		mutate({ oldPassword: formData.oldPassword, newPassword: formData.newPassword })
		setIsSubmit(true)

		reset()
	}

	const { isLoading, isError } = useQuery({
		queryKey: ['account'],
		queryFn: async () => authService.privateRoute()
	})

	if (isLoading) return <SkeletonLoaderAccount />

	if (isError && user.password.length < 1) redirect('/auth')

	return (
		<div className='border mt-20 rounded-sm border-primary font-semibold text-3xl w-2/3 m-auto px-10 py-20 text-center'>
			<h1 className='pb-4'>Ваш профиль</h1>
			<h2>почта: {user.email}</h2>
			<h2 className='pb-2'>пароль: {user.password}</h2>
			<div className='mt-6'>
				<p className='text-lg'>Сменить пароль:</p>
				<form
					action=''
					className={styles.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					{oldPasswordError && <p className={styles.error}>{oldPasswordError}</p>}
					{!passwordsMatch && isSubmit && isPending && (
						<p className={styles.error}>Неправильный пароль</p>
					)}
					<input
						type='password'
						placeholder='Введите нынешний пароль'
						className={styles.inp1}
						{...register('oldPassword', {
							required: 'Это поле обязательно для заполнения'
						})}
					/>
					{newPasswordError && <p className={styles.error}>{newPasswordError}</p>}
					<input
						type='password'
						placeholder='Введите новый пароль'
						className={styles.inp1}
						{...register('newPassword', {
							required: 'Это поле обязательно для заполнения'
						})}
					/>
					{isPending ? (
						<button
							disabled
							type='submit'
						>
							Подтвердить
						</button>
					) : (
						<button type='submit'>Подтвердить</button>
					)}
				</form>
			</div>
			<div className='mt-10'>
				<Link href={'/'}>На главную</Link>
				<button
					className='bg-primary p-2 ml-8 text-lg'
					onClick={() => window.location.reload()}
				>
					Обновить данные
				</button>
			</div>
		</div>
	)
}
