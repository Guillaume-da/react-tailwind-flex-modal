# A light, accessible Modal made with Tailwind

[![NPM](https://img.shields.io/npm/v/react-tailwind-flex-modal.svg)](https://www.npmjs.com/package/react-tailwind-flex-modal) [![CI](https://github.com/Guillaume-da/react-tailwind-flex-modal/actions/workflows/ci.yml/badge.svg)](https://github.com/Guillaume-da/react-tailwind-flex-modal/actions/workflows/ci.yml)

Three ready-made modal layouts — a simple message, a confirm/cancel prompt, and a
wrapper for your own form — with the accessibility plumbing already done: portal,
`role="dialog"`, focus trap, focus restore, scroll lock, Escape and backdrop dismissal.

Requires React 18 or 19 and Tailwind CSS 4.

## Install

```bash
npm install react-tailwind-flex-modal
```

Import the component and the stylesheet:

```jsx
import { Modal } from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/styles.css'
```

## Usage

Pick a layout with `variant`, and hand it a single `onClose`.

### Simple

```jsx
const [isOpen, setIsOpen] = useState(false)

<Modal
  variant='simple'
  isOpen={isOpen}
  title='CONGRATULATIONS!'
  message='Your modal is working.'
  closeLabel='Close'
  onClose={() => setIsOpen(false)}
/>
```

`isOpen` is optional — omit it and mount the modal conditionally yourself.

### Approval

```jsx
<Modal
  variant='approval'
  isOpen={isOpen}
  title='WARNING!'
  message='Are you sure?'
  approveLabel='Yes do it !'
  closeLabel='Cancel'
  onApprove={remove}
  onClose={() => setIsOpen(false)}
/>
```

`onCancel` is optional; the cancel button falls back to `onClose`. The warning icon
ships inline — pass any node to `warningIcon` to replace it.

### Form

```jsx
<Modal
  variant='form'
  isOpen={isOpen}
  ariaLabel='Signup form'
  formComponent={<MyForm onClose={() => setIsOpen(false)} />}
  onClose={() => setIsOpen(false)}
  closeOnBackdropClick={false}
/>
```

A form has no title, so give the dialog a name with `ariaLabel`. Turning off
`closeOnBackdropClick` avoids losing input to a stray click.

## Accessibility & behaviour

The modal renders through a portal into `document.body`, so it can't be clipped by an
`overflow-hidden` or transformed parent. It is exposed as `role="dialog"` /
`aria-modal="true"`, labelled by its title and described by its message.

While open it moves focus to the close button — never the approve button, so a reflex
Enter can't fire a destructive action — keeps Tab and Shift+Tab cycling inside the
dialog, locks background scrolling, and returns focus to whatever was focused before it
opened.

It is dismissed by Escape, the close button, or a backdrop click.

| Prop | Default | Effect |
| --- | --- | --- |
| `closeOnBackdropClick` | `true` | Dismiss when the backdrop is clicked |
| `closeOnEscape` | `true` | Dismiss on the Escape key |
| `usePortal` | `true` | Render into `document.body` rather than in place |
| `portalContainer` | `document.body` | Portal target |
| `ariaLabel` | — | Accessible name when the variant renders no title |

## Styling

Dark mode is driven by a `.dark` class on an ancestor. Every colour is a Tailwind class
you can override:

```jsx
const modalBackground = 'bg-white'
const darkModalBackground = 'dark:bg-zinc-800'
const successTitleColor = 'text-lime-600'
const darkSuccessTitleColor = 'dark:text-lime-600'
const warningTitleColor = 'text-red-500'
const messageTextColor = 'text-gray-500'
const approveButtonBgColor = 'bg-lime-600'
const darkApproveButtonBgColor = 'dark:bg-lime-600'
const closeButtonBgColor = 'bg-red-600'
const buttonsTextColor = 'text-white'
```

Classes you pass must be reachable by *your* Tailwind build, not the library's.

Animation defaults to fade in up; `animate-fade-in-down` and `animate-fade-in` also ship:

```jsx
<Modal animation='animate-fade-in' ... />
```

## Migrating from v1

The full list of changes is in the
[v2.0.0 release notes](https://github.com/Guillaume-da/react-tailwind-flex-modal/releases/tag/v2.0.0).

**v1 props still work.** They are marked `@deprecated` and resolve to the new ones, so
existing code keeps running — but three things do change and are not shimmed:

1. **The stylesheet moved.** `react-tailwind-flex-modal/dist/index.css` is now
   `react-tailwind-flex-modal/styles.css`, and importing the component no longer pulls
   the CSS in as a side effect. **You must update this import.**
2. **Tailwind 4 is required.** v1 was built against Tailwind 2.
3. **The package is ESM-first** with an `exports` map (CJS still ships). Bundlers with
   no `exports` support will break.

| v1 | v2 |
| --- | --- |
| `currentModal='simpleModal'` | `variant='simple'` |
| `currentModal='aprovalModal'` | `variant='approval'` |
| `currentModal='formModal'` | `variant='form'` |
| `setShowModal` + `handleClose` | `onClose` |
| `handleAproval` | `onApprove` |
| `handleCloseAproval` | `onCancel` |
| `successTitle` / `warningTitle` | `title` |
| `warningMessage` | `message` |
| `closeMessage` | `closeLabel` |
| `aprovalMessage` | `approveLabel` |
| `aprovalButtonBgColor` | `approveButtonBgColor` |
| `darkAprovalButtonBgColor` | `darkApproveButtonBgColor` |

Note the spelling fix: *aproval* → *approval*.

One behaviour difference worth knowing: in v1, Escape called `setShowModal(false)`
directly and left your `currentModal` state untouched. That quirk is preserved for
`setShowModal` users, but once you move to `onClose` every dismissal — button, Escape,
backdrop — runs the same handler.

## Examples

```bash
cd examples
npm install
npm run dev
```

The example app consumes the library from source via `file:..`.

## Contributing

Building the package needs nothing special, but **the test suite requires Node 22.22+
or 24.15+** — jsdom 30 does not run on Node 20. `engines` stays at `>=18` because that
is what *consuming* the published browser bundle needs.

```bash
npm ci
npm test   # types, unit, lint, build
```

## License

MIT © [Guillaume-da](https://github.com/Guillaume-da)
