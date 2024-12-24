import axios, { CreateAxiosDefaults } from 'axios'

import { API_URL } from '@/constants/constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000
}

export const axiosClassic = axios.create(options)
