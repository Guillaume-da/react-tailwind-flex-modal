import React, {useState} from "react";
import {Modal} from 'react-tailwind-flex-modal'
import 'react-tailwind-flex-modal/dist/index.css'
import './tailwind.css'
import FormModal from './components/FormModal.jsx'
import { RiErrorWarningLine } from 'react-icons/ri'

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

const message = "Are you sure ?"
const warningIcon = <RiErrorWarningLine className="mr-3 text-3xl" />

function App() {
  const [showModal, setShowModal] = useState(false)
  const [aprovalMessage, setAprovalMessage] = useState('')
  const [formModal, setFormModal] = useState(false)

  const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [birthdate, setBirthdate] = useState('')
	const [department, setDepartment] = useState('')
	const [city, setCity] = useState('')
	const [startDate, setStartDate] = useState('')
	const [street, setStreet] = useState('')
	const [employeeState, setEmployeeState] = useState('')
	const [zipcode, setZipcode] = useState('')
  const [closeMessage, setCloseMessage] = useState('')
  const [warningTitle, setWarningTitle] = useState('')

  const formComponent = 
	<FormModal 
		setShowModal={setShowModal} 
		setFirstName={setFirstName} 
		firstName={firstName} 
		lastName={lastName} 
		setLastName={setLastName} 
		startDate={startDate} 
		birthdate={birthdate} 
		department={department} 
		city={city}
		street={street} 
		zipcode={zipcode} 
		employeeState={employeeState} 
		setFormModal={setFormModal}
		setStartDate={setStartDate}
		setBirthdate={setBirthdate}
		setCity={setCity}
		setStreet={setStreet}
		setZipcode={setZipcode}
		setEmployeeState={setEmployeeState}
		setDepartment={setDepartment}
	/>

  function handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(false)
    setAprovalMessage('')
  }

  function handleOpenAprovalModal(e){
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
    setCloseMessage('Cancel')
    setWarningTitle('Warning')
    setAprovalMessage('Yes, do it!')
  }

  function handleOpenFormModal(e){
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
    setFormModal(true)
  }

  return (
    <div className="dark:bg-zinc-800 min-h-screen">
      
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl max-w-screen-xl dark:bg-zinc-900">
    {showModal ? 
        <Modal 
        setShowModal={setShowModal} // add this for all modals
        showModal={showModal} // add this for all modals
        aprovalMessage={aprovalMessage} // confirm button, add this for Aproval Modal
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
        formComponent={formComponent} // add this for Form Modal
        formModal={formModal} // add this for Form Modal
        warningTitle={warningTitle} 
        warningIcon={warningIcon}
    />
    : 
    <div></div>  
    }
    
				<div className="horizontal xl:container flex items-center justify-center h-screen">
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
