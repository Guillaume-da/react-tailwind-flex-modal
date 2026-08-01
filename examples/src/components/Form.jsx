/* eslint-disable react/prop-types */
import React from 'react'

const labelClass =
  'block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ds-ink-faint dark:text-ds-on-panel-soft'

const fieldClass =
  'mt-2 block h-11 w-full appearance-none rounded-md border-2 border-ds-ink bg-ds-surface px-4 text-ds-ink transition placeholder:text-ds-ink-faint focus:border-ds-violet focus:shadow-[0_0_0_3px_rgba(61,43,255,0.35)] focus:outline-none dark:border-ds-base dark:bg-ds-ink dark:text-ds-on-panel dark:placeholder:text-ds-on-panel-soft'

const buttonBase =
  'inline-flex h-11 items-center justify-center rounded-md border-2 px-6 font-semibold transition duration-200 ease-[cubic-bezier(.16,1,.3,1)] focus:outline-none focus-visible:outline-3 focus-visible:outline-ds-ink focus-visible:outline-offset-3'

const cancelClass = `${buttonBase} border-ds-ink bg-transparent text-ds-ink hover:bg-ds-ink hover:text-ds-base dark:border-ds-base dark:text-ds-base`

const saveClass = `${buttonBase} border-ds-ink bg-ds-ink text-ds-base shadow-vermillion hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-ds-vermillion)] dark:border-ds-base`

const DEPARTMENTS = ['Ingénierie', 'Ventes', 'Marketing', 'Juridique']

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
      <p className='font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ds-ink-faint dark:text-ds-on-panel-soft'>
        --form employé
      </p>
      <h2 className='font-display mt-3 pr-8 text-2xl font-extrabold tracking-[-0.02em] text-ds-ink dark:text-ds-on-panel'>
        Nouvel employé
      </h2>

      <div className='mt-8 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-6'>
        <Field label='Prénom' htmlFor='first-name' className='sm:col-span-3'>
          <input
            id='first-name'
            type='text'
            className={fieldClass}
            placeholder='Ada'
            defaultValue={props.firstName}
          />
        </Field>

        <Field label='Nom' htmlFor='last-name' className='sm:col-span-3'>
          <input
            id='last-name'
            type='text'
            className={fieldClass}
            placeholder='Lovelace'
            defaultValue={props.lastName}
          />
        </Field>

        <Field
          label='Date de naissance'
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

        <Field
          label="Date d'entrée"
          htmlFor='start-date'
          className='sm:col-span-3'
        >
          <input
            id='start-date'
            name='startDate'
            type='date'
            className={fieldClass}
            defaultValue={props.startDate}
          />
        </Field>

        <Field label='Service' htmlFor='department' className='sm:col-span-3'>
          <select
            id='department'
            name='department'
            className={fieldClass}
            defaultValue={props.department ?? ''}
          >
            <option value=''>Sélectionner</option>
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Ville' htmlFor='city' className='sm:col-span-3'>
          <input
            id='city'
            type='text'
            className={fieldClass}
            placeholder='Lyon'
            defaultValue={props.city}
          />
        </Field>

        <Field label='Rue' htmlFor='street' className='sm:col-span-6'>
          <input
            id='street'
            type='text'
            className={fieldClass}
            placeholder='12 rue de la République'
            defaultValue={props.street}
          />
        </Field>

        <Field label='Région' htmlFor='state' className='sm:col-span-3'>
          <select
            id='state'
            name='employeeState'
            className={fieldClass}
            defaultValue={props.employeeState ?? ''}
          >
            <option value=''>Sélectionner</option>
            {props.statesList?.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label='Code postal' htmlFor='zip' className='sm:col-span-3'>
          <input
            id='zip'
            type='text'
            className={fieldClass}
            placeholder='69001'
            defaultValue={props.zipcode}
          />
        </Field>
      </div>

      <div className='mt-8 flex justify-end gap-4'>
        <button type='button' className={cancelClass} onClick={props.onClose}>
          Annuler
        </button>
        <button
          type='button'
          className={saveClass}
          onClick={() => console.log(form)}
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

export default FormModal
