import React, { Children, ReactNode } from 'react'

interface Props{
    children: ReactNode
    // color?: string // ? --> optional prop item
    color ?: 'primary' | 'secondary' //so that we can only send these as props and not any random string which is not a color
    onClick: () => void
}
const Button = ({children,color='secondary',onClick}:Props) => {
  return (
    <button type="button" className={"btn btn-"+color} onClick={onClick}>{children}</button>
  )
}

export default Button 