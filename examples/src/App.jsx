import { useEffect, useState } from 'react'
import { Modal, useModal } from 'react-tailwind-flex-modal'
import Form from './components/Form'

const cardClass =
  'group flex flex-col items-start gap-2 rounded-2xl border border-black/5 bg-white/70 p-5 text-left shadow-sm ring-1 ring-white/60 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:ring-white/5 dark:hover:border-white/20'

const cardTitleClass =
  'text-base font-semibold tracking-tight text-gray-900 dark:text-white'

const cardTextClass = 'text-sm leading-6 text-gray-500 dark:text-gray-400'

const footerButtonClass =
  'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-offset-zinc-900'

const secondaryButtonClass = `${footerButtonClass} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10`

const primaryButtonClass = `${footerButtonClass} bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400`

const demos = [
  {
    id: 'simple',
    title: 'Simple',
    text: 'A title, a message and a single close button.'
  },
  {
    id: 'approval',
    title: 'Approval',
    text: 'Confirm or cancel a destructive action.'
  },
  {
    id: 'form',
    title: 'Form',
    text: 'Wrap your own form in the dialog shell.'
  },
  {
    id: 'composable',
    title: 'Composable',
    text: 'Header, Body and Footer, driven by useModal.'
  },
  {
    id: 'sheet',
    title: 'Mobile sheet',
    text: 'Docks to the bottom edge below the sm breakpoint.'
  }
]

function App() {
  const [variant, setVariant] = useState(null)
  const [dark, setDark] = useState(false)
  const composable = useModal()
  const sheet = useModal()

  // The library ships `darkMode: 'class'`, so the demo drives it explicitly
  // instead of following the OS — that keeps the screenshots reproducible.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const close = () => setVariant(null)

  const open = {
    simple: () => setVariant('simple'),
    approval: () => setVariant('approval'),
    form: () => setVariant('form'),
    composable: composable.open,
    sheet: sheet.open
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950'>
      {/* Soft colour wash + grid, so the blurred backdrop has something to blur. */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_38rem_at_12%_-8%,rgba(99,102,241,0.45),transparent_60%),radial-gradient(48rem_34rem_at_92%_6%,rgba(244,114,182,0.4),transparent_60%),radial-gradient(46rem_36rem_at_45%_112%,rgba(45,212,191,0.4),transparent_60%)] dark:bg-[radial-gradient(55rem_38rem_at_12%_-8%,rgba(99,102,241,0.5),transparent_60%),radial-gradient(48rem_34rem_at_92%_6%,rgba(219,39,119,0.4),transparent_60%),radial-gradient(46rem_36rem_at_45%_112%,rgba(13,148,136,0.45),transparent_60%)]'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15] [background-image:linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:56px_56px] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)]'
      />

      <Modal
        variant='simple'
        isOpen={variant === 'simple'}
        title='All set'
        message='Your modal is working — this is the simple variant.'
        closeLabel='Close'
        onClose={close}
      />

      <Modal
        variant='approval'
        isOpen={variant === 'approval'}
        title='Delete this project?'
        message='This permanently removes the project and every file in it. This action cannot be undone.'
        approveLabel='Delete'
        closeLabel='Cancel'
        onApprove={close}
        onClose={close}
      />

      <Modal
        variant='form'
        isOpen={variant === 'form'}
        ariaLabel='Employee form'
        size='lg'
        formComponent={<Form onClose={close} />}
        onClose={close}
        // A form would lose its input on a stray backdrop click.
        closeOnBackdropClick={false}
      />

      <Modal isOpen={composable.isOpen} onClose={composable.close} size='lg'>
        <Modal.Header>Composable modal</Modal.Header>
        <Modal.Body>
          Free content built from Modal.Header, Modal.Body and Modal.Footer,
          driven by the useModal hook. Close it with the X, Escape, the backdrop
          or the buttons below.
        </Modal.Body>
        <Modal.Footer>
          <button className={secondaryButtonClass} onClick={composable.close}>
            Cancel
          </button>
          <button className={primaryButtonClass} onClick={composable.close}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>

      <Modal isOpen={sheet.isOpen} onClose={sheet.close} mobileSheet size='sm'>
        <Modal.Header>Mobile sheet</Modal.Header>
        <Modal.Body>
          Shrink the viewport below the sm breakpoint: this modal docks to the
          bottom edge and slides up like a sheet.
        </Modal.Body>
      </Modal>

      <div className='relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <span className='inline-flex items-center rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300'>
              react-tailwind-flex-modal
            </span>
            <h1 className='mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
              Accessible modals,
              <br />
              already styled.
            </h1>
            <p className='mt-4 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400'>
              Focus trap, inert background, scroll lock and enter/exit
              animations. Pick a ready-made variant or compose your own.
            </p>
          </div>
          <button
            type='button'
            onClick={() => setDark((value) => !value)}
            className='shrink-0 rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10'
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className='mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {demos.map((demo) => (
            <button
              key={demo.id}
              type='button'
              className={cardClass}
              onClick={open[demo.id]}
            >
              <span className={cardTitleClass}>{demo.title}</span>
              <span className={cardTextClass}>{demo.text}</span>
              <span className='mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400'>
                Open →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
