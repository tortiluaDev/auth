import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserStore {
	user: IUser
	setUser: (email: string, password: string) => void
	removeUser: () => void
}

interface IUser {
	email: string
	password: string
}

export const useUserStore = create<IUserStore>()(
	persist(
		set => ({
			user: {
				email: '',
				password: ''
			},
			setUser: (email, password) => set({ user: { email, password } }),
			removeUser: () => set({ user: { email: '', password: '' } })
		}),
		{
			name: 'user-storage'
		}
	)
)
