export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

class AuthService {
	private _AUTH = '/auth'
}

export const authService = new AuthService()
