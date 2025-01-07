import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Account } from './Account'

export const metadata: Metadata = {
	title: 'Account page',
	...NO_INDEX_PAGE
}

export default async function AccountPage() {
	return <Account />
}
