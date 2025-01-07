import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { useAccessTokenStore } from '@/store/accessTokenStore'

import { notificationError } from '@/utils/toast'

import { authService } from '@/services/auth.service'

export function useRefreshToken() {
	const setToken = useAccessTokenStore(state => state.saveToken)

	const { mutate } = useMutation({
		mutationKey: ['refresh'],
		mutationFn: async () => authService.refresh(),
		onSuccess: data => {
			if (data.data.accessToken) {
				Cookies.set('accessToken', data.data.accessToken)
				setToken(data.data.accessToken)
				console.log('new access token!')
				return true
			} else {
				console.log('Access token has not been replaced')
				return false
			}
		},
		onError: err => {
			notificationError(`Error: ${err.message}`)
		}
	})

	mutate()
	return 'response'
}
