import { ToastOptions, toast } from 'react-toastify'

const notifyConfig: ToastOptions = {
	position: 'top-right',
	autoClose: 1200,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'dark'
}

export function notificationSuccess(message: string) {
	toast.success(message, notifyConfig)
}

export function notificationError(message: string) {
	toast.error(message, notifyConfig)
}
