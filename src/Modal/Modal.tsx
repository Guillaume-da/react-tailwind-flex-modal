/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  KeyboardEvent
} from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

interface IModal {
  setShowModal: Dispatch<SetStateAction<boolean>>
  animation?: string
  modalBackground?: string
  darkModalBackground?: string
  currentModal?: string
  successTitleColor?: string
  darkSuccessTitleColor?: string
  successTitle?: string
  messageTextColor?: string
  buttonsTextColor?: string
  closeButtonBgColor?: string
  message?: string
  warningTitleColor?: string
  closeMessage?: string
  warningIcon?: string
  warningTitle?: string
  warningMessage?: string
  aprovalButtonBgColor?: string
  darkAprovalButtonBgColor?: string
  aprovalMessage?: string
  formComponent?: JSX.Element
  handleClose: () => void
  handleAproval: () => void
  handleCloseAproval: () => void
}

const Modal: React.FC<IModal> = (props) => {
  const refAprovalButton = useRef(null)
  const refCloseButton = useRef(null)

  useEffect(() => {
    const close = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        props.setShowModal(false)
      }
    }
    // @ts-ignore
    window.addEventListener('keydown', close)
    // @ts-ignore
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className=' flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-white bg-opacity-60 dark:bg-zinc-800 dark:bg-opacity-80'>
        <div
          className={`relative transform overflow-hidden rounded-lg dark:bg-zinc-800 text-left shadow-xl transition-all sm:w-full sm:max-w-lg ${
            props.animation ? props.animation : 'animate-fade-in-up'
          }`}
        >
          <div
            className={`${
              props.modalBackground ? props.modalBackground : 'bg-white'
            } ${
              props.darkModalBackground
                ? props.darkModalBackground
                : 'dark:bg-zinc-900'
            } mx-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4 `}
          >
            {(() => {
              switch (props.currentModal) {
                case 'simpleModal':
                  return (
                    <div className='flex flex-col items-center p-6'>
                      <div
                        className={`flex text-xl font-semibold uppercase ${
                          props.successTitleColor
                            ? props.successTitleColor
                            : 'text-lime-600'
                        } ${
                          props.darkSuccessTitleColor
                            ? props.darkSuccessTitleColor
                            : 'dark:text-lime-600'
                        }`}
                      >
                        {props.successTitle}
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          props.messageTextColor
                            ? props.messageTextColor
                            : 'text-gray-500'
                        }`}
                      >
                        {props.message}
                      </div>
                      <div className='flex gap-x-4 -mt-4'>
                        <button
                          ref={refCloseButton}
                          onClick={props.handleClose}
                          className={`transition duration-500 ease-in-out mt-10 h-10 px-5 ${
                            props.buttonsTextColor
                              ? props.buttonsTextColor
                              : 'text-white'
                          } ${
                            props.closeButtonBgColor
                              ? props.closeButtonBgColor
                              : 'bg-red-600'
                          } transition-colors duration-150 border border-gray-300  dark:border-red-600 rounded-lg focus:shadow-outline hover:bg-red-700 hover:text-green-100`}
                        >
                          {props.closeMessage}
                        </button>
                      </div>
                    </div>
                  )
                case 'aprovalModal':
                  return (
                    <div className='flex flex-col items-center p-6'>
                      <div
                        className={`flex items-center text-xl font-semibold mb-4 ${
                          props.warningTitleColor
                            ? props.warningTitleColor
                            : 'text-red-500'
                        }`}
                      >
                        {props.warningIcon ? (
                          props.warningIcon
                        ) : (
                          <RiErrorWarningLine className='mr-3 text-3xl' />
                        )}{' '}
                        {props.warningTitle}
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          props.messageTextColor
                            ? props.messageTextColor
                            : 'text-gray-500'
                        }`}
                      >
                        {props.warningMessage}
                      </div>
                      <div className='flex gap-x-4 -mt-4'>
                        <button
                          ref={refAprovalButton}
                          onClick={props.handleAproval}
                          className={`transition duration-500 ease-in-out mt-10 h-10 px-5 ${
                            props.buttonsTextColor
                              ? props.buttonsTextColor
                              : 'text-white'
                          } ${
                            props.aprovalButtonBgColor
                              ? props.aprovalButtonBgColor
                              : 'bg-lime-600'
                          } transition-colors duration-150 border border-gray-300 dark:border-lime-600 ${
                            props.darkAprovalButtonBgColor
                              ? props.darkAprovalButtonBgColor
                              : 'dark:bg-lime-600'
                          } rounded-lg focus:shadow-outline hover:bg-lime-700 hover:text-green-100`}
                        >
                          {props.aprovalMessage}
                        </button>
                        <button
                          ref={refCloseButton}
                          onClick={props.handleCloseAproval}
                          className={`transition duration-500 ease-in-out mt-10 h-10 px-5 ${
                            props.buttonsTextColor
                              ? props.buttonsTextColor
                              : 'text-white'
                          } ${
                            props.closeButtonBgColor
                              ? props.closeButtonBgColor
                              : 'bg-red-600'
                          } transition-colors duration-150 border border-gray-300  dark:border-red-600 rounded-lg focus:shadow-outline hover:bg-red-700 hover:text-green-100`}
                        >
                          {props.closeMessage}
                        </button>
                      </div>
                    </div>
                  )
                case 'formModal':
                  return <div>{props.formComponent}</div>
                default:
                  return null
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
