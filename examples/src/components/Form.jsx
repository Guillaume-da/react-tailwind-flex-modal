/* eslint-disable react/prop-types */
import React from 'react'

const labelClass =
  'block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400'

const fieldClass =
  'mt-2 block w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-white/15 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500'

const buttonBase =
  'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-offset-zinc-900'

const cancelClass = `${buttonBase} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10`

const saveClass = `${buttonBase} bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400`

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'Legal']

function Field({ label, htmlFor, className = '', children }) {
  return (
    <div className={className}>
      <label className={labelClass} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  )
}

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

  return (
    <div className='w-full'>
      <h2 className='pr-8 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
        New employee
      </h2>
      <p className='mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400'>
        Your own form component, rendered inside the dialog shell.
      </p>

      <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-6'>
        <Field
          label='First name'
          htmlFor='first-name'
          className='sm:col-span-3'
        >
          <input
            id='first-name'
            type='text'
            className={fieldClass}
            placeholder='Ada'
            defaultValue={props.firstName}
          />
        </Field>

        <Field label='Last name' htmlFor='last-name' className='sm:col-span-3'>
          <input
            id='last-name'
            type='text'
            className={fieldClass}
            placeholder='Lovelace'
            defaultValue={props.lastName}
          />
        </Field>

        <Field
          label='Date of birth'
          htmlFor='birthdate'
          className='sm:col-span-3'
        >
          <input
            id='birthdate'
            name='birthdate'
            type='date'
            className={fieldClass}
            defaultValue={props.birthdate}
          />
        </Field>

        <Field label='Start date' htmlFor='start-date' className='sm:col-span-3'>
          <input
            id='start-date'
            name='startDate'
            type='date'
            className={fieldClass}
            defaultValue={props.startDate}
          />
        </Field>

        <Field label='Department' htmlFor='department' className='sm:col-span-3'>
          <select
            id='department'
            name='department'
            className={fieldClass}
            defaultValue={props.department ?? ''}
          >
            <option value=''>Select a value</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </Field>

        <Field label='City' htmlFor='city' className='sm:col-span-3'>
          <input
            id='city'
            type='text'
            className={fieldClass}
            placeholder='London'
            defaultValue={props.city}
          />
        </Field>

        <Field label='Street' htmlFor='street' className='sm:col-span-6'>
          <input
            id='street'
            type='text'
            className={fieldClass}
            placeholder='12 Marylebone Road'
            defaultValue={props.street}
          />
        </Field>

        <Field label='State' htmlFor='state' className='sm:col-span-3'>
          <select
            id='state'
            name='employeeState'
            className={fieldClass}
            defaultValue={props.employeeState ?? ''}
          >
            <option value=''>Select a value</option>
            {props.statesList?.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Zip' htmlFor='zip' className='sm:col-span-3'>
          <input
            id='zip'
            type='text'
            className={fieldClass}
            placeholder='NW1 5LS'
            defaultValue={props.zipcode}
          />
        </Field>
      </div>

      <div className='mt-8 flex justify-end gap-3'>
        <button type='button' className={cancelClass} onClick={props.onClose}>
          Cancel
        </button>
        <button
          type='button'
          className={saveClass}
          onClick={() => console.log(form)}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default FormModal
