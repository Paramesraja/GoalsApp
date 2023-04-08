import React from 'react';

import './Card.css';

function Card(props) {
  return <div className='card'>{props.children}</div>;
}//used to return child component ( any child elements used to pass into that component)

export default Card;
