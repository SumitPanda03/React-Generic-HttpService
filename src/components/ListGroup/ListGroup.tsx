import { MouseEvent, useState } from "react";
import style from './ListGroup.module.css'
import styled from 'styled-components'
//since we are using module.css to avoid conflict of 2 same class names styling in 2 css files
//props interface in typescript

interface Props{
    items: string[],
    heading: string,
    onSelectItem: (item: string) => void
}

//items mei store the data in an array
//heading mei title bhejo
//ye dono chiz props ke andar hai jisko hum destructure kar rhe hai neeche
//helpful when the data in the list has to be dynamic(changed in real time)
// props.items and props.heading bhi likh sakte the

function ListGroup({items,heading, onSelectItem}:Props) {
     
    const [selectedIndex,setSelectedIndex] = useState(-1)

  const handleClick = (event: MouseEvent) => {
    console.log((event))
}
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 ? <p>No Items Found</p> : null}
      <ul className={style['list-group']}>  
      {/* we used style so that conflict of same class in 2 css files does not happen */}
        {items.map((item,index) => (
          <li className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'} 
          key={item}
          onClick={() => {
            setSelectedIndex(index)
            onSelectItem(item)
        }} >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
