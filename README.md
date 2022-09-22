# A light Modal made with Tailwind

[![NPM](https://img.shields.io/npm/v/test-g-test.svg)](https://www.npmjs.com/package/test-g-test) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-tailwind-flex-modal
```

Import the Modal and don't forget to import the css:

```jsx
import {Modal} from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/dist/index.css'
```

## Usage

react-tailwind-flex-modal allows you to make quickly 3 types of modal

### Simple Modal

Pass your text like this:
```jsx
const modalTitle = 'CONGRATULATIONS!'
const message = 'Your modal is working.'
const closeMessage = 'Close'
```
And choose a modal:
```jsx
const currentModal = 'simpleModal'
```
Pass this in your modal props
```jsx
<Modal 
setShowModal={setShowModal} 
currentModal={currentModal}
successTitle={modalTitle} 
message={message} 
closeMessage={closeMessage} 
handleClose={handleClose}
...
```

### Aproval Modal

Just add this in your Modal props
```jsx
const currentModal = 'aprovalModal'
```

```jsx
{showModal ? 
	<Modal 
	setShowModal={setShowModal} // boolean
  	currentModal={currentModal} // string
	warningTitle={warningTitle} // must be a string
	closeMessage={closeMessage}  // must be a string
	aprovalMessage={aprovalMessage} // must be a string
	setShowModal={setShowModal} // boolean
	warningMessage={message} // must be a string
	warningIcon={warningIcon} // must be a string
	handleClose={handleClose} // function
	handleAproval={handleAproval} // function
	/>
	: 
	<div></div>
```

### Form Modal

You can pass a component to the modal, just pass it as a prop and call it formComponent:
```jsx
const currentModal = 'fomModal'
formComponent={formComponent}
```

Define the style of your modal, you can define a style for darkmode too. Default values are:
```jsx
const modalBackground = 'bg-white'
const darkModalBackground = 'dark:bg-zinc-900'
const successTitleColor = 'text-lime-600'
const warningTitleColor = 'text-red-500'
const darkSuccessTitleColor = 'dark:text-red-500'
const messageTextColor = 'text-gray-500'
const aprovalButtonBgColor = 'bg-lime-600'
const darkAprovalButtonBgColor = 'dark:bg-lime-600'
const closeButtonBgColor = 'bg-red-600'
const buttonsTextColor = 'text-white'
```

By default the animation is setted on fade in up, you can choose fade-in-down or fade-in:
```jsx
const animation = 'animate-fade-in'
```

### Added

Close Modal with escape key or close button

## License

MIT © [Guillaume-da](https://github.com/Guillaume-da)
