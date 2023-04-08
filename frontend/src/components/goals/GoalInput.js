//this file for getting goals input text and creating id for that
import React, { useState } from 'react';

import './GoalInput.css';
import Card from '../UI/Card';// Parent component used

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState('');//[currentstate,updatingState]

  function updateGoalTextHandler(event) {
    //getting input value from "event"
    setEnteredGoalText(event.target.value);
  }
  
  //Here we create a state variable (enteredGoalText) to track the input value.
  // By setting an onChange event handler, the handler function will get called whenever the text in the input field changes.

  function goalSubmitHandler(event) {
    //gaol submit handler listen event from entering goal text
    event.preventDefault();
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur. 
    //For example, this can be useful when: Clicking on a "Submit" button, prevent it from submitting a form.

    if (enteredGoalText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddGoal(enteredGoalText);
    //on adding entered goal text

    setEnteredGoalText('');
    //for updating entered goal text by calling function (setEnteredGoalText handler)
  }
//For creating new goal
  return (
    <section id='goal-input'>
      <Card>
        <form onSubmit={goalSubmitHandler}>
          <label htmlFor='text'>New Goal</label>
          <input
            type='text'
            id='text'
            value={enteredGoalText}
            //existing current state
            onChange={updateGoalTextHandler}
            //updating input state variable
            //The onchange event occurs when the value of an HTML element is changed.
          />
          <button>Add Goal</button>
        </form>
      </Card>
    </section>
  );
}
// child elements are passing into card tag(child elements passing into that component)

export default GoalInput;
