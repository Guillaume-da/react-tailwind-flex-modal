import React, {useState} from "react";
import {Modal} from 'react-tailwind-flex-modal'
import Form from './components/Form'
import 'react-tailwind-flex-modal/dist/index.css'
import './tailwind.css'

function App() {
  const [showModal, setShowModal] = useState(false)
	const [currentModal, setCurrentModal] = useState('')

  
  const modalTitle = 'CONGRATULATIONS!'
	const message = 'Your modal is working'
	const closeMessage = 'Close'

  function handleOpenSimpleModal(e){
    setCurrentModal('simpleModal')
    setShowModal(true)
  }

  const warningTitle = 'WARNING!'
	const warningMessage = 'Your modal is working'
  const aprovalMessage = 'Yes do it !'
	

  function handleOpenAprovalModal(e){
    e.preventDefault()
    e.stopPropagation()
    setCurrentModal('aprovalModal')
    setShowModal(true)
  }

  const formComponent = <Form handleClose={handleClose}/> // pass the props you need to your form

  function handleOpenFormModal(e){
    e.preventDefault()
    e.stopPropagation()
    setCurrentModal('formModal')
    setShowModal(true)
  }

  function handleCloseAproval(e) {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(false)
    setCurrentModal('')
  }

  function handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(false)
    setCurrentModal('')
  }

  return (
    <div className="dark:bg-zinc-800 min-h-screen">
      
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl max-w-screen-xl dark:bg-zinc-900">
    {showModal ? 
				<Modal 
					setShowModal={setShowModal} 
          currentModal={currentModal}
					successTitle={modalTitle} // Simple modal
					message={message} // Simple modal
          warningTitle={warningTitle} // aproval modal
          warningMessage={warningMessage} // aproval modal
          aprovalMessage={aprovalMessage} // aproval modal
					closeMessage={closeMessage}
					handleClose={handleClose}
          handleCloseAproval={handleCloseAproval} // aproval modal
          formComponent={formComponent} // form
			/> 
    : 
    <div></div>  
    }
    
				<div className="horizontal xl:container flex items-center justify-center h-screen">
        <div className="my-10 p-2 lg:p-10">    
            <button onClick={(e)=>handleOpenSimpleModal(e)} className="bg-cyan-700 select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">Simple Modal</button>
					</div>
          <div className="my-10 p-2 lg:p-10">    
            <button onClick={(e)=>handleOpenAprovalModal(e)} className="bg-cyan-700 select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">Aproval Modal</button>
					</div>
          <div className="my-10 p-2 lg:p-10">    
            <button onClick={(e)=>handleOpenFormModal(e)} className="bg-cyan-700 select-none cursor-pointer rounded-lg border-2 border-gray-200 py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">Form Modal</button>
					</div>
				</div> 
		</div> 
    </div>    
  )
}

export default App;
