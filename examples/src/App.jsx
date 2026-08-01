import { useEffect, useState } from 'react'
import { Modal, modalThemes, modalThemeNames, useModal } from 'tailwind-react-modal'
import Form from './components/Form'

// The page keeps its own design system; the modals now use the presets the
// library ships, picked from the toolbar. That is the whole point of the demo:
// one prop, no `classNames` blob.
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
    id: 'terminal',
    title: 'Terminal',
    text: 'Chrome de fenêtre, points de feu, curseur clignotant.',
    tag: 'theme'
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

const Prompt = () => (
  <span className='text-[#3fb950]'>guillaume@web:~$ </span>
)

function App() {
  const [variant, setVariant] = useState(null)
  const [dark, setDark] = useState(false)
  const [theme, setTheme] = useState('brutalist')
  const composable = useModal()
  const sheet = useModal()
  const terminal = useModal()

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
    terminal: terminal.open,
    composable: composable.open,
    sheet: sheet.open
  }

  return (
    <div className='min-h-screen bg-ds-base text-ds-ink dark:bg-ds-ink dark:text-ds-on-panel'>
      <Modal
        theme={theme}
        variant='simple'
        isOpen={variant === 'simple'}
        title='Tout est en place'
        message='Votre modal fonctionne — ceci est la variante simple.'
        closeLabel='Fermer'
        onClose={close}
      />

      <Modal
        theme={theme}
        variant='approval'
        isOpen={variant === 'approval'}
        title='Supprimer ce dépôt ?'
        message='Cette action retire définitivement le dépôt et tous ses fichiers. Elle est irréversible.'
        approveLabel='Supprimer'
        closeLabel='Annuler'
        onApprove={close}
        onClose={close}
      />

      <Modal
        theme={theme}
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
        theme='terminal'
        isOpen={terminal.isOpen}
        onClose={terminal.close}
        titleBarLabel='guillaume@web — qa & dev'
        ariaLabel='Session terminal'
        size='lg'
      >
        <Modal.Body className='space-y-1'>
          <div>
            <Prompt />
            whoami
          </div>
          <div className='text-lg'>
            <strong>QA &amp; Web Developer</strong>
          </div>
          <div>
            <Prompt />
            echo $motto
          </div>
          <div>
            <em>
              &quot;Ça marche sur ma machine — et sur les vôtres, j&apos;ai
              vérifié.&quot;
            </em>
          </div>
          <div>
            <Prompt />
            npx playwright test
          </div>
          <div>
            <span className='text-[#3fb950]'>✓ 128 passed</span>{' '}
            <span className='text-[#6e7681]'>
              (chromium · firefox · webkit)
            </span>
          </div>
          <div>
            <span className='text-[#3fb950]'>stack</span>:{' '}
            <span className='text-[#79c0ff]'>
              Next.js React TypeScript C# Azure
            </span>
            {/* `.rtm-caret` ships with the library; the variants render it
                automatically, free content asks for it. */}
            <span aria-hidden='true' className='rtm-caret' />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        theme={theme}
        isOpen={composable.isOpen}
        onClose={composable.close}
        size='lg'
      >
        <Modal.Header>Modal composable</Modal.Header>
        <Modal.Body>
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
        theme={theme}
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        mobileSheet
        size='sm'
      >
        <Modal.Header>Feuille mobile</Modal.Header>
        <Modal.Body>
          Réduisez la fenêtre sous le breakpoint sm : le modal s&apos;ancre au
          bord bas et glisse vers le haut.
        </Modal.Body>
      </Modal>

      <div className='mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,4vw,3rem)] py-24'>
        <div className='flex items-start justify-between gap-6'>
          <div>
            <p className={`${flagClass} mb-6`}>
              tailwind-react-modal · v3
            </p>
            <h1 className='font-display max-w-[13ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.86] font-extrabold tracking-[-0.045em]'>
              Modals
              <span className='text-ds-vermillion'>.</span>
            </h1>
            <p className='mt-8 max-w-[60ch] text-lg text-ds-ink-soft dark:text-ds-on-panel-soft'>
              Piège de focus, arrière-plan inerte, verrou de défilement et
              animations d&apos;entrée et de sortie. Sept looks livrés avec la
              librairie — <code className='font-mono'>theme=&quot;terminal&quot;</code>,
              rien à configurer.
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

        <div className='mt-16 border-t-2 border-ds-ink pt-6 dark:border-ds-base'>
          <p className={flagClass}>--theme</p>
          <div className='mt-3 flex flex-wrap gap-2'>
            {modalThemeNames.map((name) => (
              <button
                key={name}
                type='button'
                onClick={() => setTheme(name)}
                title={modalThemes[name].description}
                className={`rounded-full border-2 px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition ${
                  theme === name
                    ? 'border-ds-ink bg-ds-ink text-ds-base dark:border-ds-base dark:bg-ds-base dark:text-ds-ink'
                    : 'border-ds-ink text-ds-ink-soft hover:bg-ds-ink/10 dark:border-ds-base dark:text-ds-on-panel-soft'
                }`}
              >
                {modalThemes[name].label}
              </button>
            ))}
          </div>
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
