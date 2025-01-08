import { motion } from 'framer-motion'

export function SkeletonLoaderAccount() {
	const color = 'linear-gradient(90deg, #616161 25%, #c4c4c2 50%, #616161 75%)'
	const size = '200% 100%'
	const gradientStyleBorder = {
		border: color,
		borderSize: size
	}
	const gradientStyleBg = {
		background: color,
		backgroundSize: size
	}
	const animate = { backgroundPosition: ['-200% 0', '200% 0'] }
	const transition = { duration: 2, repeat: Infinity }

	return (
		<motion.div
			className='border mt-20 rounded-sm w-2/3 m-auto px-10 py-20'
			style={gradientStyleBorder}
			animate={animate}
			transition={{ duration: 1.5, repeat: Infinity }}
		>
			<motion.div
				style={gradientStyleBg}
				animate={animate}
				transition={transition}
				className='p-4 bg-slate-400 w-2/3'
			/>
			<motion.div
				style={gradientStyleBg}
				animate={animate}
				transition={transition}
				className='p-2 bg-slate-400 w-1/2 mt-8'
			/>
			<motion.div
				style={gradientStyleBg}
				animate={animate}
				transition={transition}
				className='p-2 bg-slate-400 w-1/2 mt-4'
			/>
			<motion.div
				style={gradientStyleBg}
				animate={animate}
				transition={transition}
				className='mt-10 p-7 bg-slate-400 w-4/5'
			/>
		</motion.div>
	)
}
