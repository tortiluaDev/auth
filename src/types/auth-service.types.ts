export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export interface IUser {
	email: string
	password: string
}

export interface IAuthResData {
	accessToken: string
}

export interface ILogoutData {
	message: string
}

export interface IRefresh {
	message?: string
	accessToken?: string
}

export interface IVerify {
	message?: string
	valid?: boolean
	user?: IUser
}

export interface IPrivateRoute {
	message: string
	user?: {
		id: string
		email: string
		iat: string
		exp: string
	}
}

export interface IChangePassword {
	message: string
}
