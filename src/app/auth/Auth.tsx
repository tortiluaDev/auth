'use client'

import { useForm } from 'react-hook-form'

export function Auth() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<IAuthForm>({ mode: 'onChange' })

	return (
		<div>
			Авторизация
			<button>Войти</button>
			<button>Зарегистрироваться</button>
			<form action=''>
				<input type='text' />
				<input type='text' />
				<button>Готово</button>
			</form>
		</div>
	)
}
