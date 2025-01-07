import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import { useAccessTokenStore } from '@/store/accessTokenStore'
import { useUserStore } from '@/store/userStore'

import { notificationError, notificationSuccess } from '@/utils/toast'

import { authService } from '@/services/auth.service'

export default function Home() {
	const router = useRouter()

	const removeAccessToken = useAccessTokenStore(state => state.removeToken)

	const user = useUserStore(state => state.user)
	const removeUserData = useUserStore(state => state.removeUser)

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: async () => authService.logout(removeAccessToken),
		onSuccess: () => {
			notificationSuccess('Вы успешно вышли!')
			router.push('/')
		},
		onError: () => {
			notificationError('Ошибка, попробуйте еще раз')
		}
	})

	function eventClickHandlerLogout() {
		mutate()
		removeUserData()
	}

	return (
		<div className='text-center mt-16 border-border border-2 mx-auto py-4'>
			<h1 className='text-5xl font-bold mb-4'>{!user.email ? 'Гость' : user.email}</h1>
			{user.email && !isPending ? (
				<button
					className='ml-8 bg-slate-50 text-bg px-2 py-1 font-bold'
					onClick={() => eventClickHandlerLogout()}
				>
					Выйти из аккаунта
				</button>
			) : (
				<Link
					href='/auth'
					className='text-3xl hover:text-4xl transition'
				>
					Перейти к авторизации
				</Link>
			)}
			<button
				className='text-3xl hover:text-4xl transition ml-12'
				onClick={() => {
					return user.password.length > 0 ? redirect('/account') : router.push('/auth')
				}}
			>
				В личный кабинет
			</button>
		</div>
	)
}
