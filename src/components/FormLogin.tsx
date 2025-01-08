import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAccessTokenStore } from '@/store/accessTokenStore'
import { useUserStore } from '@/store/userStore'

import { notificationError, notificationSuccess } from '@/utils/toast'

import { IAuthForm } from '../app/auth/auth-form.types'

import { authService } from '@/services/auth.service'

import styles from '../app/auth/auth-form.module.scss'

export function FormLogin() {
	const router = useRouter()
	const saveUserData = useUserStore(state => state.setUser)
	const removeUserData = useUserStore(state => state.removeUser)
	const saveAccessToken = useAccessTokenStore(state => state.saveToken)
	const { register, handleSubmit, formState, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: async (user: IAuthForm) => authService.main('login', user, saveAccessToken),
		onSuccess: () => {
			notificationSuccess('Вы успешно вошли!')
			router.push('/')
		},
		onError: error => {
			removeUserData()
			notificationError(
				`Ошибка: ${error.message.includes('401') ? 'Неверные данные' : 'Попробуйте еще раз'}`
			)
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

	const emailError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

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
			{!isPending ? (
				<button type='submit'>Отправить</button>
			) : (
				<button
					type='submit'
					disabled
				>
					Загрузка...
				</button>
			)}
		</form>
	)
}
