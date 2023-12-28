import React from 'react'

interface Props{
    cartItems: string[]
    onClear:() => void
}

const Cart = ({cartItems,onClear}:Props) => {
  return (
    <>
        <div>Cart</div>
        <ul>
            {cartItems.map(item => <li key={item}>{item}</li>)}
        </ul>
        <button onClick={onClear}>Clear</button>
        {/* COMPONENT THAT HOLDS THE STATE IS RESPONSIBLE FOR UPDATING IT. SO UPDATE IT IN THE APP COMPONENT BCZ THAT HAS THE STATES OF BOTH NAVBAR AND CART. MAIN LOGIC UDHAR LIKHO AND IDHAR BASS CALL KARO  */}
    </>
  )
}

export default Cart