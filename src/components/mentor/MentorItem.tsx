import { IMentorSingle } from '@/types/mentor.interface'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const MentorItem: FC<IMentorSingle> = ({ mentor }) => {
	const router = useRouter()

	return (
		<div
			className='bg-secondary w-[26rem] h-[33rem] p-[1.4rem] rounded-xl flex flex-col justify-between'
			onClick={() => router.push(`/mentor/${mentor.id}`)}
		>
			<div>
				<Image
					src={mentor.image}
					alt='mentor'
					className='w-full h-[12rem] mb-5 rounded-lg'
					width={368}
					height={197}
				/>
				<h6 className='text-xl mb-5'>{mentor.username}</h6>
				<p className='text-base text-little-text mb-5'>{mentor.position}</p>
				<div className='text-lg space-y-1'>
					<p>😎 {mentor.experience}</p>
					<p>💰 {mentor.price}</p>
					<p>{mentor.status ? '🟢 Активна' : '🔵 Не активен'}</p>
				</div>
			</div>
			<div>
				<button className='bg-paragraph rounded-[140px] text-secondary py-1 px-3'>
					{mentor.specialization.map(specialization => specialization)}
				</button>
			</div>
		</div>
	)
}

export default MentorItem