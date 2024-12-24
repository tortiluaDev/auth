import Link from 'next/link'

export default function Home() {
	return (
		<div className='text-center mt-16 border-border border-2 mx-auto py-4'>
			<h1 className='text-5xl font-bold mb-4'>Гость</h1>
			<Link
				href='/auth'
				className='text-3xl hover:text-4xl transition'
			>
				Перейти к авторизации
			</Link>
		</div>
	)
}
