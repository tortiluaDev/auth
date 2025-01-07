import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAccessTokenStore } from '@/store/accessTokenStore'
import { useUserStore } from '@/store/userStore'

import { notificationError, notificationSuccess } from '@/utils/toast'

import { IAuthForm } from '../auth-form.types'

import { authService } from '@/services/auth.service'

import styles from '../auth-form.module.scss'

export function FormRegister() {
	const [passwordsIsMatch, setPasswordsIsMatch] = useState(true)
	const router = useRouter()
	const saveUserData = useUserStore(state => state.setUser)
	const removeUserData = useUserStore(state => state.removeUser)
	const saveAccessToken = useAccessTokenStore(state => state.saveToken)

	const { register, handleSubmit, formState, reset, watch } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: async (user: IAuthForm) => authService.main('register', user, saveAccessToken),
		onSuccess: () => {
			router.push('/')
			notificationSuccess('Вы успешно вошли!')
		},
		onError: () => {
			removeUserData()
			notificationError(`Ошибка: Пользователь уже существует`)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate({
			email: data.email,
			password: data.password
		})
		saveUserData(data.email, data.password)

		reset()
	}

	const passwordWatch = watch('password')
	const confirmPasswordWatch = watch('confirmPassword')
	const emailError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message
	const confirmPasswordError = formState.errors.confirmPassword?.message

	useEffect(() => {
		if (confirmPasswordWatch === passwordWatch) setPasswordsIsMatch(true)
		else setPasswordsIsMatch(false)
	}, [confirmPasswordWatch, passwordWatch, passwordsIsMatch])

	return (
		<form
			action=''
			onSubmit={handleSubmit(onSubmit)}
		>
			{emailError && <p className={styles.error}>{emailError}</p>}
			<input
				type='text'
				className={styles.inp1}
				placeholder='Введите электронную почту'
				{...register('email', {
					required: 'Это поле обязательно для заполнения!',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
						message: 'Некорректный email'
					}
				})}
			/>
			{passwordError && <p className={styles.error}>{passwordError}</p>}
			<input
				type='password'
				className={styles.inp1}
				placeholder='Введите пароль'
				{...register('password', { required: 'Это поле обязательно для заполнения' })}
			/>
			{confirmPasswordError && <p className={styles.error}>{confirmPasswordError}</p>}
			{!passwordsIsMatch && <p className={styles.error}>Пароли не совпадают</p>}
			<input
				type='password'
				className={styles.inp2}
				placeholder='Повторите пароль'
				{...register('confirmPassword', { required: 'Это поле обязательно для заполнения' })}
			/>
			{passwordsIsMatch && !isPending ? (
				<button type='submit'>Отправить</button>
			) : (
				<button
					type='submit'
					disabled
					className='text-primaryActive transition'
				>
					Отправить
				</button>
			)}
		</form>
	)
}
