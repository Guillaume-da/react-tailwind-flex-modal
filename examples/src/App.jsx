import { useState } from 'react'
import { Modal } from 'react-tailwind-flex-modal'
import Form from './components/Form'

const buttonClass =
  'bg-cyan-700 select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out'

function App() {
  const [variant, setVariant] = useState(null)

  const close = () => setVariant(null)

  return (
    <div className='dark:bg-zinc-800 min-h-screen'>
      <div className='mx-auto rounded-2xl bg-white pb-2 shadow-xl max-w-screen-xl dark:bg-zinc-900'>
        <Modal
          variant='simple'
          isOpen={variant === 'simple'}
          title='CONGRATULATIONS!'
          message='Your modal is working'
          closeLabel='Close'
          onClose={close}
          successTitleColor='text-lime-600'
        />

        <Modal
          variant='approval'
          isOpen={variant === 'approval'}
          title='WARNING!'
          message='Are you sure?'
          approveLabel='Yes do it !'
          closeLabel='Cancel'
          onApprove={close}
          onClose={close}
        />

        <Modal
          variant='form'
          isOpen={variant === 'form'}
          ariaLabel='Employee form'
          formComponent={<Form onClose={close} />}
          onClose={close}
          // A form would lose its input on a stray backdrop click.
          closeOnBackdropClick={false}
        />

        <div className='horizontal xl:container flex items-center justify-center h-screen'>
          <div className='my-10 p-2 lg:p-10'>
            <button className={buttonClass} onClick={() => setVariant('simple')}>
              Simple Modal
            </button>
          </div>
          <div className='my-10 p-2 lg:p-10'>
            <button
              className={buttonClass}
              onClick={() => setVariant('approval')}
            >
              Approval Modal
            </button>
          </div>
          <div className='my-10 p-2 lg:p-10'>
            <button className={buttonClass} onClick={() => setVariant('form')}>
              Form Modal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
