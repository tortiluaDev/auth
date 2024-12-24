'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import styles from './auth-form.module.scss'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)

	return (
		<div className={styles.auth}>
			<p>Авторизация</p>
			<div>
				<button
					onClick={() => setIsLogin(true)}
					className={isLogin ? twMerge(styles.btn1, 'text-secondary') : styles.btn1}
				>
					Войти
				</button>
				<button
					onClick={() => setIsLogin(false)}
					className={!isLogin ? twMerge(styles.btn2, 'text-secondary') : styles.btn2}
				>
					Зарегистрироваться
				</button>
			</div>
			<form action=''>
				<input
					type='text'
					className={styles.inp1}
					placeholder='Введите электронную почту'
				/>
				<input
					type='password'
					className={styles.inp2}
					placeholder='Введите пароль'
				/>
				<button>Отправить</button>
			</form>
		</div>
	)
}
