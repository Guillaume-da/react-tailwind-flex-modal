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

Define the style of your modal, you can define a style for darkmode too:
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
Pass your text like this:
```jsx
const modalTitle = 'CONGRATULATIONS!'
const message = 'Your modal is working.'
const closeMessage = 'Close'
```
```jsx
<Modal 
setShowModal={setShowModal} 
successTitle={modalTitle} 
message={message} 
closeMessage={closeMessage} 
handleClose={handleClose}
modalBackground={modalBackground}
darkModalBackground={darkModalBackground}
...
```

### Aproval Modal

Just add this in your Modal props and set it with the message you want in the approval button
```jsx
aprovalMessage={aprovalMessage} 
```

```jsx
{showModal ? 
	<Modal 
	warningTitle={warningTitle} // must be a string
	closeMessage={closeMessage}  // must be a string
	aprovalMessage={aprovalMessage} // must be a string
	setShowModal={setShowModal} // boolean
	setFormModal={setFormModal} 
	message={message} // must be a string
	warningIcon={warningIcon} // must be a string
	formModal={formModal} // boolean
	formComponent={formComponent} // JSX
	handleClose={handleClose} // function
	handleAproval={handleAproval} // function
	modalBackground={modalBackground} // must be a string and use a Tailwind class
	darkModalBackground={darkModalBackground} // must be a string and use a Tailwind class
	successTitleColor={successTitleColor} // must be a string and use a Tailwind class
	warningTitleColor={warningTitleColor} // must be a string and use a Tailwind class
	darkSuccessTitleColor={darkSuccessTitleColor} // must be a string and use a Tailwind class
	messageTextColor={messageTextColor} // must be a string and use a Tailwind class
	aprovalButtonBgColor={aprovalButtonBgColor} // must be a string and use a Tailwind class
	darkAprovalButtonBgColor={darkAprovalButtonBgColor} // must be a string and use a Tailwind class
	closeButtonBgColor={closeButtonBgColor} // must be a string and use a Tailwind class
	buttonsTextColor={buttonsTextColor} // must be a string and use a Tailwind class
	/>
	: 
	<div></div>
```

### Form Modal

You can pass a component to the modal, just pass it as a prop and call it formComponent:
```jsx
formComponent={formComponent}
```

### Added

Close Modal with escape key or close button

## License

MIT © [Guillaume-da](https://github.com/Guillaume-da)
