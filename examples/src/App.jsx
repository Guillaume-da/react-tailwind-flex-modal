import { useEffect, useState } from 'react'
import { Modal, useModal } from 'react-tailwind-flex-modal'
import Form from './components/Form'

// The library ships neutral defaults on purpose. Everything below is the
// Misregister design system layered on top through `classNames` and the two
// background props — nothing here changes what other consumers get.
const panel =
  'rounded-xl! border-2 border-ds-ink shadow-ink! ring-0! dark:border-ds-base dark:shadow-vermillion!'

const title =
  'font-display text-2xl font-extrabold tracking-[-0.02em] text-ds-ink dark:text-ds-on-panel'

const message = 'text-ds-ink-soft dark:text-ds-on-panel-soft'

// btn-secondary: outlined, fills with ink on hover.
const closeButton =
  'h-11! rounded-md! border-2! border-ds-ink! bg-transparent! font-semibold text-ds-ink! hover:bg-ds-ink! hover:text-ds-base! dark:border-ds-base! dark:text-ds-base!'

// The destructive confirm takes a vermillion flat fill — vermillion is a fill
// colour only in this system, never text.
const approveButton =
  'h-11! rounded-md! border-2! border-ds-ink! bg-ds-vermillion! font-semibold text-white! shadow-ink! hover:bg-ds-vermillion!'

const icon =
  'rounded-md! border-2 border-ds-vermillion bg-ds-vermillion/10! text-ds-vermillion! dark:border-ds-vermillion dark:bg-ds-vermillion/15! dark:text-ds-vermillion!'

const dismissButton =
  'rounded-md! text-ds-ink-faint hover:bg-ds-ink/10 dark:text-ds-on-panel-soft dark:hover:bg-ds-base/15'

const modalTheme = {
  classNames: {
    panel,
    title,
    message,
    icon,
    closeButton,
    approveButton,
    dismissButton
  },
  modalBackground: 'bg-ds-surface',
  darkModalBackground: 'dark:bg-ds-ink'
}

const WarningIcon = () => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    focusable='false'
    className='h-6 w-6 fill-ds-vermillion'
  >
    <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z' />
  </svg>
)

const cardClass =
  'group flex flex-col items-start gap-3 rounded-xl border-2 border-ds-ink bg-ds-surface p-6 text-left shadow-ink transition duration-200 ease-[cubic-bezier(.16,1,.3,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-ds-vermillion)] focus:outline-none focus-visible:outline-3 focus-visible:outline-ds-ink focus-visible:outline-offset-3 dark:border-ds-base dark:bg-ds-ink dark:shadow-vermillion'

const flagClass =
  'font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ds-ink-faint dark:text-ds-on-panel-soft'

const tagClass =
  'rounded-full border-2 border-ds-ink px-3 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ds-ink-soft dark:border-ds-base dark:text-ds-on-panel-soft'

const footerButtonBase =
  'inline-flex h-11 items-center justify-center rounded-md border-2 px-6 font-semibold transition duration-200 ease-[cubic-bezier(.16,1,.3,1)] focus:outline-none focus-visible:outline-3 focus-visible:outline-ds-ink focus-visible:outline-offset-3'

const secondaryButtonClass = `${footerButtonBase} border-ds-ink bg-transparent text-ds-ink hover:bg-ds-ink hover:text-ds-base dark:border-ds-base dark:text-ds-base`

const primaryButtonClass = `${footerButtonBase} border-ds-ink bg-ds-ink text-ds-base shadow-vermillion hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_var(--color-ds-vermillion)] dark:border-ds-base`

const demos = [
  {
    id: 'simple',
    title: 'Simple',
    text: 'Un titre, un message, un seul bouton de fermeture.',
    tag: 'variant'
  },
  {
    id: 'approval',
    title: 'Approval',
    text: 'Confirmer ou annuler une action destructive.',
    tag: 'variant'
  },
  {
    id: 'form',
    title: 'Form',
    text: 'Votre propre formulaire dans la coquille du dialogue.',
    tag: 'variant'
  },
  {
    id: 'composable',
    title: 'Composable',
    text: 'Header, Body et Footer, pilotés par useModal.',
    tag: 'api'
  },
  {
    id: 'sheet',
    title: 'Mobile sheet',
    text: 'Ancré au bord bas sous le breakpoint sm.',
    tag: 'api'
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
    <div className='min-h-screen bg-ds-base text-ds-ink dark:bg-ds-ink dark:text-ds-on-panel'>
      <Modal
        {...modalTheme}
        variant='simple'
        isOpen={variant === 'simple'}
        title='Tout est en place'
        message='Votre modal fonctionne — ceci est la variante simple.'
        closeLabel='Fermer'
        onClose={close}
      />

      <Modal
        {...modalTheme}
        variant='approval'
        isOpen={variant === 'approval'}
        title='Supprimer ce dépôt ?'
        message='Cette action retire définitivement le dépôt et tous ses fichiers. Elle est irréversible.'
        approveLabel='Supprimer'
        closeLabel='Annuler'
        warningIcon={<WarningIcon />}
        onApprove={close}
        onClose={close}
      />

      <Modal
        {...modalTheme}
        variant='form'
        isOpen={variant === 'form'}
        ariaLabel='Formulaire employé'
        size='lg'
        formComponent={<Form onClose={close} />}
        onClose={close}
        // A form would lose its input on a stray backdrop click.
        closeOnBackdropClick={false}
      />

      <Modal
        {...modalTheme}
        isOpen={composable.isOpen}
        onClose={composable.close}
        size='lg'
      >
        <Modal.Header className={title}>Modal composable</Modal.Header>
        <Modal.Body className={message}>
          Contenu libre construit avec Modal.Header, Modal.Body et Modal.Footer,
          piloté par le hook useModal. Fermez-le avec le X, Échap, le fond ou les
          boutons ci-dessous.
        </Modal.Body>
        <Modal.Footer>
          <button className={secondaryButtonClass} onClick={composable.close}>
            Annuler
          </button>
          <button className={primaryButtonClass} onClick={composable.close}>
            Confirmer
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        {...modalTheme}
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        mobileSheet
        size='sm'
      >
        <Modal.Header className={title}>Feuille mobile</Modal.Header>
        <Modal.Body className={message}>
          Réduisez la fenêtre sous le breakpoint sm : le modal s&apos;ancre au
          bord bas et glisse vers le haut.
        </Modal.Body>
      </Modal>

      <div className='mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)] py-24'>
        <div className='flex items-start justify-between gap-6'>
          <div>
            <p className={`${flagClass} mb-6`}>
              react-tailwind-flex-modal · v2.2
            </p>
            <h1 className='font-display max-w-[13ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.86] font-extrabold tracking-[-0.045em]'>
              Modals
              <span className='text-ds-vermillion'>.</span>
            </h1>
            <p className='mt-8 max-w-[60ch] text-lg text-ds-ink-soft dark:text-ds-on-panel-soft'>
              Piège de focus, arrière-plan inerte, verrou de défilement et
              animations d&apos;entrée et de sortie. Le style ci-dessous passe
              entièrement par <code className='font-mono'>classNames</code> — les
              défauts de la librairie restent neutres.
            </p>
          </div>
          <button
            type='button'
            onClick={() => setDark((value) => !value)}
            className={`${secondaryButtonClass} shrink-0`}
          >
            {dark ? 'Clair' : 'Sombre'}
          </button>
        </div>

        <div className='mt-16 flex flex-wrap gap-6 border-t-2 border-ds-ink pt-6 dark:border-ds-base'>
          <span className={flagClass}>--variants 3</span>
          <span className={flagClass}>--deps 0</span>
          <span className={flagClass}>--a11y focus-trap · inert</span>
        </div>

        <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {demos.map((demo) => (
            <button
              key={demo.id}
              type='button'
              className={cardClass}
              onClick={open[demo.id]}
            >
              <span className={flagClass}>--{demo.tag}</span>
              <span className='font-display text-2xl font-bold tracking-[-0.02em]'>
                {demo.title}
              </span>
              <span className='text-sm text-ds-ink-soft dark:text-ds-on-panel-soft'>
                {demo.text}
              </span>
              <span className={tagClass}>Ouvrir</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
