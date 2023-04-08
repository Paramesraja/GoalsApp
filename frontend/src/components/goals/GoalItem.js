import React from 'react';

import './GoalItem.css';

function GoalItem(props) {
  return <li className="goal-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}
//this function borrow id from coursegoals.js while clicking text , it deletes the goal (this function was called inside coursegoals.js 
// entire properties to load and by clicking to delete)

export default GoalItem;





//Apply is very similar to the call function. The only difference is that in apply you can pass an array as an argument list. 
//Bind is a function that helps you create another function that you can execute later with the new context of this that is provided.
//With the bind() method, an object can borrow a method from another object.