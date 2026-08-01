# tailwind-react-modal

[![NPM](https://img.shields.io/npm/v/tailwind-react-modal.svg)](https://www.npmjs.com/package/tailwind-react-modal) [![CI](https://github.com/Guillaume-da/tailwind-react-modal/actions/workflows/ci.yml/badge.svg)](https://github.com/Guillaume-da/tailwind-react-modal/actions/workflows/ci.yml)

An accessible, animated React modal built with Tailwind CSS — **zero runtime
dependencies** beyond React itself.

Use one of the three ready-made layouts (message, confirm/cancel, form wrapper), or
compose your own content with `Modal.Header` / `Modal.Body` / `Modal.Footer`. The
hard parts are already done for you:

- **Accessibility** — `role="dialog"`, `aria-modal`, automatic labelling, focus trap,
  focus restore, and an [`inert`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inert)
  background so keyboard and screen-reader users can never wander behind the modal.
- **Animations** — the backdrop fades while the panel pops in and out on separate
  timings, including a real exit animation before unmount. `prefers-reduced-motion`
  is respected.
- **Themes** — seven looks ship with the package: `neutral`, `terminal`,
  `brutalist`, `glass`, `editorial`, `neon`, `minimal`. One prop, no Tailwind config,
  and your own classes still override them.
- **Polish** — blurred backdrop, scroll lock that compensates the scrollbar width so
  the page never shifts, a top-right "X" button, dark mode, and an optional
  bottom-sheet presentation on mobile.

## The seven themes

<table>
  <tr>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/neutral.png" alt="The neutral theme: a white panel with an outlined cancel button and a red destructive confirm button" width="100%" /><br /><code>neutral</code> — The default. White panel, outlined cancel, red destructive confirm.</td>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/terminal.png" alt="The terminal theme: dark navy window, traffic lights, monospace, blinking caret" width="100%" /><br /><code>terminal</code> — Dark navy window, traffic lights, monospace, blinking caret.</td>
  </tr>
  <tr>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/brutalist.png" alt="The brutalist theme: flat 6px offset shadow instead of blur, 2px ink borders, vermillion confirm" width="100%" /><br /><code>brutalist</code> — Flat 6px offset shadow instead of blur, 2px ink borders, vermillion confirm.</td>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/glass.png" alt="The glass theme: frosted translucent panel over a heavily blurred backdrop" width="100%" /><br /><code>glass</code> — Frosted translucent panel over a heavily blurred backdrop.</td>
  </tr>
  <tr>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/editorial.png" alt="The editorial theme: warm paper stock, serif title, hairline rules, small caps" width="100%" /><br /><code>editorial</code> — Warm paper stock, serif title, hairline rules, small caps.</td>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/neon.png" alt="The neon theme: deep violet panel, glowing ring, gradient confirm" width="100%" /><br /><code>neon</code> — Deep violet panel, glowing ring, gradient confirm.</td>
  </tr>
  <tr>
    <td width="50%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/minimal.png" alt="The minimal theme: no borders, no shadow — hierarchy carried by space alone" width="100%" /><br /><code>minimal</code> — No borders, no shadow — hierarchy carried by space alone.</td>
    <td width="50%"></td>
  </tr>
</table>

<details>
<summary><b>Every theme in dark mode</b></summary>

<br />

<table>
  <tr>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/neutral-dark.png" alt="The neutral theme in dark mode: a zinc panel with a light title and a red confirm button" width="100%" /><br /><code>neutral</code></td>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/brutalist-dark.png" alt="The brutalist theme in dark mode: an ink panel with a yellow border and a vermillion offset shadow" width="100%" /><br /><code>brutalist</code></td>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/editorial-dark.png" alt="The editorial theme in dark mode: a dark brown panel with a cream serif title and hairline rules" width="100%" /><br /><code>editorial</code></td>
  </tr>
  <tr>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/glass-dark.png" alt="The glass theme in dark mode: a translucent dark panel frosting the page behind it" width="100%" /><br /><code>glass</code></td>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/neon-dark.png" alt="The neon theme in dark mode: a near-black violet panel with a glowing fuchsia ring and gradient confirm button" width="100%" /><br /><code>neon</code></td>
    <td width="33%" valign="top"><img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/themes/minimal-dark.png" alt="The minimal theme in dark mode: a flat black panel with white type and no borders" width="100%" /><br /><code>minimal</code></td>
  </tr>
</table>

</details>

Anything you pass through [`classNames`](#styling) still wins over a theme, so these
are starting points, not cages. [Full details below.](#themes)


Requires **React 18 or 19** and **Tailwind CSS 4**.

## Table of contents

- [The seven themes](#the-seven-themes)
- [Installation](#installation)
- [Quick start](#quick-start)
- [The three variants](#the-three-variants)
- [Composable API](#composable-api)
- [The useModal hook](#the-usemodal-hook)
- [Mobile bottom sheet](#mobile-bottom-sheet)
- [Themes](#themes)
- [Behaviour & accessibility](#behaviour--accessibility)
- [Sizes and stacking](#sizes-and-stacking)
- [Animations](#animations)
- [Styling](#styling)
- [Dark mode](#dark-mode)
- [Migrating from v2](#migrating-from-v2)
- [Migrating from v1](#migrating-from-v1)
- [Running the examples](#running-the-examples)
- [Contributing](#contributing)

## Installation

```bash
npm install tailwind-react-modal
```

Import the component and the stylesheet once:

```jsx
import { Modal } from 'tailwind-react-modal'
import 'tailwind-react-modal/styles.css'
```

Import it **after** your own Tailwind entry point. The `neutral` skin is plain
utilities, so it competes with yours at equal specificity and load order decides —
with the order reversed, a stray `bg-white` from your build would override the
library's `dark:` defaults. [Themes](#themes) are not affected by this: they live in
the `components` layer and always lose to your utilities, whatever the order.

## Quick start

```jsx
import { Modal, useModal } from 'tailwind-react-modal'
import 'tailwind-react-modal/styles.css'

function App() {
  const { isOpen, open, close } = useModal()

  return (
    <>
      <button onClick={open}>Show me</button>

      <Modal
        variant='simple'
        isOpen={isOpen}
        title='CONGRATULATIONS!'
        message='Your modal is working.'
        closeLabel='Close'
        onClose={close}
      />
    </>
  )
}
```

Everything is driven by two props: `isOpen` decides whether the modal shows, and
`onClose` is called for **every** dismissal — the close button, the "X", the Escape
key, and the backdrop click. Keep `isOpen` mounted and toggle it (rather than
conditionally mounting the modal) so the exit animation can play.

## The three variants

### `simple` — a message and a close button

<p align="center">
  <img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/simple.png" alt="The simple modal: a title, a message and a single outlined close button" width="720" />
</p>

```jsx
<Modal
  variant='simple'
  isOpen={isOpen}
  title='CONGRATULATIONS!'
  message='Your modal is working.'
  closeLabel='Close'
  onClose={close}
/>
```

### `approval` — confirm or cancel

<p align="center">
  <img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/approval.png" alt="The approval modal: a vermillion warning badge, a title, a message, and cancel and confirm buttons" width="720" />
</p>

```jsx
<Modal
  variant='approval'
  isOpen={isOpen}
  title='WARNING!'
  message='Are you sure?'
  approveLabel='Yes do it !'
  closeLabel='Cancel'
  onApprove={remove}
  onClose={close}
/>
```

`onCancel` is optional; the cancel button falls back to `onClose`. The warning icon
ships inline — pass any node to `warningIcon` to replace it. Focus lands on the
**cancel** button when the modal opens, so a reflex press of Enter can never trigger
the destructive action, and the confirm button — not the cancel one — carries the
destructive red.

### `form` — wrap your own form

<p align="center">
  <img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/form.png" alt="The form modal wrapping a custom employee form with inputs, selects and date pickers" width="720" />
</p>

```jsx
<Modal
  variant='form'
  isOpen={isOpen}
  ariaLabel='Signup form'
  formComponent={<MyForm onClose={close} />}
  onClose={close}
  closeOnBackdropClick={false}
/>
```

A form has no title, so give the dialog an accessible name with `ariaLabel`. Turning
off `closeOnBackdropClick` avoids losing input to a stray click.

## Composable API

Skip `variant` entirely and bring your own content. `Modal.Header` and `Modal.Body`
are wired into the dialog's `aria-labelledby` / `aria-describedby` automatically, and
`Modal.Footer` lays out your buttons.

<p align="center">
  <img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/composable.png" alt="A composable modal built from Modal.Header, Modal.Body and Modal.Footer, with custom Cancel and Confirm buttons" width="720" />
</p>

```jsx
<Modal isOpen={isOpen} onClose={close} size='lg'>
  <Modal.Header>Composable modal</Modal.Header>
  <Modal.Body>
    Any content you like. Header, Body and Footer are optional and each
    accepts a className.
  </Modal.Body>
  <Modal.Footer>
    <button onClick={close}>Cancel</button>
    <button onClick={confirm}>Confirm</button>
  </Modal.Footer>
</Modal>
```

## The useModal hook

A tiny optional helper so you don't have to write the same `useState` in every
component:

```jsx
const { isOpen, open, close, toggle } = useModal()
// useModal(true) starts open
```

## Mobile bottom sheet

With `mobileSheet`, viewports below Tailwind's `sm` breakpoint get a full-width
panel docked to the bottom edge that slides up — the familiar mobile sheet pattern.
Larger viewports are unaffected.

<p align="center">
  <img src="https://raw.githubusercontent.com/Guillaume-da/tailwind-react-modal/master/docs/screenshots/mobile-sheet.png" alt="On a phone-sized viewport, the modal docks to the bottom of the screen as a full-width sheet with rounded top corners" width="320" />
</p>

```jsx
<Modal isOpen={isOpen} onClose={close} mobileSheet>
  <Modal.Header>Mobile sheet</Modal.Header>
  <Modal.Body>Docked to the bottom edge on small screens.</Modal.Body>
</Modal>
```

## Behaviour & accessibility

The modal renders through a portal into `document.body`, so it can't be clipped by an
`overflow-hidden` or transformed parent. While open, it:

- exposes itself as `role="dialog"` / `aria-modal="true"`, labelled by its title and
  described by its message;
- moves focus inside and keeps Tab / Shift+Tab cycling within the dialog;
- marks everything else on the page `inert`, so assistive tech can't escape it;
- locks background scrolling **and compensates the scrollbar width**, so the page
  layout doesn't shift behind the backdrop;
- returns focus to whatever was focused before it opened.

It is dismissed by the Escape key, the close/cancel button, the top-right "X", or a
backdrop click — all funnelled into your single `onClose`.

| Prop | Default | Effect |
| --- | --- | --- |
| `isOpen` | — | `false` hides the modal (with an exit animation); omit to control mounting yourself |
| `onClose` | — | Called for every dismissal |
| `closeOnBackdropClick` | `true` | Dismiss when the backdrop is clicked |
| `closeOnEscape` | `true` | Dismiss on the Escape key |
| `showCloseButton` | `true` | Render the "X" button in the top-right corner |
| `closeButtonAriaLabel` | `'Close dialog'` | Accessible name of the "X" button |
| `ariaLabel` | — | Accessible name when nothing else provides a title |
| `usePortal` | `true` | Render into `document.body` rather than in place |
| `portalContainer` | `document.body` | Portal target |

## Sizes and stacking

| Prop | Default | Effect |
| --- | --- | --- |
| `size` | `'md'` | Panel width: `'sm'`, `'md'`, `'lg'`, `'xl'` or `'full'` (full screen) |
| `zIndex` | `50` | `z-index` of the modal root |
| `mobileSheet` | `false` | Bottom-sheet presentation below the `sm` breakpoint |

Stacked modals are supported: each one adds `inert` around itself and the scroll lock
is reference-counted, so closing the top modal restores exactly the state underneath.

## Animations

By default the backdrop fades (`animate-fade-in` / `animate-fade-out`) while the
panel pops (`animate-pop-in` / `animate-pop-out`), on separate timings. Override
either side with any animation class — `animate-fade-in-up`, `animate-fade-in-down`
and `animate-fade-in` also ship with the stylesheet:

```jsx
<Modal animation='animate-fade-in-up' exitAnimation='animate-fade-out' ... />
```

Two things worth knowing:

- The exit animation plays when `isOpen` flips to `false`; the modal unmounts itself
  once the animation ends. If you mount the modal conditionally
  (`{show && <Modal/>}`), there is nothing left to animate, so the exit is skipped.
- Users with `prefers-reduced-motion` get no animation at all and an instant close.

## Themes

Seven looks ship with the package — [pictured at the top](#the-seven-themes). Pick
one with the `theme` prop:

```jsx
<Modal theme='terminal' isOpen={isOpen} onClose={close}>
  <Modal.Body>Nothing else to configure.</Modal.Body>
</Modal>
```


The registry is exported, so you can build a picker or read a theme's description:

```jsx
import { modalThemes, modalThemeNames } from 'tailwind-react-modal'

modalThemeNames.map((name) => modalThemes[name].label)
```

**Why this needs no Tailwind config on your side.** The library compiles its own
stylesheet, so every preset is already in `tailwind-react-modal/styles.css`. Themes
are not bags of utility classes handed to your build — they are named classes
resolved in Tailwind's `components` layer.

That layer sits below `utilities` in the cascade, which is the point: **anything you
pass through `classNames` beats a theme automatically**, whichever stylesheet loads
first and with no `!` suffix.

```jsx
// A terminal window with a green confirm button.
<Modal
  theme='terminal'
  variant='approval'
  classNames={{ approveButton: 'bg-emerald-600 hover:bg-emerald-500' }}
/>
```

### Window chrome

The `terminal` theme renders a title bar with three macOS-style lights, the red one
being the close button. Any theme can have one:

```jsx
<Modal titleBar titleBarLabel='guillaume@web — qa & dev' />
<Modal theme='terminal' titleBar={false} />          {/* suppress it */}
<Modal titleBar={<MyOwnBar />} />                    {/* replace it */}
```

`titleBarLabel` falls back to `title`. When the bar is on it replaces the corner "X",
so there is still exactly one dismiss control in the tab order.

The blinking caret the `terminal` theme appends to variant messages is available to
free content as the `rtm-caret` class.

## Styling

Every visual slot accepts extra Tailwind classes through `classNames`, appended after
the defaults:

```jsx
<Modal
  classNames={{
    root: '',                        // fixed full-screen wrapper
    backdrop: 'bg-indigo-950/50',    // the blurred overlay
    panel: 'rounded-3xl',            // the white rounded panel
    content: 'p-8',                  // the padded wrapper inside the panel
    titleBar: 'bg-slate-800',        // the window chrome, when shown
    title: 'text-indigo-900',        // variant title
    message: 'text-base',            // variant message
    icon: 'bg-amber-100',            // the approval warning badge
    closeButton: 'bg-slate-600',     // close/cancel button
    approveButton: 'bg-indigo-600',  // approve button
    dismissButton: 'text-slate-500'  // the top-right "X"
  }}
  ...
/>
```

`Modal.Header`, `Modal.Body` and `Modal.Footer` each accept their own `className`
too.

Classes you pass must be reachable by **your** Tailwind build, not the library's —
they end up in your markup, so your `@source` globs must cover the files where you
write them.

The v2.0 colour props (`modalBackground`, `successTitleColor`, `closeButtonBgColor`,
`buttonsTextColor`, …) still work but are deprecated in favour of `classNames`.

**Changed in 2.2** — the default palette is neutral: the close/cancel button is an
outlined secondary button instead of a solid red one, the `approval` confirm button
carries the destructive red, and the `simple` title is no longer uppercase lime. Pass
the colour props or `classNames` to get the old look back.

## Dark mode

Dark mode is driven by a `.dark` class on any ancestor (not the OS preference), which
plays nicely with theme togglers:

Every theme carries its own dark mode, not just a recolour — see the gallery at the
top of this README.

```html
<html class="dark">
```

## Migrating from v2

The package was renamed. Nothing else changed — every prop, variant, slot and export
works exactly as it did in 2.2.

```diff
-npm install react-tailwind-flex-modal
+npm install tailwind-react-modal
```

```diff
-import { Modal, useModal } from 'react-tailwind-flex-modal'
-import 'react-tailwind-flex-modal/styles.css'
+import { Modal, useModal } from 'tailwind-react-modal'
+import 'tailwind-react-modal/styles.css'
```

`react-tailwind-flex-modal` stays installable and stops at 2.1.0, its last published
version; every release from here lands under the new name.

New in 3.0: [themes](#themes), the `titleBar` / `titleBarLabel` props, and the
`content` and `titleBar` `classNames` slots.

## Migrating from v1

The full list of changes is in the
[v2.0.0 release notes](https://github.com/Guillaume-da/tailwind-react-modal/releases/tag/v2.0.0).

**v1 props still work.** They are marked `@deprecated` and resolve to the new ones, so
existing code keeps running — but three things do change and are not shimmed:

1. **The stylesheet moved.** `tailwind-react-modal/dist/index.css` is now
   `tailwind-react-modal/styles.css`, and importing the component no longer pulls
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

## Running the examples

```bash
cd examples
npm install
npm run dev
```

The example app consumes the library from source via `file:..` and demonstrates every
variant, the composable API, the mobile sheet and the `useModal` hook. The
screenshots in this README are taken from it.

It also carries a theme picker, so every shipped preset is one click away. The page
itself keeps its own design system; the modals just take a `theme` prop.

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
