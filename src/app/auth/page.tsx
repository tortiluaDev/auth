import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Auth } from '@/app/auth/Auth'

export const metadata: Metadata = {
	title: 'auth',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Auth />
}
