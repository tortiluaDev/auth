export interface IAuthData {
	email: string
	password: string
}

export interface IAuthForm extends IAuthData {
	confirmPassword?: string
}
