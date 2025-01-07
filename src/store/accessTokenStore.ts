import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAccessTokenStore {
	accessToken: string
	saveToken: (token: string) => void
	removeToken: () => void
}

export const useAccessTokenStore = create<IAccessTokenStore>()(
	persist(
		set => ({
			accessToken: '',
			saveToken: token => set({ accessToken: token }),
			removeToken: () => set({ accessToken: '' })
		}),
		{
			name: 'accessToken-storage'
		}
	)
)
