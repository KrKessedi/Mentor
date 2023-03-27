'use client'

import { changePassword } from '@/redux/apiCalls'
// import DefaultInputs from '@/components/inputs/default'
import PasswordInputs from '@/components/inputs/password'
import Navbar from '@/components/navbar/Navbar'
import SideBar from '@/components/sidebar'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { INewPassword } from '@/types/types'
import { NextPage } from 'next'
import { useState } from 'react'
import DeleteModal from './modal'

import { toast, Toaster } from 'react-hot-toast'

const Settings: NextPage = () => {
	// const [email, setEmail] = useState<string>('')
	// const [password, setPassword] = useState<string>('')
	// const [isVisPass, setIsVisPass] = useState<boolean>(false)

	const [modal, setModal] = useState<boolean>(false)

	const [old_password, setOld_Password] = useState<string>('')
	const [isVisOldPassConf, setIsVisOldPassConf] = useState<boolean>(false)
	const [new_password, setNew_Password] = useState<string>('')
	const [isVisNewPass, setIsVisNewPass] = useState<boolean>(false)
	const [new_pass_confirm, setNew_pass_confirm] = useState<string>('')
	// const [isVisNewPassConf, setIsVisNewPassConf] = useState<boolean>(false)

	const { tokens, error } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	function handleChange() {
		if (
			!old_password.trim() ||
			!new_password.trim() ||
			!new_pass_confirm.trim()
		) {
			// alert('Some inputs are empty')
			toast.error('Некоторые входы пусты', {
				style: {
					borderRadius: '6px',
					background: '#333',
					color: '#fff',
					padding: '20px auto',
					fontSize: '20px',
				},
			})
			return
		}

		const newPassword: INewPassword = {
			old_password,
			new_password,
			new_pass_confirm,
		}

		changePassword(dispatch, newPassword, tokens?.access)

		if (!error) {
			setOld_Password('')
			setNew_Password('')
			setNew_pass_confirm('')
		}
	}

	return (
		<div>
			<DeleteModal modal={modal} setModal={setModal} />
			<Toaster />

			<Navbar />
			<div className='flex gap-x-28 items-start mt-16'>
				<div className='w-72'>
					<SideBar />
				</div>
				<div className=''>
					<div className=''>
						{/* <DefaultInputs setState={setEmail} state={email} label='Email' />
					<PasswordInputs
					setState={setPassword}
					state={password}
					label='Пароль'
					setPassVis={setIsVisPass}
					passVis={isVisPass}
				/> */}
					</div>
					<h2 className='text-xl text-paragraph font-semibold mb-8'>
						Изменить пароль
					</h2>
					<div className='flex items-end gap-x-16'>
						<div className='w-[35.6rem]'>
							<PasswordInputs
								state={old_password}
								passVis={isVisOldPassConf}
								label='Введите старый пароль'
								setState={setOld_Password}
								setPassVis={setIsVisOldPassConf}
							/>
							<PasswordInputs
								state={new_password}
								passVis={isVisNewPass}
								label='Введите новый пароль'
								setState={setNew_Password}
								setPassVis={setIsVisNewPass}
							/>
							<div className='flex flex-col gap-y-[0.87rem]'>
								<label className='label-in-register' htmlFor=''>
									Повторите пароль
								</label>
								<input
									value={new_pass_confirm}
									onChange={e => setNew_pass_confirm(e.target.value)}
									name='password'
									className='reg-inputs'
									type={isVisNewPass ? 'text' : 'password'}
								/>
							</div>
						</div>
						<button
							onClick={handleChange}
							className='mx-auto text-lg font-medium px-[2.38rem] py-[0.9rem] rounded-xl text-paragraph bg-accent hover:bg-tertiary active:bg-active hover:duration-150 duration-200'
						>
							Сохранить
						</button>
					</div>
					<button
						onClick={() => setModal(true)}
						className='mt-12 py-[1.08rem] px-[2.4rem] bg-little-text rounded-md text-[#fffffe] text-sm hover:bg-tertiary active:bg-[#C9FFFF] hover:duration-300 duration-300 hover:text-paragraph'
					>
						Удалить профиль
					</button>
				</div>
			</div>
		</div>
	)
}

export default Settings