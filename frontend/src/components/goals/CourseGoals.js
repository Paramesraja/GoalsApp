//this file getting course goals from backend and load it (if goals exist or not exist , it render from backend)
import React from 'react';

import './CourseGoals.css';
import Card from '../UI/Card';
import GoalItem from './GoalItem';

function CourseGoals(props) {
  const hasNoGoals = !props.goals || props.goals.length === 0;

  return (
    <section id='course-goals'>
      <Card>
        <h2>Your Goals</h2>
        {hasNoGoals && <h2>No goals found. Start adding some!</h2>}
        <ul>
          {props.goals.map((goal) => (//Inside GoalItem why? it will load all goals and delete while clicking
            <GoalItem
              key={goal.id}
              id={goal.id}
              text={goal.text}
              onDelete={props.onDeleteGoal}//event handler used to delete goals by clicking
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}// child elements are passing into card tag and goalitem tag(child elements passing into that component)

export default CourseGoals;
