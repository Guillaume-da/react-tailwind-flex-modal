/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'

function Modal(props) {
  const refAprovalButton = useRef(null)
  const refCloseButton = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        props.setShowModal(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className=' flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-white bg-opacity-60 dark:bg-zinc-800 dark:bg-opacity-80'>
        <div className='relative transform overflow-hidden rounded-lg dark:bg-zinc-800 text-left shadow-xl transition-all sm:w-full sm:max-w-lg animate-fade-in-down'>
          <div
            className={`${props.modalBackground} ${props.darkModalBackground} mx-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4 `}
          >
            {!props.formModal ? (
              <div className='flex flex-col items-center p-6'>
                <div
                  className={`flex text-xl font-semibold uppercase ${props.successTitleColor} ${props.darkSuccessTitleColor}`}
                >
                  {props.successTitle}
                </div>
                <div
                  className={`flex items-center text-xl font-semibold mb-4 ${props.warningTitleColor}`}
                >
                  {props.warningIcon} {props.warningTitle}
                </div>
                <div
                  className={`text-lg font-semibold ${props.messageTextColor}`}
                >
                  {props.message}
                </div>
                <div className='flex gap-x-4 -mt-4'>
                  {props.aprovalMessage ? (
                    <button
                      ref={refAprovalButton}
                      onClick={props.handleAproval}
                      className={`transition duration-500 ease-in-out mt-10 h-10 px-5 ${props.buttonsTextColor} ${props.aprovalButtonBgColor} transition-colors duration-150 border border-gray-300 ${props.darkAprovalButtonBgColor} rounded-lg focus:shadow-outline hover:bg-lime-700 hover:text-green-100`}
                    >
                      {props.aprovalMessage}
                    </button>
                  ) : (
                    // eslint-disable-next-line react/self-closing-comp
                    <div></div>
                  )}
                  <button
                    ref={refCloseButton}
                    onClick={props.handleClose}
                    className={`transition duration-500 ease-in-out mt-10 h-10 px-5 ${props.buttonsTextColor} ${props.closeButtonBgColor} transition-colors duration-150 border border-gray-300  dark:border-red-600 rounded-lg focus:shadow-outline hover:bg-red-700 hover:text-green-100`}
                  >
                    {props.closeMessage}
                  </button>
                </div>
              </div>
            ) : (
              <>{props.formComponent}</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
