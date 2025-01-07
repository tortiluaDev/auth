import { useAccessTokenStore } from '@/store/accessTokenStore'

import { authService } from '@/services/auth.service'

export function useRedirectWithoutToken() {
	const removeAccessToken = useAccessTokenStore(state => state.removeToken)
	const token = useAccessTokenStore(state => state.accessToken)

	const isValidToken = () => {
		if (!token) return false
		else {
			async function verifyFn() {
				const verify = await authService.verify({ token })
				if (!verify.data?.valid) removeAccessToken()
				return verify
			}
			verifyFn()
			return true
		}
	}

	return isValidToken()
}
