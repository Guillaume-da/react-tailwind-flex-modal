/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React from 'react'

function FormModal(props) {

	const form = {
		firstName: props.firstName,
		lastName: props.lastName,
		startDate: props.startDate,
		department: props.department,
		birthdate: props.birthdate,
		street: props.street,
		city: props.city,
		state: props.employeeState,
		zipcode: props.zipcode
	}

	// function handleFormSending(e) {
	// 	// eslint-disable-next-line no-unused-expressions
	// 	e.preventDefault
	// 	console.log(form) 
	// 	props.setShowModal(false) 
	// 	props.setFormModal(false)
	// }
console.log('form',props)
	return (
		<div className="w-full max-w-lg">
			<div className="flex flex-wrap -mx-3 mb-2">
				<div className="w-full md:w-1/2 px-3 ">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    First Name
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 text-gray-600 dark:text-gray-400 rounded py-3 px-4 leading-tight border border-gray-200 dark:border-zinc-800 focus:outline-none focus:bg-white dark:bg-zinc-800" 
						id="grid-first-name" 
						defaultValue={props.firstName}
						type="text" 
						placeholder={props.firstName} 
						onChange={(e) => console.log(e.target.value)}
					/>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Last Name
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 dark:bg-zinc-800" 
						id="grid-last-name" 
						type="text" 
						defaultValue={props.lastName}
						placeholder={props.lastName} 
						onChange={(e) => console.log(e.target.value)}
					/>
				</div>
			</div>
			<div className="w-full flex-1">
				<div className="h-6 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase leading-8 mb-2" >
                Date of birth
				</div>
				<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-gray-200 text-gray-700 dark:bg-zinc-800 p-1" >
					<input
						defaultValue={props.birthdate}
						placeholder={props.birthdate}
						onChange={(e) => console.log(e.target.value)}
						name="birthdate"
						type="date"
						className="w-full appearance-none p-1 px-2 bg-gray-200 text-gray-600 dark:text-gray-400 outline-none dark:bg-zinc-800"
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mt-4">
				<div className="w-full md:w-1/2 px-3 mb-2">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
                    Department
					</label>
					<div className="relative">
						<select 
							aria-label="Select"
							className="block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
							id="grid-state"
							name="employeeState"
							value={props.department}
							placeholder={props.department} 
							onChange={(e) => console.log(e.target.value)}
						>	
						<option value=''>Select a value</option>
							
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
							<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2 px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    City
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-last-name" 
						type="text" 
						defaultValue={props.city}
						placeholder={props.city} 
						onChange={(e) => props.setCity?.(e.target.value)}
					/>
				</div>
			</div>
			<div className="w-full flex-1">
				<div className="h-6 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase leading-8" >
                Start Date
				</div>
				<div className="my-2 flex rounded border border-gray-200 dark:border-zinc-800 bg-gray-200 dark:bg-zinc-800 p-1" >
					<input
						defaultValue={props.startDate}
						name="birthdate"
						type="date"
						onChange={(e) => props.setStartDate?.(e.target.value)}
						className="w-full appearance-none p-1 px-2 bg-gray-200 text-gray-600 dark:text-gray-400 outline-none dark:bg-zinc-800"
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-3 mt-4">
				<div className="w-full px-3">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-password">
                    Street
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-password" 
						type="text" 
						defaultValue={props.street}
						placeholder={props.street}
						onChange={(e) => props.setStreet?.(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex flex-wrap -mx-3 mb-2">
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-state">
                    State
					</label>
					<div className="relative">
						<select 
							aria-label="Select"
							className="block appearance-none w-full bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
							id="grid-state"
							name="employeeState"
							value={props.employeeState}
							placeholder={props.employeeState} 
							onChange={(e) => props.setEmployeeState?.(e.target.value)}
						>
							{props.statesList?.map((state, index) => {
								return <option key={index} value={state.name} >{state.name} </option>
							})}
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
							<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-600 dark:text-gray-300 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Zip
					</label>
					<input 
						className="appearance-none block w-full bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-zinc-800 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
						id="grid-zip" 
						type="text" 
						defaultValue={props.zipcode}
						placeholder={props.zipcode} 
						onChange={(e) => props.setZipcode?.(e.target.value)}
					/>
				</div>
            
			</div>
			<div className="flex flex-wrap -mx-3 mt-6 mb-2">
				<div className="w-full flex justify-between px-3">
					<button 
						className="w-5/12 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
						onClick={(e) => props.handleClose(e)}
					>
                    Cancel
					</button>
					<button 
						className="w-5/12 bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
						onClick={(e) => console.log(form)}
					>
                    Save
					</button>
				</div>
			</div>
		</div>
	)
}

export default FormModal