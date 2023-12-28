import React, { ReactNode } from 'react'

//Using children prop we can pass children to the component
//ReactNode is used as a type to handle any kind of data type be it any complex

interface Props{
    children: ReactNode
    onClose:() => void //pass the fn logic from parent(App)
}

const Alert = ({children,onClose}:Props) => {
  return (
    <div className='alert alert-primary alert-dismissible'>
        {children}
        <button type='button' className='btn-close' onClick={onClose} data-bs-dismissible></button>
    </div>
  )
}

export default Alert