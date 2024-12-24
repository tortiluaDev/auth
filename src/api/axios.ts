import axios, { CreateAxiosDefaults } from 'axios'
import Cookies from 'js-cookie'

import { API_URL } from '@/constants/constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)

axiosClassic.interceptors.request.use(
	options => {
		const token = Cookies.get('accessToken')
		if (token) {
			options.headers.Authorization = `Bearer ${token}`
		}
		return options
	},
	error => {
		return console.log(error)
	}
)

export default axiosClassic
