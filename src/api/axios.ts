import axios, { CreateAxiosDefaults, isAxiosError } from 'axios'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

import { API_URL } from '@/constants/constants'

import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

async function refreshTokenFn() {
	const accessToken = Cookies.get('accessToken')
	if (typeof accessToken === 'string') {
		const res = await authService.refresh()
		if (res.data?.accessToken) {
			Cookies.set('accessToken', res.data?.accessToken)
			console.log('new access token!')
			authService.privateRoute()
			console.log('Запрос на получение доступа к странице отправлен')
			return true
		} else {
			console.log(`Error: ${res}. \nAccess token has not been replaced`)
			return false
		}
	} else return false
}

axiosClassic.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')
	if (window.location.pathname === '/account' && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
		return config
	} else return config
})

axiosClassic.interceptors.response.use(
	res => {
		console.log(`Статус ответа: ${res.status} \nСообщение: ${res.statusText}`)
		return res
	},
	error => {
		if (isAxiosError(error)) {
			if (error.status === 403) {
				console.log('Интерцептор сработал, это ошибка 403')
				refreshTokenFn()
					.then(res => {
						console.log('Сработала функция refreshTokenFn')
						return res
					})
					.then(isTokenUpdated => {
						if (!isTokenUpdated) console.log('Ошибка, страница не перезагрузилась')
					})
					.catch(err => console.log(err))
			} else if (
				(error.status === 401 || error.status === 400) &&
				window.location.pathname === '/account'
			) {
				console.log('Ошибка 400/401')
				redirect('/auth')
			} else console.log('Ошибка Axios, но не 403')
		} else console.log(`Ошибка: ${error}`)
	}
)

export default axiosClassic
