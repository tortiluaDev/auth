import Cookies from 'js-cookie'

import { PAGE } from '@/constants/pages.constants'

import axiosClassic from '@/api/axios'

import {
	IAuthResData,
	ILogoutData,
	IPrivateRoute,
	IRefresh,
	IUser
} from '@/types/auth-service.types'

class AuthService {
	private _AUTH = '/auth'

	async main(type: 'login' | 'register', data: IUser, saveAccessToken: (token: string) => void) {
		const response = await axiosClassic.post<IAuthResData>(`${PAGE.AUTH}/${type}`, data)

		if (response.data.accessToken) {
			Cookies.set('accessToken', response.data.accessToken)
			saveAccessToken(response.data.accessToken)
		}

		return response
	}

	async logout(removeAccessToken: () => void) {
		const response = await axiosClassic.post<ILogoutData>(`${PAGE.AUTH}/logout`)

		if (response.data.message) {
			removeAccessToken()
			Cookies.remove('accessToken')
		}

		return response.data
	}

	async verify(accessToken: { token: string }) {
		const response = await axiosClassic.post(`${PAGE.AUTH}/verify`, accessToken)

		return response
	}

	async refresh() {
		const response = await axiosClassic.post<IRefresh>(`${PAGE.AUTH}/refresh`)

		return response
	}

	async privateRoute() {
		const response = await axiosClassic.get<IPrivateRoute>('/protected-route')

		return response
	}
}

export const authService = new AuthService()
