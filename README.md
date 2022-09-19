# A light Modal made with Tailwind

[![NPM](https://img.shields.io/npm/v/test-g-test.svg)](https://www.npmjs.com/package/test-g-test) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-tailwind-flex-modal
```

```jsx
import {Modal} from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/dist/index.css'
```

## Usage

Use useState for setting your modal to false:
```jsx
const [showModal, setShowModal] = useState(false)
```
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

Just add this in your Modal props and set it to true with useState
```jsx
aprovalMessage={aprovalMessage} 
```

### Form Modal

You can pass a component to the modal, just pass it as a prop and call it formComponent:
```jsx
formComponent={formComponent}
```

## License

MIT © [Guillaume-da](https://github.com/Guillaume-da)
