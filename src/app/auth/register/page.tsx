import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Auth } from '../Auth'

export const metadata: Metadata = {
	title: 'auth register',
	...NO_INDEX_PAGE
}

export default function RegisterPage() {
	return <Auth isLoginPage={false} />
}
