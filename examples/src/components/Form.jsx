/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const flagClass =
  'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ds-ink-faint dark:text-ds-on-panel-soft'

const labelClass = `block ${flagClass}`

const fieldBase =
  'mt-2 block h-11 w-full appearance-none rounded-md border-2 bg-ds-surface px-4 text-ds-ink transition placeholder:text-ds-ink-faint focus:outline-none dark:bg-ds-ink dark:text-ds-on-panel dark:placeholder:text-ds-on-panel-soft'

const fieldClass = `${fieldBase} border-ds-ink focus:border-ds-violet focus:shadow-[0_0_0_3px_rgba(61,43,255,0.35)] dark:border-ds-base`

const fieldErrorClass = `${fieldBase} border-[#d93636] focus:shadow-[0_0_0_3px_rgba(217,54,54,0.3)]`

const buttonBase =
  'inline-flex h-11 items-center justify-center rounded-md border-2 px-6 font-semibold transition duration-200 ease-[cubic-bezier(.16,1,.3,1)] focus:outline-none focus-visible:outline-3 focus-visible:outline-ds-ink focus-visible:outline-offset-3'

const cancelClass = `${buttonBase} border-ds-ink bg-transparent text-ds-ink hover:bg-ds-ink hover:text-ds-base dark:border-ds-base dark:text-ds-base`

const saveClass = `${buttonBase} border-ds-ink bg-ds-ink text-ds-base shadow-vermillion hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-ds-vermillion)] dark:border-ds-base`

const DEPARTMENTS = ['Ingénierie', 'Ventes', 'Marketing', 'Juridique']
const REGIONS = ['Auvergne-Rhône-Alpes', 'Bretagne', 'Occitanie', 'Normandie']

const Chevron = () => (
  <span className='pointer-events-none absolute right-3 bottom-3 text-ds-ink dark:text-ds-base'>
    <svg viewBox='0 0 20 20' aria-hidden='true' className='h-4 w-4 fill-current'>
      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
    </svg>
  </span>
)

const Field = ({ label, htmlFor, className = '', hint, children }) => (
  <div className={`relative ${className}`}>
    <label className={labelClass} htmlFor={htmlFor}>
      {label}
    </label>
    {children}
    {hint}
  </div>
)

const Error = ({ children }) => (
  <p className='mt-2 flex items-center gap-2 text-sm text-ds-ink dark:text-ds-on-panel'>
    <span className='h-2 w-2 shrink-0 rounded-full bg-[#d93636]' />
    {children}
  </p>
)

const Section = ({ index, title, children }) => (
  <section className='border-t-2 border-ds-ink pt-6 first:border-t-0 first:pt-0 dark:border-ds-base'>
    <div className='grid gap-6 sm:grid-cols-[7rem_1fr]'>
      <div className='sm:pt-1'>
        <p className={flagClass}>--{index}</p>
        <p className='font-display mt-1 text-sm font-bold tracking-tight'>
          {title}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>
        {children}
      </div>
    </div>
  </section>
)

function FormModal(props) {
  const [zipcode, setZipcode] = useState(props.zipcode ?? '6900')
  const zipInvalid = zipcode.length > 0 && zipcode.length !== 5

  const form = {
    firstName: props.firstName,
    lastName: props.lastName,
    startDate: props.startDate,
    department: props.department,
    birthdate: props.birthdate,
    street: props.street,
    city: props.city,
    state: props.employeeState,
    zipcode
  }

  return (
    <div className='w-full'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className={flagClass}>--form employé</p>
          <h2 className='font-display mt-2 pr-8 text-2xl font-extrabold tracking-[-0.02em] text-ds-ink dark:text-ds-on-panel'>
            Nouvel employé
          </h2>
        </div>
        <span className={`${flagClass} shrink-0 pr-8 sm:pr-10`}>
          --fields 09
        </span>
      </div>

      <div className='mt-8 space-y-6'>
        <Section index='01' title='Identité'>
          <Field label='Prénom' htmlFor='first-name'>
            <input
              id='first-name'
              type='text'
              className={fieldClass}
              placeholder='Ada'
              defaultValue={props.firstName}
            />
          </Field>

          <Field label='Nom' htmlFor='last-name'>
            <input
              id='last-name'
              type='text'
              className={fieldClass}
              placeholder='Lovelace'
              defaultValue={props.lastName}
            />
          </Field>

          <Field label='Date de naissance' htmlFor='birthdate'>
            <input
              id='birthdate'
              name='birthdate'
              type='date'
              className={fieldClass}
              defaultValue={props.birthdate}
            />
          </Field>
        </Section>

        <Section index='02' title='Poste'>
          <Field label='Service' htmlFor='department'>
            <select
              id='department'
              name='department'
              className={`${fieldClass} pr-10`}
              defaultValue={props.department ?? ''}
            >
              <option value=''>Sélectionner</option>
              {DEPARTMENTS.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <Chevron />
          </Field>

          <Field label="Date d'entrée" htmlFor='start-date'>
            <input
              id='start-date'
              name='startDate'
              type='date'
              className={fieldClass}
              defaultValue={props.startDate}
            />
          </Field>
        </Section>

        <Section index='03' title='Adresse'>
          <Field label='Rue' htmlFor='street' className='sm:col-span-2'>
            <input
              id='street'
              type='text'
              className={fieldClass}
              placeholder='12 rue de la République'
              defaultValue={props.street}
            />
          </Field>

          <Field label='Ville' htmlFor='city'>
            <input
              id='city'
              type='text'
              className={fieldClass}
              placeholder='Lyon'
              defaultValue={props.city}
            />
          </Field>

          <Field label='Région' htmlFor='region'>
            <select
              id='region'
              name='employeeState'
              className={`${fieldClass} pr-10`}
              defaultValue={props.employeeState ?? ''}
            >
              <option value=''>Sélectionner</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <Chevron />
          </Field>

          <Field
            label='Code postal'
            htmlFor='zip'
            className='sm:col-span-2'
            hint={
              zipInvalid ? (
                <Error>Un code postal français compte cinq chiffres.</Error>
              ) : null
            }
          >
            <input
              id='zip'
              type='text'
              inputMode='numeric'
              className={zipInvalid ? fieldErrorClass : fieldClass}
              aria-invalid={zipInvalid || undefined}
              placeholder='69001'
              value={zipcode}
              onChange={(event) => setZipcode(event.target.value)}
            />
          </Field>
        </Section>
      </div>

      <div className='mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ds-ink pt-6 dark:border-ds-base'>
        <span className={flagClass}>--unsaved</span>
        <div className='flex gap-4'>
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
    </div>
  )
}

export default FormModal
