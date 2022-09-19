import React, {useState} from "react";
import {Modal} from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/dist/index.css'
import './tailwind.css'

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

const modalTitle = 'CONGRATULATIONS!'
const message = 'Your modal is working.'
const closeMessage = 'Close'

function App() {

  const [showModal, setShowModal] = useState(false)
  function handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(false)
  }
  return (
    <div className="dark:bg-zinc-800 min-h-screen">
      
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl max-w-screen-xl dark:bg-zinc-900">
    {showModal ? 
        <Modal 
    setShowModal={setShowModal} 
    showModal={showModal}
    successTitle={modalTitle} 
    message={message} 
    closeMessage={closeMessage} 
    handleClose={handleClose}
    modalBackground={modalBackground}
		darkModalBackground={darkModalBackground}
		successTitleColor={successTitleColor}
		warningTitleColor={warningTitleColor}
		darkSuccessTitleColor={darkSuccessTitleColor}
		messageTextColor={messageTextColor}
		aprovalButtonBgColor={aprovalButtonBgColor}
		darkAprovalButtonBgColor={darkAprovalButtonBgColor}
		closeButtonBgColor={closeButtonBgColor}
		buttonsTextColor={buttonsTextColor}
    />
    : 
    <div></div>  
    }
				<div className="horizontal xl:container mt-5 ">
					<div className="my-10 p-2 lg:p-10">    
          <button onClick={()=>setShowModal(true)} className="select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">Click me</button>
					</div>
				</div> 
		</div> 
    
    </div>    
    
    

  )
}

export default App;
