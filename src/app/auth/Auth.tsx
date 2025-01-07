'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { PAGE } from '@/constants/pages.constants'

import { FormLogin } from '@/app/auth/FormLogin'
import { FormRegister } from '@/app/auth/register/FormRegister'

import styles from './auth-form.module.scss'

interface IProps {
	isLoginPage: boolean
}

export function Auth({ isLoginPage }: IProps) {
	const [isLogin, setIsLogin] = useState(isLoginPage)
	const router = useRouter()
	const pathname = usePathname()

	return (
		<div className={styles.auth}>
			<p>Авторизация</p>
			<div>
				<button
					onClick={() => {
						if (pathname === `${PAGE.REGISTER}`) router.push(`${PAGE.AUTH}`)
						setIsLogin(isLogin)
					}}
					className={isLogin ? twMerge(styles.btn1, 'text-secondary') : styles.btn1}
				>
					Войти
				</button>
				<button
					onClick={() => {
						if (pathname === `${PAGE.AUTH}`) router.push(`${PAGE.REGISTER}`)
						setIsLogin(isLogin)
					}}
					className={!isLogin ? twMerge(styles.btn2, 'text-secondary') : styles.btn2}
				>
					Зарегистрироваться
				</button>
			</div>
			{!isLoginPage ? <FormRegister /> : <FormLogin />}
		</div>
	)
}
