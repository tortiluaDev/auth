'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { useUserStore } from '@/store/userStore'

import { authService } from '@/services/auth.service'

export function Account() {
	const user = useUserStore(state => state.user)

	const { isLoading, isError } = useQuery({
		queryKey: ['account'],
		queryFn: async () => authService.privateRoute()
	})

	if (isLoading) return <p>Данные загружаются...</p>

	if (isError && user.password.length < 1)
		return <p>{`Возникла ошибка.\nПожалуйста, перезагрузите страницу`}</p>

	return (
		<div className='border rounded-sm border-primary font-semibold text-3xl w-2/3 m-auto px-10 py-20'>
			<h1 className='pb-4'>Ваш профиль</h1>
			<h2>почта: {user.email}</h2>
			<h2 className='pb-2'>пароль: {user.password}</h2>
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
